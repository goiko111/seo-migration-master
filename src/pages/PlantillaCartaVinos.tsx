import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Download, CheckCircle, XCircle,
  Layers, DollarSign, List, GlassWater, FileText,
  Sparkles, TrendingUp, BarChart3, Users, AlertTriangle
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

const introProblems = [
  { icon: Layers, text: "Demasiadas referencias sin criterio claro de selección" },
  { icon: List, text: "Organización confusa que dificulta la navegación" },
  { icon: DollarSign, text: "Precios mal estructurados con saltos bruscos" },
  { icon: AlertTriangle, text: "Falta de categorías claras y consistentes" },
];

const templateIncludes = [
  { icon: List, title: "Estructura de categorías", desc: "Plantilla con las categorías principales ya definidas: tintos, blancos, rosados, espumosos y vinos dulces. Lista para personalizar." },
  { icon: GlassWater, title: "Sección de vinos por copa", desc: "Espacio dedicado para tu oferta por copa, con campos para nombre, descripción breve y precio por copa y botella." },
  { icon: Layers, title: "Organización por estilos o regiones", desc: "Dos modelos de organización incluidos: por estilo de vino (fresco, estructurado, aromático) o por región de origen." },
  { icon: FileText, title: "Espacio para descripciones simples", desc: "Campos predefinidos para descripciones breves, maridajes sugeridos y notas de cata accesibles para cualquier cliente." },
  { icon: DollarSign, title: "Estructura de precios equilibrada", desc: "Guía de rangos de precio con la distribución recomendada: entrada, zona media, premium y alta gama." },
];

const steps = [
  { num: "01", title: "Define tus categorías", desc: "Elige entre organizar por tipo de vino, por estilo o por región. La plantilla incluye ambas opciones para que elijas la que mejor se adapta a tu restaurante." },
  { num: "02", title: "Selecciona vinos estratégicos", desc: "Rellena cada categoría con vinos que cumplan una función: entrada accesible, zona media de alta rotación, opciones premium y vinos ancla." },
  { num: "03", title: "Distribuye precios", desc: "Usa la guía de rangos de precio incluida para asegurarte de que no hay huecos ni saltos bruscos. Cada peldaño debe tener 2-3 opciones." },
  { num: "04", title: "Revisa el equilibrio", desc: "Comprueba que cada categoría tiene suficiente variedad, que la oferta por copa es atractiva y que la carta no es ni demasiado larga ni demasiado corta." },
];

const avoidedMistakes = [
  "Cartas demasiado largas con referencias que no se venden y ocupan espacio en bodega",
  "Falta de vinos por copa, perdiendo ventas de mesas individuales y parejas",
  "Precios desordenados sin una escalera de precios lógica y fluida",
  "Categorías confusas que mezclan criterios y desorientan al cliente",
  "Descripciones demasiado técnicas que intimidan en lugar de invitar a probar",
  "Falta de recomendaciones que guíen la decisión del cliente hacia opciones rentables",
];

const optimizationBenefits = [
  { icon: TrendingUp, title: "Aumentar las ventas de vino", desc: "Una carta clara y bien organizada facilita la decisión y anima al cliente a explorar opciones que de otra forma no habría considerado." },
  { icon: BarChart3, title: "Mejorar el ticket medio", desc: "La estructura de precios con vinos ancla y recomendaciones destacadas guía al cliente de forma natural hacia opciones de mayor valor." },
  { icon: Users, title: "Facilitar la elección del cliente", desc: "Categorías claras, descripciones simples y una oferta por copa accesible eliminan la fricción y hacen que elegir vino sea un placer, no un problema." },
];

const PlantillaCartaVinos = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState("");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_leads").insert({
        name: data.name,
        restaurant: data.restaurant,
        email: data.email,
        city: data.city,
        form_type: "plantilla-carta-vinos",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("¡Plantilla enviada! Revisa tu email.");
    } catch {
      toast.error("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "plantilla-carta-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Plantilla de carta de vinos para restaurante",
      description: "Descarga una plantilla profesional para diseñar una carta de vinos clara, equilibrada y pensada para vender más.",
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: "https://winerim.wine/recursos/plantilla-carta-de-vinos",
      inLanguage: "es",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Guías y recursos", item: "https://winerim.wine/guias-y-recursos" },
          { "@type": "ListItem", position: 3, name: "Plantilla carta de vinos", item: "https://winerim.wine/recursos/plantilla-carta-de-vinos" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("plantilla-carta-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Plantilla de Carta de Vinos para Restaurante | Descarga Gratis"
        description="Descarga gratis una plantilla profesional para diseñar tu carta de vinos. Estructura de categorías, precios equilibrados y sección por copa incluida."
        url="https://winerim.wine/recursos/plantilla-carta-de-vinos"
        type="article"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Breadcrumbs items={[{ label: "Recursos", href: "/guias-y-recursos" }, { label: "Plantilla carta de vinos" }]} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
              <Download size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine">Recurso gratuito</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Plantilla de carta de vinos para restaurante
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-8">
              Descarga una plantilla profesional para diseñar una carta de vinos clara, equilibrada y pensada para vender más.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <a href="#descargar" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Descargar plantilla <Download size={16} />
              </a>
              <Link to="/analisis-carta" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Analizar mi carta
              </Link>
            </motion.div>
          </div>

          {/* Mockup visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:block">
            <div className="bg-gradient-card rounded-2xl border border-border p-8 shadow-xl">
              <div className="text-center mb-6">
                <Wine size={28} className="text-wine mx-auto mb-2" />
                <p className="font-heading text-lg font-bold">Carta de Vinos</p>
                <div className="w-12 h-0.5 bg-wine/30 mx-auto mt-2" />
              </div>
              {["Vinos por Copa", "Blancos", "Tintos", "Espumosos"].map((cat, i) => (
                <div key={cat} className="mb-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-2">{cat}</p>
                  {[1, 2].map(j => (
                    <div key={j} className="flex justify-between items-center py-1.5 border-b border-border/50">
                      <div>
                        <div className="h-2.5 w-32 bg-muted rounded" />
                        <div className="h-2 w-20 bg-muted/60 rounded mt-1" />
                      </div>
                      <div className="h-2.5 w-10 bg-muted rounded" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">¿Por qué necesitas una plantilla para tu carta de vinos?</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            Diseñar una carta de vinos desde cero puede ser complicado. Sin una estructura clara, es fácil caer en errores que afectan tanto a la experiencia del cliente como a la rentabilidad del negocio. Una buena plantilla te da el punto de partida profesional que necesitas.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {introProblems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                  <p.icon size={20} className="text-wine" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. QUÉ INCLUYE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Contenido</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Qué incluye la plantilla</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Todo lo que necesitas para diseñar una carta de vinos profesional desde el primer día.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateIncludes.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-wine" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÓMO UTILIZAR */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Paso a paso</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Cómo utilizar la plantilla</h2>
        </ScrollReveal>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-start gap-6 p-6 rounded-xl border border-border bg-gradient-card">
                <span className="font-heading text-3xl font-bold text-wine/30 shrink-0">{step.num}</span>
                <div>
                  <h3 className="font-heading font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. ERRORES QUE EVITA */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Prevención</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Errores que evita esta plantilla</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Los errores más comunes al diseñar una carta de vinos y cómo esta plantilla te ayuda a evitarlos.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {avoidedMistakes.map((mistake, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-background">
                  <XCircle size={18} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{mistake}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OPTIMIZACIÓN */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Resultados</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Lo que consigues con una carta bien estructurada</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Una carta de vinos bien diseñada no solo se ve mejor. Tiene un impacto directo en las ventas y la experiencia del cliente.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {optimizationBenefits.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                  <b.icon size={20} className="text-wine" />
                </div>
                <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. FORMULARIO DESCARGA */}
      <section id="descargar" className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Download size={32} className="text-wine mx-auto mb-4" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Descarga la plantilla gratuita</h2>
              <p className="text-muted-foreground">
                Rellena el formulario y recibe la plantilla directamente en tu email.
              </p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="text-center p-8 rounded-xl border border-wine/30 bg-wine/5">
                <CheckCircle size={40} className="text-wine mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">¡Plantilla enviada!</h3>
                <p className="text-muted-foreground mb-6">Revisa tu bandeja de entrada. Si no lo encuentras, mira en la carpeta de spam.</p>
                <Link to="/analisis-carta" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  Analizar mi carta de vinos <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tu nombre" {...register("name")} className="mt-1.5" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="restaurant">Restaurante</Label>
                <Input id="restaurant" placeholder="Nombre del restaurante" {...register("restaurant")} className="mt-1.5" />
                {errors.restaurant && <p className="text-sm text-destructive mt-1">{errors.restaurant.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} className="mt-1.5" />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Tu ciudad" {...register("city")} className="mt-1.5" />
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
              </div>
              <Button type="submit" disabled={submitting}
                className="w-full bg-gradient-wine text-primary-foreground hover:opacity-90 py-6 text-sm font-semibold tracking-wider uppercase">
                {submitting ? "Enviando..." : "Descargar plantilla"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Al enviar aceptas nuestra <Link to="/privacidad" className="underline hover:text-foreground">política de privacidad</Link>.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              ¿Quieres saber si tu carta de vinos está optimizada?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Analizamos tu carta de vinos de forma gratuita y te damos recomendaciones personalizadas para mejorar su estructura y rentabilidad.
            </p>
            <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Solicitar análisis gratuito <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default PlantillaCartaVinos;
