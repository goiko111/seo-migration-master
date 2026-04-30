import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Globe, TrendingUp, Database, Zap, Rocket, Send, Linkedin, MessageCircle, Mail, CheckCircle2, Users, Target, Sparkles } from "lucide-react";
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
import { trackFormConversion } from "@/utils/trackConversion";
import { useLanguage } from "@/i18n/LanguageContext";

const WA_NUMBER = "34658718350";
const WA_MSG_ES = encodeURIComponent("Hola, me interesa trabajar en Winerim. Puedo saber mas?");
const WA_MSG_EN = encodeURIComponent("Hi, I am interested in working at Winerim. Can I learn more?");
const WA_MSG_DE = encodeURIComponent("Hallo, ich bin daran interessiert, bei Winerim zu arbeiten. Kann ich mehr erfahren?");
const WA_MSG_PT = encodeURIComponent("Ola, estou interessado em trabalhar na Winerim. Posso saber mais?");

const AREAS = {
  es: [
    { value: "tech", label: "Tecnologia / Desarrollo" },
    { value: "product", label: "Producto / Diseno" },
    { value: "sales", label: "Ventas / Comercial" },
    { value: "marketing", label: "Marketing / Contenidos" },
    { value: "ops", label: "Operaciones / Customer Success" },
    { value: "other", label: "Otro" },
  ],
  en: [
    { value: "tech", label: "Technology / Development" },
    { value: "product", label: "Product / Design" },
    { value: "sales", label: "Sales / Business" },
    { value: "marketing", label: "Marketing / Content" },
    { value: "ops", label: "Operations / Customer Success" },
    { value: "other", label: "Other" },
  ],
  de: [
    { value: "tech", label: "Technologie / Entwicklung" },
    { value: "product", label: "Produkt / Design" },
    { value: "sales", label: "Vertrieb / Business" },
    { value: "marketing", label: "Marketing / Inhalt" },
    { value: "ops", label: "Betrieb / Customer Success" },
    { value: "other", label: "Sonstiges" },
  ],
  pt: [
    { value: "tech", label: "Tecnologia / Desenvolvimento" },
    { value: "product", label: "Produto / Design" },
    { value: "sales", label: "Vendas / Negocios" },
    { value: "marketing", label: "Marketing / Conteudo" },
    { value: "ops", label: "Operacoes / Sucesso do Cliente" },
    { value: "other", label: "Outro" },
  ],
};

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 size={16} className="text-wine shrink-0 mt-0.5" />
    <span className="text-sm text-muted-foreground leading-relaxed">{children}</span>
  </li>
);

const Empleo = () => {
  const { lang, t, allLangPaths } = useLanguage();
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
  const currentAreas = AREAS[lang as keyof typeof AREAS] || AREAS.es;
  const getWAMessage = () => {
    const messages: Record<string, string> = {
      es: WA_MSG_ES,
      en: WA_MSG_EN,
      de: WA_MSG_DE,
      pt: WA_MSG_PT,
    };
    return messages[lang] || WA_MSG_ES;
  };

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

      notifyLead({
        form_type: "empleo",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message || null,
      });

      trackFormConversion("empleo");
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
        hreflang={allLangPaths("/empleo")}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* ── Hero ────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
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
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
            >
              {t.empleo_hero_title ?? "Únete al equipo que está transformando el mundo del vino"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t.empleo_hero_subtitle ?? "En Winerim combinamos tecnología, datos y pasión por el vino para ayudar a restaurantes de toda Europa a tomar mejores decisiones."}
            </motion.p>
            {/* Quick info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {[
                { emoji: "📍", text: "Remoto (Europa)" },
                { emoji: "🏠", text: "Full-time" },
                { emoji: "💼", text: "Startup con tracción" },
                { emoji: "🌍", text: "4 idiomas, 15 países" },
              ].map((p) => (
                <span key={p.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground">
                  {p.emoji} {p.text}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Sobre Winerim ─────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🍷 Sobre Winerim
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                No somos una startup más.{" "}
                <span className="text-gradient-wine italic">Estamos construyendo el estándar.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Winerim es la plataforma de gestión inteligente del vino para restaurantes, hoteles y grupos de restauración.
                  Conectamos carta, stock, pricing, ventas e inteligencia de compras en un solo ecosistema con IA.
                </p>
                <p>
                  Ya operamos en <strong className="text-foreground">15 países, 4 idiomas</strong> y más de <strong className="text-foreground">1.000 bodegas de restaurante</strong> confían en nosotros.
                  Somos un equipo pequeño, remoto e internacional con sede en España.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Tu Rol ───────────────────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🎯 Tu rol
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                Buscamos perfiles que marquen la diferencia
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Briefcase, title: "Impacto directo", desc: "Tu trabajo llega a miles de restaurantes que transforman su negocio con datos." },
                { icon: Globe, title: "Equipo remoto", desc: "Trabaja desde donde quieras, con un equipo distribuido por Europa." },
                { icon: TrendingUp, title: "Crecimiento real", desc: "Startup en expansión. Oportunidades de desarrollo y responsabilidad desde el día 1." },
                { icon: Database, title: "Cultura data-driven", desc: "Tomamos decisiones basadas en datos, no en opiniones." },
                { icon: Zap, title: "Autonomía", desc: "Confiamos en ti. Tú decides cómo alcanzar los objetivos." },
                { icon: Rocket, title: "Producto con tracción", desc: "+1.000 bodegas ya confían en Winerim. No es una idea, es un negocio." },
              ].map((b, i) => (
                <ScrollReveal key={b.title} delay={i * 0.05}>
                  <div className="p-6 rounded-xl border border-border bg-gradient-card hover:border-wine/30 transition-colors h-full">
                    <b.icon className="w-8 h-8 text-wine mb-4" />
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Responsabilidades + Requisitos ─────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-gradient-card rounded-2xl border border-border p-8 h-full">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                    <Target size={18} className="text-wine" /> Responsabilidades
                  </h3>
                  <ul className="space-y-3">
                    <Check>Contribuir al desarrollo del producto o la estrategia comercial según tu área</Check>
                    <Check>Trabajar con autonomía y reportar resultados</Check>
                    <Check>Colaborar con un equipo internacional (ES, EN, IT, FR)</Check>
                    <Check>Proponer mejoras y soluciones basadas en datos</Check>
                    <Check>Participar en la definición de roadmap y prioridades</Check>
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-card rounded-2xl border border-border p-8 h-full">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                    <Users size={18} className="text-wine" /> Requisitos
                  </h3>
                  <ul className="space-y-3">
                    <Check>Experiencia mínima de 2 años en tu área</Check>
                    <Check>Nivel alto de español y/o inglés</Check>
                    <Check>Capacidad de trabajo autónomo y remoto</Check>
                    <Check>Mentalidad de startup: flexibilidad, velocidad, criterio</Check>
                    <Check>Pasión por la tecnología y/o el sector HORECA</Check>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Qué Ofrecemos ───────────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🎁 Qué ofrecemos
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                Compensación y beneficios
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
                <ul className="space-y-4">
                  <Check>Salario competitivo: <strong className="text-foreground">30.000-55.000€</strong> según perfil y responsabilidad</Check>
                  <Check>Variable por objetivos: hasta <strong className="text-foreground">20%</strong> del salario base</Check>
                  <Check>Equity / stock options para perfiles senior</Check>
                  <Check>Trabajo 100% remoto con flexibilidad horaria real</Check>
                  <Check>Presupuesto de formación y conferencias (1.000€/año)</Check>
                  <Check>Setup de oficina en casa: te enviamos lo que necesites</Check>
                  <Check>23 días de vacaciones + tu cumpleaños libre</Check>
                  <Check>Team offsite presencial 2 veces al año</Check>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Testimonios ──────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                💬 El equipo habla
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-10">
                ¿Cómo es trabajar en Winerim?
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  quote: "En 6 meses he aprendido más que en 3 años de consultora. Aquí tu trabajo tiene impacto real desde el día 1.",
                  name: "Laura M.",
                  role: "Product Designer",
                },
                {
                  quote: "La autonomía es real. Nadie te microgestiona. Si tienes criterio y ejecutas, aquí vuelas.",
                  name: "Carlos R.",
                  role: "Full-stack Developer",
                },
                {
                  quote: "Vendemos un producto que los clientes agradecen. Eso hace que ir a trabajar sea muy diferente.",
                  name: "Marta G.",
                  role: "Account Executive",
                },
              ].map((t, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-2xl border border-border p-7">
                    <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">"{t.quote}"</p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Valores / ADN ──────────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
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
                  <div className="flex gap-4 items-start p-5 rounded-lg border border-border bg-gradient-card">
                    <span className="text-2xl shrink-0">{v.emoji}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Formulario + CTAs ───────────────── */}
        <section id="candidatura" className="section-padding bg-gradient-dark">
          <div className="max-w-2xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
                {t.empleo_form_title ?? "Envía tu candidatura"}
              </h2>
              <p className="text-center text-muted-foreground mb-4">
                {t.empleo_form_subtitle ?? "¿Quieres formar parte? Cuéntanos sobre ti."}
              </p>
              {/* Multi-channel CTAs */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${getWAMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-wine transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp: 658 718 350
                </a>
                <span className="text-muted-foreground/30">|</span>
                <a
                  href="mailto:info@winerim.com?subject=Candidatura%20Winerim"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-wine transition-colors"
                >
                  <Mail size={14} /> info@winerim.com
                </a>
              </div>
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
                  <Label>{t.empleo_area_label ?? "Area de interes"}</Label>
                  <Select value={form.area_of_interest} onValueChange={(v) => setForm({ ...form, area_of_interest: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.empleo_area_placeholder ?? "Selecciona un area"} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentAreas.map((a) => (
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
