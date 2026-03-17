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
import { notifyLead } from "@/lib/notifyLead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import ContactFormFields from "@/components/ContactFormFields";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── i18n ─── */
type ChecklistSection = { title: string; points: string[] };
type CT = {
  seoTitle: string; seoDesc: string; seoUrl: string;
  breadRes: string; breadLabel: string;
  badge: string; heroTitle: string; heroDesc: string;
  controlPoints: string; instantDownload: string;
  formTitle: string; formDesc: string;
  successTitle: string; successDesc: string; downloadAgain: string;
  analyseList: string; submitLabel: string; submitLoading: string;
  noSpam: string;
  contentLabel: string; contentTitle: string; contentDesc: string;
  sections: ChecklistSection[];
  benefitsTitle: string;
  benefits: { title: string; desc: string }[];
  ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string;
  toastSuccess: string; toastError: string;
  points: string;
};

const sectionIcons = [Layers, DollarSign, BarChart3, GlassWater, RotateCcw];
const benefitIcons = [Wine, DollarSign, BarChart3];

const es: CT = {
  seoTitle: "Checklist: ¿Tu Carta de Vinos es Rentable? | Winerim",
  seoDesc: "Descarga gratis la checklist para evaluar si tu carta de vinos está optimizada: estructura, precios, estilos, vino por copa y rotación.",
  seoUrl: "https://winerim.wine/recursos/checklist-carta-de-vinos-rentable",
  breadRes: "Recursos", breadLabel: "Checklist carta rentable",
  badge: "Recurso gratuito",
  heroTitle: "Checklist: ¿Tu carta de vinos es rentable?",
  heroDesc: "25 puntos de control para evaluar si tu carta de vinos está optimizada para vender más. Estructura, precios, estilos, vino por copa y rotación.",
  controlPoints: "25 puntos de control", instantDownload: "Descarga inmediata",
  formTitle: "Descarga la checklist gratis", formDesc: "Rellena el formulario y recíbela al instante.",
  successTitle: "¡Checklist lista!", successDesc: "La descarga debería haber comenzado automáticamente.",
  downloadAgain: "Descargar de nuevo", analyseList: "Analizar mi carta",
  submitLabel: "Descargar checklist", submitLoading: "Enviando...",
  noSpam: "Sin spam. Solo contenido útil para tu restaurante.",
  contentLabel: "Contenido", contentTitle: "Qué incluye la checklist",
  contentDesc: "5 áreas de evaluación con 25 puntos de control para diagnosticar tu carta de vinos.",
  sections: [
    { title: "Estructura de carta", points: ["La carta tiene categorías claras y fáciles de entender", "Las secciones siguen un orden lógico (espumosos → blancos → rosados → tintos → dulces)", "Cada categoría tiene entre 4 y 12 referencias", "El total de referencias es adecuado al tipo de restaurante", "Hay una sección destacada de recomendaciones o selección del sommelier"] },
    { title: "Distribución de precios", points: ["Hay opciones de entrada accesibles (18-25€) que no parezcan 'el barato'", "La franja de mayor volumen (25-40€) tiene suficientes opciones", "Existen referencias premium que actúan como ancla de precio", "No hay saltos bruscos de precio entre referencias consecutivas", "Los márgenes son escalonados: mayor % en entrada, mayor € en premium"] },
    { title: "Equilibrio de estilos", points: ["Hay variedad de perfiles: frescos, afrutados, estructurados, elegantes", "La oferta de blancos es proporcional al tipo de cocina", "Existe al menos un espumoso accesible y uno premium", "Los rosados tienen presencia, especialmente en temporada", "Hay opciones para diferentes niveles de conocimiento del cliente"] },
    { title: "Vinos por copa", points: ["Hay mínimo 6-8 referencias por copa", "La selección incluye espumoso, blancos, rosado y tintos", "Los precios por copa equivalen al 30-40% de la botella", "La sección de copas es visible y está al inicio de la carta", "Las referencias por copa rotan cada 2-4 semanas"] },
    { title: "Rotación y actualización", points: ["No hay referencias sin venta en los últimos 90 días", "La carta se revisa al menos trimestralmente", "Las referencias se adaptan a la temporada y al menú", "Los precios se actualizan según costes y mercado", "Se mide el ratio de mesas que piden vino y el ticket medio en vino"] },
  ],
  benefitsTitle: "¿Para qué sirve esta checklist?",
  benefits: [
    { title: "Detecta puntos débiles", desc: "Identifica exactamente qué áreas de tu carta necesitan mejora." },
    { title: "Mejora márgenes", desc: "Optimiza la distribución de precios para maximizar el margen bruto." },
    { title: "Vende más vino", desc: "Una carta optimizada aumenta las ventas de vino entre un 15% y un 30%." },
  ],
  ctaTitle: "¿Quieres un análisis completo de tu carta?",
  ctaDesc: "La checklist te da el diagnóstico. Winerim te da la solución: carta digital, recomendaciones con IA y analítica de ventas.",
  ctaPrimary: "Analiza tu carta gratis", ctaSecondary: "Solicitar demo",
  toastSuccess: "¡Checklist lista! La descarga comenzará en un momento.",
  toastError: "Error al enviar. Inténtalo de nuevo.",
  points: "puntos",
};

const en: CT = {
  seoTitle: "Checklist: Is Your Wine List Profitable? | Winerim",
  seoDesc: "Download a free checklist to evaluate whether your wine list is optimised: structure, pricing, styles, wine by the glass and rotation.",
  seoUrl: "https://winerim.wine/en/resources/profitable-wine-list-checklist",
  breadRes: "Resources", breadLabel: "Profitable wine list checklist",
  badge: "Free resource",
  heroTitle: "Checklist: Is your wine list profitable?",
  heroDesc: "25 checkpoints to evaluate whether your wine list is optimised for higher sales. Structure, pricing, styles, by-the-glass and rotation.",
  controlPoints: "25 checkpoints", instantDownload: "Instant download",
  formTitle: "Download the free checklist", formDesc: "Fill in the form and get it instantly.",
  successTitle: "Checklist ready!", successDesc: "The download should have started automatically.",
  downloadAgain: "Download again", analyseList: "Analyse my list",
  submitLabel: "Download checklist", submitLoading: "Sending...",
  noSpam: "No spam. Only useful content for your restaurant.",
  contentLabel: "Contents", contentTitle: "What the checklist includes",
  contentDesc: "5 evaluation areas with 25 checkpoints to diagnose your wine list.",
  sections: [
    { title: "List structure", points: ["The list has clear, easy-to-understand categories", "Sections follow a logical order (sparkling → whites → rosés → reds → dessert)", "Each category has between 4 and 12 references", "Total references suit the restaurant type", "There is a highlighted recommendations or sommelier's selection section"] },
    { title: "Price distribution", points: ["There are accessible entry options (€18-25) that don't look 'cheap'", "The highest-volume band (€25-40) has enough options", "Premium references act as price anchors", "No abrupt price jumps between consecutive references", "Margins are tiered: higher % at entry, higher € at premium"] },
    { title: "Style balance", points: ["Variety of profiles: fresh, fruity, structured, elegant", "White wine offering is proportional to the cuisine type", "At least one accessible and one premium sparkling", "Rosés have presence, especially in season", "Options for different customer knowledge levels"] },
    { title: "Wines by the glass", points: ["At least 6-8 by-the-glass references", "Selection includes sparkling, whites, rosé and reds", "Glass prices equal 30-40% of the bottle", "The by-the-glass section is visible and at the start", "By-the-glass references rotate every 2-4 weeks"] },
    { title: "Rotation & updates", points: ["No references unsold in the last 90 days", "The list is reviewed at least quarterly", "References adapt to season and menu", "Prices update according to costs and market", "Table wine-ordering ratio and average wine spend are measured"] },
  ],
  benefitsTitle: "What is this checklist for?",
  benefits: [
    { title: "Spot weaknesses", desc: "Identify exactly which areas of your list need improvement." },
    { title: "Improve margins", desc: "Optimise price distribution to maximise gross margin." },
    { title: "Sell more wine", desc: "An optimised list increases wine sales by 15-30%." },
  ],
  ctaTitle: "Want a complete analysis of your list?",
  ctaDesc: "The checklist gives you the diagnosis. Winerim gives you the solution: digital list, AI recommendations and sales analytics.",
  ctaPrimary: "Analyse your list free", ctaSecondary: "Request demo",
  toastSuccess: "Checklist ready! Download will start shortly.",
  toastError: "Error submitting. Please try again.",
  points: "points",
};

const it: CT = {
  seoTitle: "Checklist: La tua Carta dei Vini è Redditizia? | Winerim",
  seoDesc: "Scarica gratis la checklist per valutare se la tua carta dei vini è ottimizzata: struttura, prezzi, stili, vino al calice e rotazione.",
  seoUrl: "https://winerim.wine/it/risorse/checklist-carta-vini-redditizia",
  breadRes: "Risorse", breadLabel: "Checklist carta redditizia",
  badge: "Risorsa gratuita",
  heroTitle: "Checklist: La tua carta dei vini è redditizia?",
  heroDesc: "25 punti di controllo per valutare se la tua carta dei vini è ottimizzata per vendere di più. Struttura, prezzi, stili, vino al calice e rotazione.",
  controlPoints: "25 punti di controllo", instantDownload: "Download immediato",
  formTitle: "Scarica la checklist gratis", formDesc: "Compila il modulo e ricevila subito.",
  successTitle: "Checklist pronta!", successDesc: "Il download dovrebbe essere partito automaticamente.",
  downloadAgain: "Scarica di nuovo", analyseList: "Analizza la mia carta",
  submitLabel: "Scarica checklist", submitLoading: "Invio...",
  noSpam: "Niente spam. Solo contenuti utili per il tuo ristorante.",
  contentLabel: "Contenuto", contentTitle: "Cosa include la checklist",
  contentDesc: "5 aree di valutazione con 25 punti di controllo per diagnosticare la tua carta dei vini.",
  sections: [
    { title: "Struttura della carta", points: ["La carta ha categorie chiare e facili da capire", "Le sezioni seguono un ordine logico (spumanti → bianchi → rosati → rossi → dolci)", "Ogni categoria ha tra 4 e 12 referenze", "Il totale delle referenze è adeguato al tipo di ristorante", "C'è una sezione di raccomandazioni o selezione del sommelier"] },
    { title: "Distribuzione dei prezzi", points: ["Ci sono opzioni d'ingresso accessibili (18-25€) che non sembrino 'il vino economico'", "La fascia di maggior volume (25-40€) ha abbastanza opzioni", "Referenze premium fungono da ancora di prezzo", "Non ci sono salti bruschi di prezzo tra referenze consecutive", "I margini sono scalati: % maggiore in ingresso, € maggiore nel premium"] },
    { title: "Equilibrio degli stili", points: ["Varietà di profili: freschi, fruttati, strutturati, eleganti", "L'offerta di bianchi è proporzionale al tipo di cucina", "Almeno uno spumante accessibile e uno premium", "I rosati hanno presenza, specialmente in stagione", "Opzioni per diversi livelli di conoscenza del cliente"] },
    { title: "Vini al calice", points: ["Minimo 6-8 referenze al calice", "La selezione include spumante, bianchi, rosato e rossi", "I prezzi al calice equivalgono al 30-40% della bottiglia", "La sezione calici è visibile e all'inizio della carta", "Le referenze al calice ruotano ogni 2-4 settimane"] },
    { title: "Rotazione e aggiornamento", points: ["Nessuna referenza senza vendita negli ultimi 90 giorni", "La carta viene rivista almeno trimestralmente", "Le referenze si adattano alla stagione e al menu", "I prezzi si aggiornano secondo costi e mercato", "Si misura il rapporto di tavoli che ordinano vino e lo scontrino medio in vino"] },
  ],
  benefitsTitle: "A cosa serve questa checklist?",
  benefits: [
    { title: "Individua i punti deboli", desc: "Identifica esattamente quali aree della tua carta hanno bisogno di miglioramento." },
    { title: "Migliora i margini", desc: "Ottimizza la distribuzione dei prezzi per massimizzare il margine lordo." },
    { title: "Vendi più vino", desc: "Una carta ottimizzata aumenta le vendite di vino del 15-30%." },
  ],
  ctaTitle: "Vuoi un'analisi completa della tua carta?",
  ctaDesc: "La checklist ti dà la diagnosi. Winerim ti dà la soluzione: carta digitale, raccomandazioni IA e analitica delle vendite.",
  ctaPrimary: "Analizza la tua carta gratis", ctaSecondary: "Richiedi demo",
  toastSuccess: "Checklist pronta! Il download partirà a breve.",
  toastError: "Errore nell'invio. Riprova.",
  points: "punti",
};

const fr: CT = {
  seoTitle: "Checklist : Votre Carte des Vins est-elle Rentable ? | Winerim",
  seoDesc: "Téléchargez gratuitement la checklist pour évaluer si votre carte des vins est optimisée : structure, prix, styles, vin au verre et rotation.",
  seoUrl: "https://winerim.wine/fr/ressources/checklist-carte-vins-rentable",
  breadRes: "Ressources", breadLabel: "Checklist carte rentable",
  badge: "Ressource gratuite",
  heroTitle: "Checklist : Votre carte des vins est-elle rentable ?",
  heroDesc: "25 points de contrôle pour évaluer si votre carte des vins est optimisée pour vendre davantage. Structure, prix, styles, vin au verre et rotation.",
  controlPoints: "25 points de contrôle", instantDownload: "Téléchargement immédiat",
  formTitle: "Téléchargez la checklist gratuite", formDesc: "Remplissez le formulaire et recevez-la instantanément.",
  successTitle: "Checklist prête !", successDesc: "Le téléchargement devrait avoir commencé automatiquement.",
  downloadAgain: "Télécharger à nouveau", analyseList: "Analyser ma carte",
  submitLabel: "Télécharger la checklist", submitLoading: "Envoi...",
  noSpam: "Pas de spam. Uniquement du contenu utile pour votre restaurant.",
  contentLabel: "Contenu", contentTitle: "Ce que contient la checklist",
  contentDesc: "5 domaines d'évaluation avec 25 points de contrôle pour diagnostiquer votre carte des vins.",
  sections: [
    { title: "Structure de la carte", points: ["La carte a des catégories claires et faciles à comprendre", "Les sections suivent un ordre logique (effervescents → blancs → rosés → rouges → moelleux)", "Chaque catégorie a entre 4 et 12 références", "Le nombre total de références convient au type de restaurant", "Il y a une section de recommandations ou sélection du sommelier"] },
    { title: "Distribution des prix", points: ["Il y a des options d'entrée accessibles (18-25€) qui ne paraissent pas 'le moins cher'", "La tranche de plus grand volume (25-40€) a suffisamment d'options", "Des références premium servent d'ancrage de prix", "Pas de sauts de prix brusques entre références consécutives", "Les marges sont échelonnées : % plus élevé en entrée, € plus élevé en premium"] },
    { title: "Équilibre des styles", points: ["Variété de profils : frais, fruités, structurés, élégants", "L'offre de blancs est proportionnelle au type de cuisine", "Au moins un effervescent accessible et un premium", "Les rosés sont présents, surtout en saison", "Des options pour différents niveaux de connaissance du client"] },
    { title: "Vins au verre", points: ["Minimum 6-8 références au verre", "La sélection inclut effervescent, blancs, rosé et rouges", "Les prix au verre équivalent à 30-40% de la bouteille", "La section vins au verre est visible et en début de carte", "Les références au verre tournent toutes les 2-4 semaines"] },
    { title: "Rotation et mise à jour", points: ["Aucune référence sans vente depuis 90 jours", "La carte est révisée au moins trimestriellement", "Les références s'adaptent à la saison et au menu", "Les prix sont mis à jour selon les coûts et le marché", "On mesure le ratio de tables commandant du vin et le ticket moyen en vin"] },
  ],
  benefitsTitle: "À quoi sert cette checklist ?",
  benefits: [
    { title: "Détecter les faiblesses", desc: "Identifiez précisément quels domaines de votre carte nécessitent une amélioration." },
    { title: "Améliorer les marges", desc: "Optimisez la distribution des prix pour maximiser la marge brute." },
    { title: "Vendre plus de vin", desc: "Une carte optimisée augmente les ventes de vin de 15 à 30%." },
  ],
  ctaTitle: "Vous souhaitez une analyse complète de votre carte ?",
  ctaDesc: "La checklist vous donne le diagnostic. Winerim vous donne la solution : carte digitale, recommandations IA et analytics de ventes.",
  ctaPrimary: "Analysez votre carte gratuitement", ctaSecondary: "Demander une démo",
  toastSuccess: "Checklist prête ! Le téléchargement va démarrer.",
  toastError: "Erreur lors de l'envoi. Veuillez réessayer.",
  points: "points",
};

const i18n: Record<string, CT> = { es, en, it, fr };

/* ─── Form schema ─── */
const formSchema = z.object({
  restaurant: z.string().trim().min(1).max(255),
  name: z.string().trim().min(1).max(100),
  position: z.string().trim().min(1),
  phone: z.string().trim().min(1).max(30),
  email: z.string().trim().email().max(255),
  city: z.string().trim().min(1).max(100),
  references_count: z.string().trim().min(1),
});
type FormData = z.infer<typeof formSchema>;

const ChecklistCartaRentable = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

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
      const leadData = {
        restaurant: data.restaurant, name: data.name, position: data.position,
        phone: data.phone, email: data.email, city: data.city,
        references_count: data.references_count, form_type: "checklist-carta-rentable",
      };
      const { error } = await supabase.from("contact_leads").insert(leadData);
      if (error) throw error;
      setSubmitted(true);
      toast.success(t.toastSuccess);
      notifyLead(leadData);
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = "/recursos/winerim_checklist_carta_rentable_2026.xlsx";
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 800);
    } catch {
      toast.error(t.toastError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={t.seoUrl} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadRes, href: localePath("/guias-y-recursos") }, { label: t.breadLabel }]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
                <ListChecks size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">{t.heroTitle}</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8">{t.heroDesc}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-wine" /> {t.controlPoints}</span>
                <span className="flex items-center gap-2"><Download size={14} className="text-wine" /> {t.instantDownload}</span>
              </motion.div>
            </div>

            {/* FORM */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-border bg-gradient-card">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">{t.successTitle}</h3>
                  <p className="text-muted-foreground mb-4">{t.successDesc}</p>
                  <a href="/recursos/winerim_checklist_carta_rentable_2026.xlsx" download
                    className="inline-flex items-center gap-2 text-wine text-sm font-semibold hover:underline mb-6">
                    <Download size={16} /> {t.downloadAgain}
                  </a>
                  <div>
                    <Link to={localePath("/analisis-carta")}
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                      {t.analyseList} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold mb-1">{t.formTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t.formDesc}</p>
                  <ContactFormFields register={register} errors={errors} position={position} onPositionChange={(v) => { setPosition(v); setValue("position", v); }} referencesCount={referencesCount} onReferencesCountChange={(v) => { setReferencesCount(v); setValue("references_count", v); }} />
                  <Button type="submit" disabled={loading}
                    className="w-full bg-gradient-wine text-primary-foreground py-3 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
                    {loading ? t.submitLoading : t.submitLabel}
                    {!loading && <Download size={16} className="ml-2" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">{t.noSpam}</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.contentLabel}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.contentTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.contentDesc}</p>
          </ScrollReveal>
          <div className="space-y-8">
            {t.sections.map((section, i) => {
              const Icon = sectionIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="p-6 rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10">
                        <Icon size={18} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-lg font-bold">{section.title}</h3>
                      <span className="ml-auto text-xs text-muted-foreground">{section.points.length} {t.points}</span>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">{t.benefitsTitle}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {t.benefits.map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center p-8 rounded-xl border border-border bg-gradient-card">
                  <Icon size={28} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{t.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={localePath("/analisis-carta")}
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {t.ctaPrimary} <ArrowRight size={16} />
              </Link>
              <Link to={localePath("/demo")}
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {t.ctaSecondary}
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
