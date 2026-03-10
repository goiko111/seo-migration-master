import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, CheckCircle, GlassWater,
  DollarSign, Wine, TrendingUp, Sparkles, BookOpen,
  BarChart3, RotateCcw
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
import { Button } from "@/components/ui/button";
import ContactFormFields from "@/components/ContactFormFields";

const formSchema = z.object({
  restaurant: z.string().trim().min(1, "El restaurante es obligatorio").max(255),
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  position: z.string().trim().min(1, "Selecciona tu cargo"),
  phone: z.string().trim().min(1, "El teléfono es obligatorio").max(30),
  email: z.string().trim().email("Introduce un email válido").max(255),
  city: z.string().trim().min(1, "La ciudad es obligatoria").max(100),
  references_count: z.string().trim().min(1, "Selecciona el número de referencias"),
});

type FormData = z.infer<typeof formSchema>;

const guideChapters = [
  {
    icon: Wine,
    title: "Cuántos vinos por copa ofrecer",
    points: [
      "Mínimo recomendado: 6-8 referencias por copa",
      "Distribución ideal: 1 espumoso, 2-3 blancos, 1 rosado, 3-4 tintos",
      "Adaptar la selección al tipo de restaurante y cocina",
      "Cuándo ampliar a 12-15 referencias (wine bars, fine dining)",
      "Cómo evitar el exceso: más no siempre es mejor",
    ],
  },
  {
    icon: DollarSign,
    title: "Cómo calcular el precio por copa",
    points: [
      "Regla base: precio copa = 30-40% del precio de la botella",
      "Método de recuperación: recuperar el coste con 2 copas vendidas",
      "Pricing escalonado: copa de entrada, media y premium",
      "Cómo fijar el precio del espumoso por copa",
      "Márgenes reales: por qué la copa es más rentable que la botella",
    ],
  },
  {
    icon: BarChart3,
    title: "Cómo elegir los vinos adecuados",
    points: [
      "Criterios de selección: versatilidad, conservación y margen",
      "Vinos que funcionan bien por copa vs los que no",
      "La importancia de la conservación: sistemas y tiempos",
      "Cómo alinear la selección por copa con el menú gastronómico",
      "Incluir al menos una opción sorprendente o de descubrimiento",
    ],
  },
  {
    icon: TrendingUp,
    title: "Cómo aumentar las ventas por copa",
    points: [
      "Visibilidad: la sección por copa debe ser la primera de la carta",
      "Sugerir copa en cada plato del menú como maridaje",
      "Rotación quincenal para generar novedad y urgencia",
      "Formación express del personal: 3 frases por vino",
      "Promociones inteligentes: copa de bienvenida, happy hour selectivo",
    ],
  },
  {
    icon: RotateCcw,
    title: "Gestión y rotación",
    points: [
      "Frecuencia de rotación recomendada: cada 2-4 semanas",
      "Cómo medir el rendimiento de cada referencia por copa",
      "Gestión de mermas: cuándo abrir, cuándo retirar",
      "Calendario estacional: adaptar la oferta al clima y temporada",
      "KPIs clave: copas vendidas por mesa, ticket medio en copa",
    ],
  },
];

const GuiaVinoPorCopa = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("");
  const [referencesCount, setReferencesCount] = useState("");

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
        city: data.city,
        references_count: data.references_count,
        form_type: "guia-vino-por-copa",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("¡Guía enviada! Revisa tu email.");
    } catch {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Guía: Vino por Copa para Restaurantes | Winerim"
        description="Descarga gratis la guía completa de vino por copa: cuántos ofrecer, cómo fijar precios, qué vinos elegir y cómo aumentar ventas en tu restaurante."
        url="https://winerim.wine/recursos/guia-vino-por-copa-para-restaurantes"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Recursos", href: "/guias-y-recursos" },
            { label: "Guía vino por copa" },
          ]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
                <BookOpen size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine">Guía gratuita</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
                Guía de vino por copa para restaurantes
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8">
                Todo lo que necesitas para diseñar un programa de vino por copa rentable: selección, pricing, rotación y estrategias para vender más.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><GlassWater size={14} className="text-wine" /> 5 capítulos</span>
                <span className="flex items-center gap-2"><Download size={14} className="text-wine" /> Descarga inmediata</span>
              </motion.div>
            </div>

            {/* FORM */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-border bg-gradient-card">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">¡Guía lista!</h3>
                  <p className="text-muted-foreground mb-6">Revisa tu email para acceder a la guía completa en PDF.</p>
                  <Link to="/demo"
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                    Solicitar demo <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold mb-1">Descarga la guía gratis</h3>
                  <p className="text-sm text-muted-foreground mb-4">Rellena el formulario y recíbela al instante.</p>
                  <ContactFormFields register={register} errors={errors} position={position} onPositionChange={(v) => { setPosition(v); setValue("position", v); }} />
                  <Button type="submit" disabled={loading}
                    className="w-full bg-gradient-wine text-primary-foreground py-3 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
                    {loading ? "Enviando..." : "Descargar guía"}
                    {!loading && <Download size={16} className="ml-2" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Sin spam. Solo contenido útil para tu restaurante.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Contenido</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Qué incluye la guía</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">5 capítulos con todo lo necesario para lanzar o mejorar tu programa de vino por copa.</p>
          </ScrollReveal>
          <div className="space-y-8">
            {guideChapters.map((chapter, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10">
                      <chapter.icon size={18} className="text-wine" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Capítulo {i + 1}</span>
                      <h3 className="font-heading text-lg font-bold">{chapter.title}</h3>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {chapter.points.map((point, j) => (
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

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">Por qué el vino por copa es clave</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: "25-35%", label: "de las ventas de vino pueden venir de copas" },
            { value: "+40%", label: "más margen por copa que por botella" },
            { value: "x2", label: "más comensales consumen vino si hay buena oferta por copa" },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center p-8 rounded-xl border border-border bg-gradient-card">
                <p className="font-heading text-4xl font-bold text-wine mb-2">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
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
              Gestiona tu vino por copa con Winerim
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Selección, pricing, rotación y analítica de tu programa de vino por copa en una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/demo"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Solicitar demo <ArrowRight size={16} />
              </Link>
              <Link to="/vino-por-copa-restaurante"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Leer guía completa
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default GuiaVinoPorCopa;
