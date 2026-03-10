import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, CheckCircle, Wine,
  Layers, DollarSign, GlassWater, RotateCcw,
  Sparkles, ListChecks, BarChart3
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurant: z.string().trim().min(1, "El restaurante es obligatorio").max(255),
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  position: z.string().trim().min(1, "Selecciona tu cargo"),
  phone: z.string().trim().min(1, "El teléfono es obligatorio").max(30),
  email: z.string().trim().email("Introduce un email válido").max(255),
});

type FormData = z.infer<typeof formSchema>;

const checklistItems = [
  {
    icon: Layers,
    title: "Estructura de carta",
    points: [
      "La carta tiene categorías claras y fáciles de entender",
      "Las secciones siguen un orden lógico (espumosos → blancos → rosados → tintos → dulces)",
      "Cada categoría tiene entre 4 y 12 referencias",
      "El total de referencias es adecuado al tipo de restaurante",
      "Hay una sección destacada de recomendaciones o selección del sommelier",
    ],
  },
  {
    icon: DollarSign,
    title: "Distribución de precios",
    points: [
      "Hay opciones de entrada accesibles (18-25€) que no parezcan 'el barato'",
      "La franja de mayor volumen (25-40€) tiene suficientes opciones",
      "Existen referencias premium que actúan como ancla de precio",
      "No hay saltos bruscos de precio entre referencias consecutivas",
      "Los márgenes son escalonados: mayor % en entrada, mayor € en premium",
    ],
  },
  {
    icon: BarChart3,
    title: "Equilibrio de estilos",
    points: [
      "Hay variedad de perfiles: frescos, afrutados, estructurados, elegantes",
      "La oferta de blancos es proporcional al tipo de cocina",
      "Existe al menos un espumoso accesible y uno premium",
      "Los rosados tienen presencia, especialmente en temporada",
      "Hay opciones para diferentes niveles de conocimiento del cliente",
    ],
  },
  {
    icon: GlassWater,
    title: "Vinos por copa",
    points: [
      "Hay mínimo 6-8 referencias por copa",
      "La selección incluye espumoso, blancos, rosado y tintos",
      "Los precios por copa equivalen al 30-40% de la botella",
      "La sección de copas es visible y está al inicio de la carta",
      "Las referencias por copa rotan cada 2-4 semanas",
    ],
  },
  {
    icon: RotateCcw,
    title: "Rotación y actualización",
    points: [
      "No hay referencias sin venta en los últimos 90 días",
      "La carta se revisa al menos trimestralmente",
      "Las referencias se adaptan a la temporada y al menú",
      "Los precios se actualizan según costes y mercado",
      "Se mide el ratio de mesas que piden vino y el ticket medio en vino",
    ],
  },
];

const ChecklistCartaRentable = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_leads").insert({
        restaurant: data.restaurant,
        name: data.name,
        position: data.position,
        phone: data.phone,
        email: data.email,
        form_type: "checklist-carta-rentable",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("¡Checklist enviada! Revisa tu email.");
    } catch {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Checklist: ¿Tu Carta de Vinos es Rentable? | Winerim"
        description="Descarga gratis la checklist para evaluar si tu carta de vinos está optimizada: estructura, precios, estilos, vino por copa y rotación."
        url="https://winerim.wine/recursos/checklist-carta-de-vinos-rentable"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Recursos", href: "/guias-y-recursos" },
            { label: "Checklist carta rentable" },
          ]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
                <ListChecks size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine">Recurso gratuito</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
                Checklist: ¿Tu carta de vinos es rentable?
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8">
                25 puntos de control para evaluar si tu carta de vinos está optimizada para vender más. Estructura, precios, estilos, vino por copa y rotación.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-wine" /> 25 puntos de control</span>
                <span className="flex items-center gap-2"><Download size={14} className="text-wine" /> Descarga inmediata</span>
              </motion.div>
            </div>

            {/* FORM */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-border bg-gradient-card">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">¡Checklist lista!</h3>
                  <p className="text-muted-foreground mb-6">Revisa tu email para acceder a la checklist completa en PDF.</p>
                  <Link to="/analisis-carta"
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                    Analizar mi carta <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold mb-1">Descarga la checklist gratis</h3>
                  <p className="text-sm text-muted-foreground mb-4">Rellena el formulario y recíbela al instante.</p>
                  <ContactFormFields register={register} errors={errors} position={position} onPositionChange={(v) => { setPosition(v); setValue("position", v); }} />
                  <Button type="submit" disabled={loading}
                    className="w-full bg-gradient-wine text-primary-foreground py-3 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
                    {loading ? "Enviando..." : "Descargar checklist"}
                    {!loading && <Download size={16} className="ml-2" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Sin spam. Solo contenido útil para tu restaurante.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREVIEW: qué incluye */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Contenido</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Qué incluye la checklist</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">5 áreas de evaluación con 25 puntos de control para diagnosticar tu carta de vinos.</p>
          </ScrollReveal>
          <div className="space-y-8">
            {checklistItems.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10">
                      <section.icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-bold">{section.title}</h3>
                    <span className="ml-auto text-xs text-muted-foreground">{section.points.length} puntos</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {section.points.map((point, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">¿Para qué sirve esta checklist?</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Wine, title: "Detecta puntos débiles", desc: "Identifica exactamente qué áreas de tu carta necesitan mejora." },
            { icon: DollarSign, title: "Mejora márgenes", desc: "Optimiza la distribución de precios para maximizar el margen bruto." },
            { icon: BarChart3, title: "Vende más vino", desc: "Una carta optimizada aumenta las ventas de vino entre un 15% y un 30%." },
          ].map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center p-8 rounded-xl border border-border bg-gradient-card">
                <b.icon size={28} className="text-wine mx-auto mb-4" />
                <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              ¿Quieres un análisis completo de tu carta?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              La checklist te da el diagnóstico. Winerim te da la solución: carta digital, recomendaciones con IA y analítica de ventas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analisis-carta"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Analiza tu carta gratis <ArrowRight size={16} />
              </Link>
              <Link to="/demo"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Solicitar demo
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default ChecklistCartaRentable;
