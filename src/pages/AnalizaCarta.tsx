import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Upload,
  Link2,
  BarChart3,
  DollarSign,
  Layers,
  Utensils,
  Wine,
  TrendingUp,
  FileText,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import InternalLinks from "@/components/seo/InternalLinks";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ── Data ── */
const analysisPoints = [
  { icon: DollarSign, title: "Distribución de precios", desc: "Analizamos cómo se reparten los rangos de precio y si hay saltos que frenan la venta." },
  { icon: Layers, title: "Equilibrio de la carta", desc: "Evaluamos la proporción entre tintos, blancos, rosados y espumosos." },
  { icon: Wine, title: "Oportunidades de venta por copa", desc: "Identificamos vinos ideales para servir por copa y aumentar el ticket." },
  { icon: BarChart3, title: "Rotación potencial", desc: "Detectamos referencias con baja probabilidad de rotación." },
  { icon: Target, title: "Vinos duplicados en estilo", desc: "Encontramos referencias que compiten entre sí y no aportan variedad real." },
  { icon: Utensils, title: "Oportunidades de maridaje", desc: "Sugerimos combinaciones con tu carta de comida para impulsar ventas cruzadas." },
];

const reportCards = [
  { icon: FileText, title: "Análisis de estructura", desc: "Organización, categorías y jerarquía de la carta." },
  { icon: DollarSign, title: "Evaluación de rangos de precio", desc: "Posicionamiento de precios y escalado óptimo." },
  { icon: Layers, title: "Optimización de carta", desc: "Recomendaciones de referencias a añadir, eliminar o destacar." },
  { icon: Zap, title: "Recomendaciones de mejora", desc: "Acciones concretas para mejorar la experiencia del comensal." },
  { icon: TrendingUp, title: "Potencial de ventas", desc: "Estimación del incremento posible en ventas de vino." },
  { icon: BarChart3, title: "Estimación de impacto económico", desc: "Proyección del impacto en ticket medio y facturación." },
];

const steps = [
  { num: "1", title: "Sube tu carta o enlace", desc: "Adjunta el PDF de tu carta de vinos o pega la URL si es digital." },
  { num: "2", title: "Nuestro sistema la analiza", desc: "Revisamos estructura, precios, equilibrio y oportunidades de mejora." },
  { num: "3", title: "Recibes tu informe", desc: "En menos de 48 h recibirás un informe detallado con recomendaciones." },
];

const discoveries = [
  "Precios mal posicionados que frenan la venta de vinos de mayor margen",
  "Vinos que llevan meses sin rotación ocupando espacio en la carta",
  "Huecos en la carta donde falta una referencia clave",
  "Oportunidades de venta por copa no aprovechadas",
  "Maridajes que podrían duplicar la venta de ciertos vinos",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
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

    // Upload file if present
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

    const { error } = await supabase.from("contact_leads").insert({
      form_type: "analisis-carta",
      restaurant: restaurant || null,
      email: email || null,
      city: city || null,
      references_count: refsCount || null,
      menu_link: finalLink,
    });

    if (error) {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } else {
      toast.success("¡Carta recibida! Te enviaremos el análisis en menos de 48 h.");
      (e.target as HTMLFormElement).reset();
      setFileName(null);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Análisis Gratuito de tu Carta de Vinos | Winerim"
        description="Sube tu carta de vinos y recibe un análisis gratuito con recomendaciones para vender más vino, mejorar precios y optimizar la rotación en tu restaurante."
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
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent">100 % gratuito</span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
                  Analizamos tu carta de vinos{" "}
                  <span className="text-gradient-wine italic">gratis</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  Descubre en minutos cómo mejorar tu carta de vinos para vender más, aumentar tu ticket medio y rotar mejor tu bodega.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#formulario"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
                  >
                    <Upload size={16} />
                    Subir mi carta de vinos
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
                    {/* Fake chart bars */}
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

        {/* ═══════════ 2. QUÉ ANALIZAMOS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Qué analizamos</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Qué descubrirás en{" "}
                <span className="text-gradient-wine italic">tu informe</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Nuestro análisis detecta oportunidades de mejora que la mayoría de restaurantes desconocen.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {analysisPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <div className="group bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4 group-hover:bg-wine/20 transition-colors">
                        <Icon size={22} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 3. QUÉ RECIBIRÁS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Tu informe</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Tu informe{" "}
                <span className="text-gradient-wine italic">incluye</span>
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

        {/* ═══════════ 4. CÓMO FUNCIONA ═══════════ */}
        <section className="section-padding">
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

        {/* ═══════════ 5. RESULTADOS REALES ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
                <AlertTriangle size={14} className="text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">Descubrimientos habituales</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Lo que la mayoría de restaurantes{" "}
                <span className="text-gradient-wine italic">descubren</span>
              </h2>
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

        {/* ═══════════ 6. FORMULARIO ═══════════ */}
        <section id="formulario" className="section-padding scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Envía tu carta</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Analiza tu carta de vinos{" "}
                <span className="text-gradient-wine italic">ahora</span>
              </h2>
              <p className="text-muted-foreground">
                Completa el formulario y recibirás tu informe en menos de 48 horas.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10 glow-wine">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <Input
                    name="restaurant"
                    placeholder="Nombre del restaurante *"
                    required
                    maxLength={100}
                    className="bg-background border-border"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="city"
                      placeholder="Ciudad"
                      maxLength={80}
                      className="bg-background border-border"
                    />
                    <Input
                      name="references_count"
                      placeholder="Nº referencias aprox."
                      maxLength={20}
                      className="bg-background border-border"
                    />
                  </div>

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    required
                    maxLength={255}
                    className="bg-background border-border"
                  />

                  {/* Toggle upload / link */}
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
                    <Input
                      name="menu_link"
                      type="url"
                      placeholder="https://tu-restaurante.com/carta-de-vinos"
                      maxLength={500}
                      className="bg-background border-border"
                    />
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-wine text-primary-foreground py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    {submitting ? "Enviando…" : "Analizar mi carta"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Sin compromiso. Recibirás tu informe en menos de 48 h.{" "}
                    <Link to="/privacidad" className="underline hover:text-foreground">Política de privacidad</Link>.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 7. CTA FINAL ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                    Es gratis
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Descubre cuánto más podrías{" "}
                    <span className="text-gradient-wine italic">vender</span>{" "}
                    con tu carta actual
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                    Envíanos tu carta y descubre oportunidades ocultas que están frenando tus ventas de vino.
                  </p>
                  <a
                    href="#formulario"
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                  >
                    Enviar carta para análisis
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <InternalLinks links={[
        { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta", type: "guide" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Carta de vinos rentable", type: "guide" },
        { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", type: "resource" },
        { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default AnalizaCarta;
