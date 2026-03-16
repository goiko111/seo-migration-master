import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, CheckCircle, Sparkles
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import ContactFormFields from "@/components/ContactFormFields";
import { CANONICAL_DOMAIN } from "@/seo/config";

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

export interface ResourceSection {
  icon: React.ElementType;
  title: string;
  points: string[];
}

export interface ResourceBenefit {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export interface ResourceFaq {
  q: string;
  a: string;
}

export interface ResourceInternalLink {
  to: string;
  label: string;
  type: "guide" | "tool" | "resource" | "solution" | "decision-center";
}

export interface ResourcePageData {
  slug: string;
  formType: string;
  metaTitle: string;
  metaDescription: string;
  badgeIcon: React.ElementType;
  badgeLabel: string;
  heroTitle: string;
  heroDescription: string;
  heroStats: { icon: React.ElementType; label: string }[];
  problemTitle: string;
  problemDescription: string;
  problemPoints: { icon: React.ElementType; text: string }[];
  contentTitle: string;
  contentDescription: string;
  sections: ResourceSection[];
  audienceTitle: string;
  audienceItems: string[];
  whenToUseTitle: string;
  whenToUseItems: string[];
  benefits: ResourceBenefit[];
  faqs: ResourceFaq[];
  ctaFinalTitle: string;
  ctaFinalDescription: string;
  internalLinks: ResourceInternalLink[];
  downloadFile?: string;
}

const ResourceTemplate = ({ data }: { data: ResourcePageData }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("");
  const [referencesCount, setReferencesCount] = useState("");
  const url = `${CANONICAL_DOMAIN}/recursos/${data.slug}`;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const leadData = {
        restaurant: formData.restaurant,
        name: formData.name,
        position: formData.position,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        references_count: formData.references_count,
        form_type: data.formType,
      };
      const { error } = await supabase.from("contact_leads").insert(leadData);
      if (error) throw error;
      setSubmitted(true);
      toast.success("¡Recurso listo! La descarga comenzará en un momento.");
      notifyLead(leadData);
      // Auto-download the file
      if (data.downloadFile) {
        setTimeout(() => {
          const a = document.createElement("a");
          a.href = data.downloadFile!;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 800);
      }
    } catch {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = `resource-${data.slug}-jsonld`;
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.heroTitle,
      description: data.metaDescription,
      author: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN },
      publisher: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN, logo: { "@type": "ImageObject", url: `${CANONICAL_DOMAIN}/og-image.png` } },
      mainEntityOfPage: url,
      inLanguage: "es",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: CANONICAL_DOMAIN },
          { "@type": "ListItem", position: 2, name: "Recursos", item: `${CANONICAL_DOMAIN}/guias-y-recursos` },
          { "@type": "ListItem", position: 3, name: data.heroTitle, item: url },
        ],
      },
    });
    document.head.appendChild(ld);

    // FAQ schema
    if (data.faqs.length > 0) {
      const faqLd = document.createElement("script");
      faqLd.id = `resource-${data.slug}-faq-jsonld`;
      faqLd.type = "application/ld+json";
      faqLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
      document.head.appendChild(faqLd);
      return () => {
        document.getElementById(`resource-${data.slug}-jsonld`)?.remove();
        document.getElementById(`resource-${data.slug}-faq-jsonld`)?.remove();
      };
    }

    return () => { document.getElementById(`resource-${data.slug}-jsonld`)?.remove(); };
  }, [data.slug, data.heroTitle, data.metaDescription, data.faqs, url]);

  const BadgeIcon = data.badgeIcon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={data.metaTitle} description={data.metaDescription} url={url} type="article" />
      <Navbar />

      {/* HERO + FORM */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Recursos", href: "/guias-y-recursos" }, { label: data.heroTitle }]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
                <BadgeIcon size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine">{data.badgeLabel}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
                {data.heroTitle}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8">
                {data.heroDescription}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex items-center gap-6 text-sm text-muted-foreground">
                {data.heroStats.map((s, i) => (
                  <span key={i} className="flex items-center gap-2"><s.icon size={14} className="text-wine" /> {s.label}</span>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-border bg-gradient-card">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">¡Recurso listo!</h3>
                  <p className="text-muted-foreground mb-6">
                    {data.downloadFile ? "Tu descarga debería haber comenzado automáticamente." : "Revisa tu email para acceder al recurso completo."}
                  </p>
                  {data.downloadFile && (
                    <a href={data.downloadFile} download
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all mb-6">
                      <Download size={16} /> Descargar ahora
                    </a>
                  )}
                  <div className="mt-4">
                    <Link to="/analisis-carta"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:underline transition-colors">
                      Analizar mi carta <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold mb-1">Descarga gratis</h3>
                  <p className="text-sm text-muted-foreground mb-4">Déjanos tus datos y descarga el recurso al instante.</p>
                  <ContactFormFields register={register} errors={errors} position={position} onPositionChange={(v) => { setPosition(v); setValue("position", v); }} referencesCount={referencesCount} onReferencesCountChange={(v) => { setReferencesCount(v); setValue("references_count", v); }} />
                  <Button type="submit" disabled={loading}
                    className="w-full bg-gradient-wine text-primary-foreground py-3 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
                    {loading ? "Enviando..." : "Descargar recurso"}
                    {!loading && <Download size={16} className="ml-2" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Sin spam. Solo contenido útil para tu restaurante.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{data.problemTitle}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">{data.problemDescription}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {data.problemPoints.map((p, i) => (
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

      {/* CONTENT SECTIONS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Contenido</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{data.contentTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{data.contentDescription}</p>
          </ScrollReveal>
          <div className="space-y-8">
            {data.sections.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10">
                      <section.icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-bold">{section.title}</h3>
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

      {/* AUDIENCE & WHEN TO USE */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">{data.audienceTitle}</h2>
            <ul className="space-y-3">
              {data.audienceItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">{data.whenToUseTitle}</h2>
            <ul className="space-y-3">
              {data.whenToUseItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">Qué consigues con este recurso</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {data.benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center p-8 rounded-xl border border-border bg-background">
                  <b.icon size={28} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      {data.faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Preguntas frecuentes</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <details className="group bg-gradient-card rounded-xl border border-border hover:border-wine/20 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* INTERNAL LINKS */}
      {data.internalLinks.length > 0 && (
        <InternalLinks title="Contenido relacionado" links={data.internalLinks} />
      )}

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{data.ctaFinalTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{data.ctaFinalDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analisis-carta"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Analizar mi carta gratis <ArrowRight size={16} />
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

export default ResourceTemplate;
