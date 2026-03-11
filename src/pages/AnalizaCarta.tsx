import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Upload, Link2, BarChart3, DollarSign, Layers,
  Utensils, Wine, TrendingUp, FileText, Target, Zap,
  CheckCircle2, AlertTriangle, ChevronRight, Users, Clock,
  ShieldCheck, Eye, Lightbulb, XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import InternalLinks from "@/components/seo/InternalLinks";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SummaryBox from "@/components/seo/SummaryBox";
import ComparisonTable from "@/components/seo/ComparisonTable";
import QuickAnswer from "@/components/seo/QuickAnswer";
import FAQSection from "@/components/seo/FAQSection";
import StickyCTA from "@/components/StickyCTA";
import { referencesOptions, businessTypeOptions } from "@/components/ContactFormFields";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SummaryBox from "@/components/seo/SummaryBox";
import ComparisonTable from "@/components/seo/ComparisonTable";
import QuickAnswer from "@/components/seo/QuickAnswer";
import FAQSection from "@/components/seo/FAQSection";
import StickyCTA from "@/components/StickyCTA";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";

/* ── Data ── */
const pains = [
  { icon: AlertTriangle, text: "No sabes cuántos vinos de tu carta llevan meses sin venderse." },
  { icon: DollarSign, text: "Tus precios no están alineados con lo que el comensal está dispuesto a pagar." },
  { icon: Layers, text: "La carta no refleja la identidad de tu restaurante ni tu oferta gastronómica." },
  { icon: Eye, text: "El comensal se pierde, no entiende la carta y acaba pidiendo el más barato." },
  { icon: Target, text: "Tienes vinos que se canibalizan entre sí sin aportar variedad real." },
  { icon: TrendingUp, text: "No aprovechas oportunidades de venta por copa que multiplicarían tu ticket." },
];

const analysisPoints = [
  { icon: DollarSign, title: "Distribución de precios", desc: "Analizamos cómo se reparten los rangos de precio y si hay saltos que frenan la venta." },
  { icon: Layers, title: "Equilibrio de la carta", desc: "Evaluamos la proporción entre tintos, blancos, rosados y espumosos frente a tu perfil gastronómico." },
  { icon: Wine, title: "Oportunidades de venta por copa", desc: "Identificamos vinos ideales para servir por copa y aumentar el ticket medio." },
  { icon: BarChart3, title: "Rotación potencial", desc: "Detectamos referencias con baja probabilidad de rotación basándonos en precio, tipo y posicionamiento." },
  { icon: Target, title: "Vinos duplicados o canibalizados", desc: "Encontramos referencias que compiten entre sí y no aportan variedad real al comensal." },
  { icon: Utensils, title: "Oportunidades de maridaje", desc: "Sugerimos combinaciones con tu carta de comida para impulsar ventas cruzadas." },
  { icon: TrendingUp, title: "Posicionamiento estratégico", desc: "Evaluamos qué vinos deberían destacarse para maximizar margen sin sacrificar experiencia." },
  { icon: FileText, title: "Estructura y usabilidad", desc: "Revisamos cómo está organizada la carta y si facilita la decisión del comensal." },
];

const reportCards = [
  { icon: FileText, title: "Análisis de estructura", desc: "Organización, categorías y jerarquía de la carta." },
  { icon: DollarSign, title: "Evaluación de rangos de precio", desc: "Posicionamiento de precios, escalado y efecto ancla." },
  { icon: Layers, title: "Optimización de surtido", desc: "Recomendaciones de referencias a añadir, eliminar o destacar." },
  { icon: Zap, title: "Recomendaciones concretas", desc: "Acciones específicas para mejorar margen, rotación y experiencia." },
  { icon: TrendingUp, title: "Potencial de ventas", desc: "Estimación del incremento posible en ventas de vino." },
  { icon: BarChart3, title: "Impacto económico estimado", desc: "Proyección del impacto en ticket medio y facturación mensual." },
];

const steps = [
  { num: "1", title: "Sube tu carta o enlace", desc: "Adjunta el PDF de tu carta de vinos o pega la URL si es digital. Cualquier formato." },
  { num: "2", title: "Nuestro equipo la analiza", desc: "Revisamos estructura, precios, equilibrio, rotación y oportunidades de mejora con datos." },
  { num: "3", title: "Recibes tu informe", desc: "En menos de 48 h recibirás un informe detallado con recomendaciones accionables." },
];

const discoveries = [
  "Un 35 % de las referencias en una misma franja de precio, generando canibalización y confusión.",
  "Vinos con precio de compra alto y margen por debajo de la media del mercado.",
  "Huecos evidentes en la oferta: sin espumosos accesibles, sin blancos por copa, sin opciones locales.",
  "Oportunidades de venta por copa no aprovechadas que podrían incrementar el ticket medio un 15-25 %.",
  "Maridajes naturales con la carta gastronómica que no están comunicados ni sugeridos.",
  "Referencias que llevan más de 6 meses sin rotación ocupando espacio en la carta y en la bodega.",
];

const whoFits = [
  { profile: "Restaurantes con 50+ referencias", desc: "Cuanta más carta, más oportunidades de optimización." },
  { profile: "Grupos de restauración", desc: "Análisis de coherencia entre locales y oportunidades de centralización." },
  { profile: "Hoteles con F&B", desc: "Múltiples puntos de venta con cartas que necesitan alinearse." },
  { profile: "Restaurantes que quieren vender más vino", desc: "Si sientes que tu carta 'informa' pero no 'vende', esto es para ti." },
];

const whatHappensAfter = [
  { title: "Recibes el informe", desc: "Un documento claro con diagnóstico, oportunidades y recomendaciones priorizadas." },
  { title: "Revisamos juntos los hallazgos", desc: "Si quieres, agendamos una llamada de 20 min para explicarte los puntos clave." },
  { title: "Decides sin presión", desc: "El análisis es tuyo. Puedes aplicarlo por tu cuenta o con nuestra ayuda." },
  { title: "Si encaja, te proponemos Winerim", desc: "Te mostramos cómo Winerim automatiza las mejoras que detectamos, adaptado a tu caso." },
];

const faqs = [
  { q: "¿Cuánto cuesta el análisis de carta?", a: "Es completamente gratuito. No hay costes ocultos ni compromiso." },
  { q: "¿Qué formatos aceptáis?", a: "PDF, imagen (JPG, PNG, WebP) o enlace a tu carta digital. Cualquier formato." },
  { q: "¿Cuánto tarda el informe?", a: "Menos de 48 horas laborables desde que recibimos tu carta." },
  { q: "¿Qué información necesitáis de mi parte?", a: "Solo tu carta de vinos, el nombre del restaurante y tu email. El resto es opcional pero nos ayuda a personalizar el análisis." },
  { q: "¿Vais a intentar venderme algo?", a: "No. El informe es tuyo y puedes aplicarlo por tu cuenta. Si encaja, te explicaremos cómo Winerim puede automatizar las mejoras, pero sin presión." },
  { q: "¿Qué tipo de restaurantes se benefician más?", a: "Restaurantes con 50 o más referencias en carta, grupos de restauración y hoteles con servicio de F&B. Si tienes menos de 50 referencias, el análisis sigue siendo útil pero el impacto será menor." },
  { q: "¿Es un análisis automático o lo hace una persona?", a: "Combinamos análisis algorítmico con revisión experta. El resultado es un informe profesional, no un output genérico de IA." },
  { q: "¿Puedo aplicar las recomendaciones sin contratar Winerim?", a: "Sí, al 100 %. El informe incluye recomendaciones accionables que puedes implementar de forma independiente." },
  { q: "¿Mis datos están seguros?", a: "Sí. Solo usamos tu carta para el análisis. No compartimos datos con terceros. Consulta nuestra política de privacidad." },
  { q: "¿Puedo analizar varias cartas si tengo varios locales?", a: "Sí. Puedes enviar tantas cartas como quieras. Analizamos cada una de forma independiente." },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

const AnalizaCarta = () => {
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "link">("upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setFileName(null); return; }
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Formato no soportado. Sube un PDF o imagen (JPG, PNG, WebP).");
      e.target.value = "";
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo es demasiado grande. Máximo 10 MB.");
      e.target.value = "";
      setFileName(null);
      return;
    }
    setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const restaurant = (fd.get("restaurant") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const city = (fd.get("city") as string)?.trim();
    const refsCount = (fd.get("references_count") as string)?.trim();
    const menuLink = (fd.get("menu_link") as string)?.trim();

    if (!restaurant || !email) {
      toast.error("Por favor completa los campos obligatorios.");
      setSubmitting(false);
      return;
    }

    let uploadedUrl: string | null = null;
    const file = fileRef.current?.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop();
      const path = `analisis/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("admin-uploads")
        .upload(path, file);
      if (uploadError) {
        toast.error("Error al subir el archivo. Inténtalo de nuevo.");
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("admin-uploads").getPublicUrl(path);
      uploadedUrl = urlData.publicUrl;
    }

    const finalLink = uploadedUrl || menuLink || null;
    const leadData: Record<string, string | null> = {
      form_type: "analisis-carta",
      restaurant: restaurant || null,
      email: email || null,
      city: city || null,
      references_count: refsCount || null,
      menu_link: finalLink,
      business_type: (fd.get("business_type") as string)?.trim() || null,
    };
    const { error } = await supabase.from("contact_leads").insert(leadData);

    if (error) {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } else {
      toast.success("¡Carta recibida! Te enviaremos el análisis en menos de 48 h.");
      (e.target as HTMLFormElement).reset();
      setFileName(null);
      notifyLead(leadData);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Análisis Gratuito de tu Carta de Vinos | Winerim"
        description="Envía tu carta de vinos y recibe un análisis profesional gratuito con recomendaciones para mejorar márgenes, rotación y ventas. Sin compromiso."
        url="https://winerim.wine/analisis-carta"
      />
      <Navbar />

      <main>
        {/* ═══════════ 1. HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.1),transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Análisis de carta" }]} />
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-8">
                  <Zap size={14} className="text-accent" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent">100 % gratuito · Sin compromiso</span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
                  Descubre cuánto más podrías{" "}
                  <span className="text-gradient-wine italic">vender</span>{" "}
                  con tu carta de vinos
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  Analizamos tu carta de vinos y te mostramos oportunidades concretas para mejorar márgenes, rotación y ventas. Gratis. En 48 h.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#formulario"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
                  >
                    <Upload size={16} />
                    Enviar mi carta para análisis
                  </a>
                  <a
                    href="#formulario"
                    onClick={() => setMode("link")}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
                  >
                    <Link2 size={16} className="text-wine" />
                    Pegar enlace de mi carta
                  </a>
                </div>

                <div className="flex items-center gap-6 mt-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> Informe en 48 h</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Sin compromiso</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> 100 % gratuito</span>
                </div>
              </motion.div>

              {/* Visual card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="hidden lg:block"
              >
                <div className="relative bg-gradient-card rounded-2xl border border-border p-8 glow-wine">
                  <div className="absolute -inset-4 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-xl" />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <BarChart3 size={20} className="text-wine" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm">Informe de análisis</p>
                        <p className="text-xs text-muted-foreground">Carta de vinos · Restaurante ejemplo</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Estructura", pct: 72 },
                        { label: "Precios", pct: 45 },
                        { label: "Equilibrio", pct: 88 },
                        { label: "Rotación", pct: 34 },
                        { label: "Maridajes", pct: 60 },
                      ].map((bar) => (
                        <div key={bar.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{bar.label}</span>
                            <span className="text-foreground font-semibold">{bar.pct}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-wine"
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.pct}%` }}
                              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">Potencial de mejora estimado</p>
                      <p className="font-heading text-2xl font-bold text-gradient-wine">+23 % ventas de vino</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══════════ 2. RESUMEN EJECUTIVO ═══════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <SummaryBox
            label="Resumen"
            definition="El análisis de carta de Winerim es un diagnóstico profesional y gratuito que evalúa la estructura, los precios, el equilibrio y las oportunidades de mejora de tu carta de vinos para aumentar márgenes, rotación y ventas."
            bullets={[
              "Gratuito y sin compromiso. No hay costes ocultos.",
              "Informe entregado en menos de 48 horas.",
              "Combina análisis algorítmico con revisión experta.",
              "Recomendaciones accionables que puedes aplicar por tu cuenta.",
              "Diseñado para restaurantes con 50+ referencias en carta.",
            ]}
          />
        </section>

        {/* ═══════════ 3. PAINS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">¿Te suena?</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Los problemas que la mayoría de cartas{" "}
                <span className="text-gradient-wine italic">no detectan</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Estos problemas son muy comunes y, sin un análisis riguroso, pasan desapercibidos durante meses o años.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pains.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/20 transition-colors h-full">
                      <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-destructive" />
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{p.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 4. POR QUÉ ANTES DE TOCAR LA CARTA ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <QuickAnswer
                question="¿Por qué analizar la carta antes de modificarla?"
                answer="Cambiar una carta de vinos sin datos es como operar sin diagnóstico. El análisis previo permite tomar decisiones basadas en evidencia: qué eliminar, qué añadir, qué destacar y a qué precio. Sin él, los cambios son intuitivos y los resultados, impredecibles."
                details={[
                  "Evitas eliminar un vino que vende bien o añadir uno que canibaliza otra referencia.",
                  "Descubres si el problema es el surtido, el precio, la estructura o la falta de comunicación.",
                  "Priorizas las acciones de mayor impacto con menor esfuerzo operativo.",
                  "Construyes una base de datos para medir el resultado del cambio.",
                ]}
                source="Metodología de optimización de cartas de Winerim, basada en el análisis de más de 500 cartas de vinos."
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 5. INTUICIÓN VS DATOS ═══════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          <ComparisonTable
            title="Intuición vs. análisis con datos"
            subtitle="La diferencia entre cambiar la carta y optimizarla."
            columns={["Intuición", "Análisis con datos"]}
            rows={[
              { feature: "Detectar vinos sin rotación", options: ["partial", true] },
              { feature: "Identificar canibalización de referencias", options: [false, true] },
              { feature: "Optimizar distribución de precios", options: ["partial", true] },
              { feature: "Medir impacto de los cambios", options: [false, true] },
              { feature: "Priorizar acciones por impacto económico", options: [false, true] },
              { feature: "Detectar oportunidades de venta por copa", options: ["partial", true] },
              { feature: "Alinear carta con perfil gastronómico", options: ["partial", true] },
              { feature: "Replicable y escalable a varios locales", options: [false, true] },
            ]}
            highlightColumn={1}
          />
        </section>

        {/* ═══════════ 6. QUÉ ANALIZAMOS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Qué analizamos</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                8 dimensiones de{" "}
                <span className="text-gradient-wine italic">tu carta</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Cada carta se analiza desde múltiples ángulos para detectar todas las oportunidades de mejora.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {analysisPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <div className="group bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4 group-hover:bg-wine/20 transition-colors">
                        <Icon size={22} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-base font-semibold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 7. QUÉ RECIBIRÁS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Tu informe</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Qué incluye{" "}
                <span className="text-gradient-wine italic">tu informe</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reportCards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-colors h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon size={18} className="text-accent" />
                        </div>
                        <h3 className="font-heading font-semibold">{c.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 8. CÓMO FUNCIONA ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Así de{" "}
                <span className="text-gradient-wine italic">fácil</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-wine text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold font-heading">
                      {s.num}
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    {i < steps.length - 1 && (
                      <ChevronRight size={20} className="hidden md:block absolute top-7 -right-4 text-muted-foreground/30" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 9. EJEMPLO DE HALLAZGOS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
                <Lightbulb size={14} className="text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">Hallazgos reales</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Lo que nuestros análisis{" "}
                <span className="text-gradient-wine italic">descubren</span>
              </h2>
              <p className="text-muted-foreground">
                Estos son hallazgos reales detectados en cartas de restaurantes como el tuyo.
              </p>
            </ScrollReveal>

            <div className="space-y-3">
              {discoveries.map((d, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/20 transition-colors">
                    <CheckCircle2 size={20} className="text-wine flex-shrink-0 mt-0.5" />
                    <p className="text-foreground/90 leading-relaxed">{d}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 10. PARA QUIÉN ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Para quién</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                ¿Para qué perfiles{" "}
                <span className="text-gradient-wine italic">encaja mejor?</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {whoFits.map((w, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="p-6 rounded-xl border border-border bg-gradient-card hover:border-wine/20 transition-colors h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Users size={18} className="text-wine" />
                      <h3 className="font-heading font-bold">{w.profile}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 p-5 rounded-xl border border-border bg-background flex items-start gap-3">
                <XCircle size={18} className="text-muted-foreground/50 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Nota:</strong> si tu carta tiene menos de 20 referencias de vino, el análisis será menos revelador. Aun así, puede darte ideas útiles sobre estructura y pricing.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 11. QUÉ PASA DESPUÉS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Después del análisis</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Qué pasa{" "}
                <span className="text-gradient-wine italic">después</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {whatHappensAfter.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-5 p-6 rounded-xl border border-border bg-gradient-card">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10 text-wine font-bold shrink-0 font-heading">{i + 1}</span>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 12. FORMULARIO ═══════════ */}
        <section id="formulario" className="section-padding bg-gradient-dark scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Envía tu carta</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Analiza tu carta de vinos{" "}
                <span className="text-gradient-wine italic">ahora</span>
              </h2>
              <p className="text-muted-foreground">
                Completa el formulario y recibirás tu informe en menos de 48 horas. Gratis.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10 glow-wine">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Restaurant */}
                  <div>
                    <Label htmlFor="restaurant" className="text-sm font-medium">
                      Nombre del restaurante <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="restaurant"
                      name="restaurant"
                      placeholder="Ej. Restaurante La Viña"
                      required
                      maxLength={100}
                      className="bg-background border-border mt-1.5"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@restaurante.com"
                      required
                      maxLength={255}
                      className="bg-background border-border mt-1.5"
                    />
                  </div>

                  {/* City + References (optional but helpful) */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">Ciudad</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Ej. Madrid"
                        maxLength={80}
                        className="bg-background border-border mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="references_count" className="text-sm font-medium">Nº de referencias</Label>
                      <select
                        id="references_count"
                        name="references_count"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona un rango</option>
                        {referencesOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Business type (optional qualifier) */}
                  <div>
                    <Label htmlFor="business_type" className="text-sm font-medium">Tipo de negocio</Label>
                    <select
                      id="business_type"
                      name="business_type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona tipo de negocio</option>
                      {businessTypeOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Upload / Link toggle */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMode("upload")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all ${
                        mode === "upload"
                          ? "border-wine/40 bg-wine/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-wine/20"
                      }`}
                    >
                      <Upload size={16} />
                      Subir archivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("link")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all ${
                        mode === "link"
                          ? "border-wine/40 bg-wine/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-wine/20"
                      }`}
                    >
                      <Link2 size={16} />
                      Pegar enlace
                    </button>
                  </div>

                  {mode === "upload" ? (
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="relative cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-wine/30 bg-background p-8 text-center transition-colors"
                    >
                      <Upload size={28} className="mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        {fileName ? (
                          <span className="text-foreground font-medium">{fileName}</span>
                        ) : (
                          <>Haz clic o arrastra tu carta de vinos <br /><span className="text-xs">PDF, JPG, PNG · Máx 10 MB</span></>
                        )}
                      </p>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="menu_link" className="text-sm font-medium">URL de tu carta</Label>
                      <Input
                        id="menu_link"
                        name="menu_link"
                        type="url"
                        placeholder="https://tu-restaurante.com/carta-de-vinos"
                        maxLength={500}
                        className="bg-background border-border mt-1.5"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-wine text-primary-foreground py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    {submitting ? "Enviando…" : "Enviar carta para análisis gratuito"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Sin compromiso. Informe en menos de 48 h.{" "}
                    <Link to="/privacidad" className="underline hover:text-foreground">Política de privacidad</Link>.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 13. FAQs ═══════════ */}
        <FAQSection faqs={faqs} title="Preguntas frecuentes sobre el análisis" />

        {/* ═══════════ 14. CTA FINAL ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                    Gratuito y sin compromiso
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Tu carta tiene potencial oculto.{" "}
                    <span className="text-gradient-wine italic">Descúbrelo.</span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                    Envíanos tu carta de vinos y te mostramos qué mejorar, cuánto puedes ganar y por dónde empezar. Sin coste. Sin compromiso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#formulario"
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                    >
                      Enviar carta para análisis
                      <ArrowRight size={16} />
                    </a>
                    <Link
                      to="/demo"
                      className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all hover:-translate-y-0.5"
                    >
                      Solicitar demo
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-6">
                    Más de 500 cartas analizadas. Informe en 48 h.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <InternalLinks links={[
        { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Carta de vinos rentable", type: "guide" },
        { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", type: "resource" },
        { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
        { to: "/herramientas", label: "Todas las herramientas", type: "tool" },
      ]} />

      {/* Sticky CTA — excluded on this page via StickyCTA logic, so we skip it */}
      <Footer />
    </div>
  );
};

export default AnalizaCarta;
