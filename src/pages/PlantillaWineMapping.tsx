import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, Download, CheckCircle, Map,
  DollarSign, Wine, Layers, Sparkles, BarChart3, Target
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
import type { SupportedLang } from "@/i18n/types";

interface Section {
  icon: typeof Map;
  title: string;
  points: string[];
}

interface Benefit {
  icon: typeof Target;
  title: string;
  desc: string;
}

interface TableRow {
  style: string;
  cells: string[];
}

const i18n: Record<SupportedLang, {
  metaTitle: string;
  metaDescription: string;
  url: string;
  breadcrumbParent: string;
  breadcrumbCurrent: string;
  badge: string;
  h1: string;
  subtitle: string;
  tagMatrix: string;
  tagDownload: string;
  successTitle: string;
  successDesc: string;
  downloadAgain: string;
  analyzeBtn: string;
  formTitle: string;
  formDesc: string;
  submitBtn: string;
  submitting: string;
  noSpam: string;
  contentBadge: string;
  contentH2: string;
  contentDesc: string;
  exampleH2: string;
  exampleNote: string;
  styleHeader: string;
  benefitsH2: string;
  ctaH2: string;
  ctaDesc: string;
  ctaAnalyze: string;
  ctaDemo: string;
  sections: Section[];
  benefits: Benefit[];
  tableRows: TableRow[];
  ref: string;
  refs: string;
  none: string;
  toastSuccess: string;
  toastError: string;
}> = {
  es: {
    metaTitle: "Plantilla Wine Mapping para Restaurantes | Winerim",
    metaDescription: "Descarga gratis la plantilla de wine mapping para estructurar los precios y la distribución de vinos en tu carta. Detecta huecos, optimiza márgenes y equilibra tu selección.",
    url: "https://winerim.wine/recursos/plantilla-wine-mapping-restaurante",
    breadcrumbParent: "Recursos", breadcrumbCurrent: "Plantilla wine mapping",
    badge: "Recurso gratuito", h1: "Plantilla de Wine Mapping para restaurantes",
    subtitle: "Mapea tu carta de vinos en una matriz de precio × estilo. Detecta huecos, elimina solapamientos y optimiza la distribución de tu selección.",
    tagMatrix: "Matriz visual", tagDownload: "Descarga inmediata",
    successTitle: "¡Plantilla lista!", successDesc: "La descarga debería haber comenzado automáticamente.",
    downloadAgain: "Descargar de nuevo", analyzeBtn: "Analizar mi carta",
    formTitle: "Descarga la plantilla gratis", formDesc: "Rellena el formulario y recíbela al instante.",
    submitBtn: "Descargar plantilla", submitting: "Enviando...", noSpam: "Sin spam. Solo contenido útil para tu restaurante.",
    contentBadge: "Contenido", contentH2: "Qué incluye la plantilla", contentDesc: "Todo lo necesario para mapear tu carta de vinos y detectar oportunidades de mejora.",
    exampleH2: "Ejemplo de wine mapping", exampleNote: "Ejemplo simplificado. La plantilla descargable incluye más categorías y guía de distribución.",
    styleHeader: "Estilo",
    benefitsH2: "¿Para qué sirve el wine mapping?",
    ctaH2: "¿Quieres un análisis automático de tu carta?", ctaDesc: "La plantilla te da la estructura. Winerim te da el análisis completo con datos reales, recomendaciones y optimización de precios.",
    ctaAnalyze: "Analizar mi carta", ctaDemo: "Solicitar demo",
    sections: [
      { icon: Map, title: "Qué es el wine mapping", points: ["Método visual para mapear toda tu carta de vinos en una matriz de precio × estilo", "Permite detectar huecos, solapamientos y desequilibrios de un vistazo", "Usado por sommeliers y consultores para auditar cartas profesionalmente", "La base para tomar decisiones de selección y pricing con criterio"] },
      { icon: Layers, title: "Cómo usar la plantilla", points: ["Eje horizontal: franjas de precio (entrada, media, premium, alta gama)", "Eje vertical: estilos de vino (blancos frescos, tintos suaves, tintos intensos…)", "Coloca cada referencia de tu carta en su celda correspondiente", "Identifica celdas vacías (oportunidades) y celdas saturadas (solapamientos)", "Incluye instrucciones paso a paso para completarla en menos de 30 minutos"] },
      { icon: DollarSign, title: "Rangos de precio recomendados", points: ["Franja de entrada: 15-22€ → Objetivo: atraer al consumidor casual", "Franja media: 22-35€ → Objetivo: concentrar el volumen de ventas y mejor margen", "Franja premium: 35-55€ → Objetivo: elevar el ticket medio", "Franja alta gama: 55€+ → Objetivo: ancla de precio y ocasiones especiales", "Guía de distribución óptima por franja incluida en la plantilla"] },
      { icon: BarChart3, title: "Distribución ideal de vinos", points: ["20% entrada — opciones accesibles que no intimiden", "45-50% franja media — donde se genera el grueso de ventas y margen", "20-25% premium — referencias que elevan el ticket", "5-10% alta gama — anclas de precio y vinos de ocasión", "Equilibrio entre blancos, tintos, rosados y espumosos según tipo de cocina"] },
    ],
    benefits: [
      { icon: Target, title: "Detecta huecos", desc: "Identifica franjas de precio o estilos sin cobertura que representan ventas perdidas." },
      { icon: Wine, title: "Elimina solapamientos", desc: "Descubre si tienes demasiados vinos compitiendo en la misma celda de precio y estilo." },
      { icon: DollarSign, title: "Optimiza márgenes", desc: "Asegura que cada franja de precio tiene la distribución adecuada para maximizar el beneficio." },
    ],
    tableRows: [
      { style: "Blancos frescos", cells: ["2 refs", "3 refs", "1 ref", "—"] },
      { style: "Blancos con cuerpo", cells: ["1 ref", "2 refs", "1 ref", "1 ref"] },
      { style: "Rosados", cells: ["1 ref", "2 refs", "—", "—"] },
      { style: "Tintos suaves", cells: ["2 refs", "3 refs", "1 ref", "—"] },
      { style: "Tintos intensos", cells: ["1 ref", "3 refs", "2 refs", "1 ref"] },
      { style: "Espumosos", cells: ["1 ref", "2 refs", "1 ref", "1 ref"] },
    ],
    ref: "ref", refs: "refs", none: "—",
    toastSuccess: "¡Plantilla lista! La descarga comenzará en un momento.",
    toastError: "Error al enviar. Inténtalo de nuevo.",
  },
  en: {
    metaTitle: "Wine Mapping Template for Restaurants | Winerim",
    metaDescription: "Download the free wine mapping template to structure pricing and wine distribution on your list. Detect gaps, optimize margins and balance your selection.",
    url: "https://winerim.wine/en/resources/wine-mapping-template",
    breadcrumbParent: "Resources", breadcrumbCurrent: "Wine mapping template",
    badge: "Free resource", h1: "Wine Mapping Template for restaurants",
    subtitle: "Map your wine list on a price × style matrix. Detect gaps, eliminate overlaps and optimize your selection's distribution.",
    tagMatrix: "Visual matrix", tagDownload: "Instant download",
    successTitle: "Template ready!", successDesc: "The download should have started automatically.",
    downloadAgain: "Download again", analyzeBtn: "Analyze my list",
    formTitle: "Download the free template", formDesc: "Fill in the form and get it instantly.",
    submitBtn: "Download template", submitting: "Sending...", noSpam: "No spam. Only useful content for your restaurant.",
    contentBadge: "Contents", contentH2: "What's included", contentDesc: "Everything you need to map your wine list and detect improvement opportunities.",
    exampleH2: "Wine mapping example", exampleNote: "Simplified example. The downloadable template includes more categories and a distribution guide.",
    styleHeader: "Style",
    benefitsH2: "What is wine mapping for?",
    ctaH2: "Want an automatic analysis of your list?", ctaDesc: "The template gives you the structure. Winerim gives you the complete analysis with real data, recommendations and price optimization.",
    ctaAnalyze: "Analyze my list", ctaDemo: "Request demo",
    sections: [
      { icon: Map, title: "What is wine mapping", points: ["Visual method to map your entire wine list on a price × style matrix", "Lets you detect gaps, overlaps and imbalances at a glance", "Used by sommeliers and consultants to audit lists professionally", "The foundation for making selection and pricing decisions with criteria"] },
      { icon: Layers, title: "How to use the template", points: ["Horizontal axis: price brackets (entry, mid-range, premium, high-end)", "Vertical axis: wine styles (fresh whites, soft reds, intense reds…)", "Place each reference from your list in the corresponding cell", "Identify empty cells (opportunities) and saturated cells (overlaps)", "Includes step-by-step instructions to complete it in under 30 minutes"] },
      { icon: DollarSign, title: "Recommended price ranges", points: ["Entry bracket: €15-22 → Goal: attract casual drinkers", "Mid-range: €22-35 → Goal: concentrate sales volume and best margins", "Premium: €35-55 → Goal: raise average ticket", "High-end: €55+ → Goal: price anchor and special occasions", "Optimal distribution guide per bracket included in the template"] },
      { icon: BarChart3, title: "Ideal wine distribution", points: ["20% entry — accessible options that don't intimidate", "45-50% mid-range — where the bulk of sales and margin are generated", "20-25% premium — references that raise the ticket", "5-10% high-end — price anchors and occasion wines", "Balance between whites, reds, rosés and sparkling by cuisine type"] },
    ],
    benefits: [
      { icon: Target, title: "Detect gaps", desc: "Identify price brackets or styles without coverage that represent lost sales." },
      { icon: Wine, title: "Eliminate overlaps", desc: "Discover if you have too many wines competing in the same price-style cell." },
      { icon: DollarSign, title: "Optimize margins", desc: "Ensure each price bracket has the right distribution to maximize profit." },
    ],
    tableRows: [
      { style: "Fresh whites", cells: ["2 refs", "3 refs", "1 ref", "—"] },
      { style: "Full-bodied whites", cells: ["1 ref", "2 refs", "1 ref", "1 ref"] },
      { style: "Rosés", cells: ["1 ref", "2 refs", "—", "—"] },
      { style: "Soft reds", cells: ["2 refs", "3 refs", "1 ref", "—"] },
      { style: "Intense reds", cells: ["1 ref", "3 refs", "2 refs", "1 ref"] },
      { style: "Sparkling", cells: ["1 ref", "2 refs", "1 ref", "1 ref"] },
    ],
    ref: "ref", refs: "refs", none: "—",
    toastSuccess: "Template ready! Download will start shortly.",
    toastError: "Error submitting. Please try again.",
  },
  it: {
    metaTitle: "Modello Wine Mapping per Ristoranti | Winerim",
    metaDescription: "Scarica gratis il modello di wine mapping per strutturare prezzi e distribuzione dei vini nella tua carta. Rileva lacune, ottimizza i margini e bilancia la selezione.",
    url: "https://winerim.wine/it/risorse/modello-wine-mapping",
    breadcrumbParent: "Risorse", breadcrumbCurrent: "Modello wine mapping",
    badge: "Risorsa gratuita", h1: "Modello di Wine Mapping per ristoranti",
    subtitle: "Mappa la tua carta dei vini su una matrice prezzo × stile. Rileva lacune, elimina sovrapposizioni e ottimizza la distribuzione della tua selezione.",
    tagMatrix: "Matrice visuale", tagDownload: "Download immediato",
    successTitle: "Modello pronto!", successDesc: "Il download dovrebbe essere iniziato automaticamente.",
    downloadAgain: "Scarica di nuovo", analyzeBtn: "Analizza la mia carta",
    formTitle: "Scarica il modello gratis", formDesc: "Compila il modulo e ricevilo subito.",
    submitBtn: "Scarica modello", submitting: "Invio in corso...", noSpam: "Niente spam. Solo contenuti utili per il tuo ristorante.",
    contentBadge: "Contenuto", contentH2: "Cosa include il modello", contentDesc: "Tutto il necessario per mappare la tua carta dei vini e individuare opportunità di miglioramento.",
    exampleH2: "Esempio di wine mapping", exampleNote: "Esempio semplificato. Il modello scaricabile include più categorie e una guida di distribuzione.",
    styleHeader: "Stile",
    benefitsH2: "A cosa serve il wine mapping?",
    ctaH2: "Vuoi un'analisi automatica della tua carta?", ctaDesc: "Il modello ti dà la struttura. Winerim ti dà l'analisi completa con dati reali, raccomandazioni e ottimizzazione dei prezzi.",
    ctaAnalyze: "Analizza la mia carta", ctaDemo: "Richiedi demo",
    sections: [
      { icon: Map, title: "Cos'è il wine mapping", points: ["Metodo visuale per mappare tutta la carta dei vini su una matrice prezzo × stile", "Permette di rilevare lacune, sovrapposizioni e squilibri a colpo d'occhio", "Usato da sommelier e consulenti per audit professionali delle carte", "La base per prendere decisioni di selezione e pricing con criterio"] },
      { icon: Layers, title: "Come usare il modello", points: ["Asse orizzontale: fasce di prezzo (ingresso, media, premium, alta gamma)", "Asse verticale: stili di vino (bianchi freschi, rossi morbidi, rossi intensi…)", "Posiziona ogni referenza della tua carta nella cella corrispondente", "Identifica celle vuote (opportunità) e celle sature (sovrapposizioni)", "Include istruzioni passo passo per completarlo in meno di 30 minuti"] },
      { icon: DollarSign, title: "Fasce di prezzo raccomandate", points: ["Fascia ingresso: 15-22€ → Obiettivo: attrarre il consumatore casual", "Fascia media: 22-35€ → Obiettivo: concentrare il volume di vendite e miglior margine", "Fascia premium: 35-55€ → Obiettivo: alzare lo scontrino medio", "Fascia alta gamma: 55€+ → Obiettivo: àncora di prezzo e occasioni speciali", "Guida alla distribuzione ottimale per fascia inclusa nel modello"] },
      { icon: BarChart3, title: "Distribuzione ideale dei vini", points: ["20% ingresso — opzioni accessibili che non intimidiscano", "45-50% fascia media — dove si genera il grosso delle vendite e del margine", "20-25% premium — referenze che alzano lo scontrino", "5-10% alta gamma — àncore di prezzo e vini per occasioni", "Equilibrio tra bianchi, rossi, rosati e spumanti secondo il tipo di cucina"] },
    ],
    benefits: [
      { icon: Target, title: "Rileva lacune", desc: "Identifica fasce di prezzo o stili senza copertura che rappresentano vendite perse." },
      { icon: Wine, title: "Elimina sovrapposizioni", desc: "Scopri se hai troppi vini in competizione nella stessa cella prezzo-stile." },
      { icon: DollarSign, title: "Ottimizza i margini", desc: "Assicura che ogni fascia di prezzo abbia la distribuzione giusta per massimizzare il profitto." },
    ],
    tableRows: [
      { style: "Bianchi freschi", cells: ["2 ref", "3 ref", "1 ref", "—"] },
      { style: "Bianchi strutturati", cells: ["1 ref", "2 ref", "1 ref", "1 ref"] },
      { style: "Rosati", cells: ["1 ref", "2 ref", "—", "—"] },
      { style: "Rossi morbidi", cells: ["2 ref", "3 ref", "1 ref", "—"] },
      { style: "Rossi intensi", cells: ["1 ref", "3 ref", "2 ref", "1 ref"] },
      { style: "Spumanti", cells: ["1 ref", "2 ref", "1 ref", "1 ref"] },
    ],
    ref: "ref", refs: "ref", none: "—",
    toastSuccess: "Modello pronto! Il download inizierà a breve.",
    toastError: "Errore nell'invio. Riprova.",
  },
  fr: {
    metaTitle: "Modèle Wine Mapping pour Restaurants | Winerim",
    metaDescription: "Téléchargez gratuitement le modèle de wine mapping pour structurer les prix et la distribution des vins de votre carte. Détectez les lacunes, optimisez les marges et équilibrez votre sélection.",
    url: "https://winerim.wine/fr/ressources/modele-wine-mapping",
    breadcrumbParent: "Ressources", breadcrumbCurrent: "Modèle wine mapping",
    badge: "Ressource gratuite", h1: "Modèle de Wine Mapping pour restaurants",
    subtitle: "Cartographiez votre carte des vins sur une matrice prix × style. Détectez les lacunes, éliminez les chevauchements et optimisez la distribution de votre sélection.",
    tagMatrix: "Matrice visuelle", tagDownload: "Téléchargement immédiat",
    successTitle: "Modèle prêt !", successDesc: "Le téléchargement devrait avoir commencé automatiquement.",
    downloadAgain: "Télécharger à nouveau", analyzeBtn: "Analyser ma carte",
    formTitle: "Téléchargez le modèle gratuitement", formDesc: "Remplissez le formulaire et recevez-le instantanément.",
    submitBtn: "Télécharger le modèle", submitting: "Envoi en cours...", noSpam: "Pas de spam. Uniquement du contenu utile pour votre restaurant.",
    contentBadge: "Contenu", contentH2: "Ce que contient le modèle", contentDesc: "Tout le nécessaire pour cartographier votre carte des vins et détecter des opportunités d'amélioration.",
    exampleH2: "Exemple de wine mapping", exampleNote: "Exemple simplifié. Le modèle téléchargeable inclut plus de catégories et un guide de distribution.",
    styleHeader: "Style",
    benefitsH2: "À quoi sert le wine mapping ?",
    ctaH2: "Vous voulez une analyse automatique de votre carte ?", ctaDesc: "Le modèle vous donne la structure. Winerim vous donne l'analyse complète avec des données réelles, des recommandations et l'optimisation des prix.",
    ctaAnalyze: "Analyser ma carte", ctaDemo: "Demander une démo",
    sections: [
      { icon: Map, title: "Qu'est-ce que le wine mapping", points: ["Méthode visuelle pour cartographier toute votre carte des vins sur une matrice prix × style", "Permet de détecter les lacunes, chevauchements et déséquilibres d'un coup d'œil", "Utilisé par les sommeliers et consultants pour auditer les cartes professionnellement", "La base pour prendre des décisions de sélection et de pricing éclairées"] },
      { icon: Layers, title: "Comment utiliser le modèle", points: ["Axe horizontal : gammes de prix (entrée, milieu, premium, haut de gamme)", "Axe vertical : styles de vin (blancs frais, rouges souples, rouges intenses…)", "Placez chaque référence de votre carte dans la cellule correspondante", "Identifiez les cellules vides (opportunités) et les cellules saturées (chevauchements)", "Inclut des instructions pas à pas pour le compléter en moins de 30 minutes"] },
      { icon: DollarSign, title: "Gammes de prix recommandées", points: ["Gamme entrée : 15-22€ → Objectif : attirer le consommateur occasionnel", "Gamme moyenne : 22-35€ → Objectif : concentrer le volume de ventes et la meilleure marge", "Gamme premium : 35-55€ → Objectif : augmenter le ticket moyen", "Gamme haut de gamme : 55€+ → Objectif : ancrage de prix et occasions spéciales", "Guide de distribution optimale par gamme inclus dans le modèle"] },
      { icon: BarChart3, title: "Distribution idéale des vins", points: ["20% entrée — options accessibles qui n'intimident pas", "45-50% gamme moyenne — là où se génère l'essentiel des ventes et de la marge", "20-25% premium — références qui augmentent le ticket", "5-10% haut de gamme — ancres de prix et vins d'occasion", "Équilibre entre blancs, rouges, rosés et effervescents selon le type de cuisine"] },
    ],
    benefits: [
      { icon: Target, title: "Détectez les lacunes", desc: "Identifiez les gammes de prix ou styles sans couverture qui représentent des ventes perdues." },
      { icon: Wine, title: "Éliminez les chevauchements", desc: "Découvrez si vous avez trop de vins en concurrence dans la même cellule prix-style." },
      { icon: DollarSign, title: "Optimisez les marges", desc: "Assurez-vous que chaque gamme de prix a la distribution adéquate pour maximiser le bénéfice." },
    ],
    tableRows: [
      { style: "Blancs frais", cells: ["2 réf", "3 réf", "1 réf", "—"] },
      { style: "Blancs corsés", cells: ["1 réf", "2 réf", "1 réf", "1 réf"] },
      { style: "Rosés", cells: ["1 réf", "2 réf", "—", "—"] },
      { style: "Rouges souples", cells: ["2 réf", "3 réf", "1 réf", "—"] },
      { style: "Rouges intenses", cells: ["1 réf", "3 réf", "2 réf", "1 réf"] },
      { style: "Effervescents", cells: ["1 réf", "2 réf", "1 réf", "1 réf"] },
    ],
    ref: "réf", refs: "réf", none: "—",
    toastSuccess: "Modèle prêt ! Le téléchargement va commencer.",
    toastError: "Erreur lors de l'envoi. Veuillez réessayer.",
  },
};

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

const PlantillaWineMapping = () => {
  const { lang } = useLanguage();
  const t = i18n[lang];
  const navigate = useNavigate();
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
      const leadData = { ...data, form_type: "plantilla-wine-mapping" };
      const { error } = await supabase.from("contact_leads").insert(leadData);
      if (error) throw error;
      notifyLead(leadData);
      const a = document.createElement("a");
      a.href = "/recursos/winerim_plantilla_wine_mapping_2026.xlsx";
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => navigate("/gracias?tipo=plantilla-wine-mapping"), 1000);
    } catch {
      toast.error(t.toastError);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadcrumbParent, href: "/guias-y-recursos" }, { label: t.breadcrumbCurrent }]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
                <Map size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">{t.h1}</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8">{t.subtitle}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Target size={14} className="text-wine" /> {t.tagMatrix}</span>
                <span className="flex items-center gap-2"><Download size={14} className="text-wine" /> {t.tagDownload}</span>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-border bg-gradient-card">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-wine mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">{t.successTitle}</h3>
                  <p className="text-muted-foreground mb-4">{t.successDesc}</p>
                  <a href="/recursos/winerim_plantilla_wine_mapping_2026.xlsx" download
                    className="inline-flex items-center gap-2 text-wine text-sm font-semibold hover:underline mb-6">
                    <Download size={16} /> {t.downloadAgain}
                  </a>
                  <div>
                    <Link to="/analisis-carta"
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                      {t.analyzeBtn} <ArrowRight size={16} />
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
                    {loading ? t.submitting : t.submitBtn}
                    {!loading && <Download size={16} className="ml-2" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">{t.noSpam}</p>
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
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.contentBadge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.contentH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.contentDesc}</p>
          </ScrollReveal>
          <div className="space-y-8">
            {t.sections.map((section, i) => (
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

      {/* EJEMPLO VISUAL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{t.exampleH2}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left font-heading font-bold text-muted-foreground border-b border-border">{t.styleHeader}</th>
                  <th className="p-4 text-center font-heading font-bold text-muted-foreground border-b border-border">15-22€</th>
                  <th className="p-4 text-center font-heading font-bold text-muted-foreground border-b border-border">22-35€</th>
                  <th className="p-4 text-center font-heading font-bold text-muted-foreground border-b border-border">35-55€</th>
                  <th className="p-4 text-center font-heading font-bold text-muted-foreground border-b border-border">55€+</th>
                </tr>
              </thead>
              <tbody>
                {t.tableRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-gradient-card"}>
                    <td className="p-4 font-medium border-b border-border">{row.style}</td>
                    {row.cells.map((cell, j) => (
                      <td key={j} className={`p-4 text-center border-b border-border ${cell === "—" ? "text-muted-foreground/30" : "text-wine font-semibold"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">{t.exampleNote}</p>
        </ScrollReveal>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">{t.benefitsH2}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.benefits.map((b, i) => (
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

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaH2}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{t.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analisis-carta"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {t.ctaAnalyze} <ArrowRight size={16} />
              </Link>
              <Link to="/demo"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {t.ctaDemo}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default PlantillaWineMapping;
