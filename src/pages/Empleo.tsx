import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Globe, TrendingUp, Database, Zap, Rocket, Send, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { useLanguage } from "@/i18n/LanguageContext";

const AREAS = [
  { value: "tech", label: "Tecnología / Desarrollo" },
  { value: "product", label: "Producto / Diseño" },
  { value: "sales", label: "Ventas / Comercial" },
  { value: "marketing", label: "Marketing / Contenidos" },
  { value: "ops", label: "Operaciones / Customer Success" },
  { value: "other", label: "Otro" },
];

const BENEFITS = [
  { icon: Briefcase, title: "Impacto real", desc: "Tu trabajo llega a miles de restaurantes que transforman su negocio con datos." },
  { icon: Globe, title: "Equipo remoto e internacional", desc: "Trabaja desde donde quieras, con un equipo distribuido por Europa." },
  { icon: TrendingUp, title: "Crecimiento profesional", desc: "Crece en una startup en expansión con oportunidades reales de desarrollo." },
  { icon: Database, title: "Cultura data-driven", desc: "Tomamos decisiones basadas en datos, no en opiniones." },
  { icon: Zap, title: "Autonomía + responsabilidad", desc: "Confiamos en ti. Tú decides cómo alcanzar los objetivos." },
  { icon: Rocket, title: "Producto con tracción", desc: "+1.000 bodegas de restaurante ya confían en Winerim." },
];

const Empleo = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    area_of_interest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("job_applications").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        linkedin_url: form.linkedin_url.trim() || null,
        area_of_interest: form.area_of_interest || null,
        message: form.message.trim() || null,
      });

      if (error) throw error;

      // Fire notification (non-blocking)
      notifyLead({
        form_type: "empleo",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message || null,
      });

      setSubmitted(true);
      toast({ title: t.empleo_success_title ?? "¡Candidatura enviada!", description: t.empleo_success_desc ?? "Revisaremos tu perfil y te contactaremos pronto." });
    } catch {
      toast({ title: "Error", description: "No se pudo enviar la candidatura. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title={t.empleo_meta_title ?? "Trabaja en Winerim — Únete al equipo"}
        description={t.empleo_meta_desc ?? "Únete al equipo que está transformando la gestión del vino en hostelería. Descubre las oportunidades de empleo en Winerim."}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* ── Hero ────────────────────────────── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-wine/10 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-wine/15 text-wine text-xs font-semibold tracking-widest uppercase mb-6"
            >
              {t.empleo_badge ?? "Estamos contratando"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              {t.empleo_hero_title ?? "Únete al equipo que está transformando el mundo del vino"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t.empleo_hero_subtitle ?? "En Winerim combinamos tecnología, datos y pasión por el vino para ayudar a restaurantes de toda Europa a tomar mejores decisiones."}
            </motion.p>
          </div>
        </section>

        {/* ── Por qué Winerim ─────────────────── */}
        <section className="py-20 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
                {t.empleo_why_title ?? "¿Por qué Winerim?"}
              </h2>
              <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
                {t.empleo_why_subtitle ?? "No somos una startup más. Estamos construyendo el estándar de la industria."}
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BENEFITS.map((b, i) => (
                <ScrollReveal key={b.title} delay={i * 0.08}>
                  <div className="p-6 rounded-lg border border-border bg-card hover:border-wine/30 transition-colors">
                    <b.icon className="w-8 h-8 text-wine mb-4" />
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Valores / ADN ──────────────────── */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t.empleo_values_title ?? "Nuestro ADN"}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-12">
                {t.empleo_values_subtitle ?? "Los principios que guían todo lo que hacemos."}
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                { emoji: "🎯", text: t.empleo_value_1 ?? "Obsesión por el cliente: todo empieza y termina en el restaurante." },
                { emoji: "📊", text: t.empleo_value_2 ?? "Datos > opiniones: medimos, analizamos y mejoramos." },
                { emoji: "🚀", text: t.empleo_value_3 ?? "Velocidad con criterio: ejecutamos rápido, pero con cabeza." },
                { emoji: "🤝", text: t.empleo_value_4 ?? "Transparencia radical: compartimos contexto, no solo tareas." },
              ].map((v) => (
                <ScrollReveal key={v.emoji}>
                  <div className="flex gap-4 items-start p-5 rounded-lg border border-border bg-background">
                    <span className="text-2xl shrink-0">{v.emoji}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Formulario ─────────────────────── */}
        <section id="candidatura" className="py-20 border-t border-border">
          <div className="max-w-2xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
                {t.empleo_form_title ?? "Envía tu candidatura"}
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                {t.empleo_form_subtitle ?? "¿Quieres formar parte? Cuéntanos sobre ti."}
              </p>
            </ScrollReveal>

            {submitted ? (
              <ScrollReveal>
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-wine/15 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-wine" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {t.empleo_success_title ?? "¡Candidatura enviada!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.empleo_success_desc ?? "Revisaremos tu perfil y te contactaremos pronto."}
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emp-name">{t.form_name_label ?? "Nombre"} *</Label>
                    <Input
                      id="emp-name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.form_name_placeholder ?? "Tu nombre completo"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emp-email">{t.form_email_label ?? "Email"} *</Label>
                    <Input
                      id="emp-email"
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.form_email_placeholder ?? "tu@email.com"}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emp-phone">{t.form_phone_label ?? "Teléfono"}</Label>
                    <Input
                      id="emp-phone"
                      type="tel"
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emp-linkedin" className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </Label>
                    <Input
                      id="emp-linkedin"
                      type="url"
                      maxLength={255}
                      value={form.linkedin_url}
                      onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.empleo_area_label ?? "Área de interés"}</Label>
                  <Select value={form.area_of_interest} onValueChange={(v) => setForm({ ...form, area_of_interest: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.empleo_area_placeholder ?? "Selecciona un área"} />
                    </SelectTrigger>
                    <SelectContent>
                      {AREAS.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emp-message">{t.empleo_message_label ?? "¿Por qué quieres unirte a Winerim?"}</Label>
                  <Textarea
                    id="emp-message"
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.empleo_message_placeholder ?? "Cuéntanos sobre ti, tu experiencia y tu motivación..."}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-wine text-primary-foreground hover:opacity-90 transition-all text-sm font-semibold tracking-wider uppercase py-6"
                >
                  {loading
                    ? (t.empleo_sending ?? "Enviando...")
                    : (t.empleo_submit ?? "Enviar candidatura")}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Empleo;
