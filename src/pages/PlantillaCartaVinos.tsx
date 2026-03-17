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
type PT = {
  seoTitle: string; seoDesc: string; seoUrl: string;
  breadRes: string; breadLabel: string;
  badge: string; heroTitle: string; heroDesc: string;
  ctaDownload: string; ctaAnalyse: string;
  mockupCategories: string[];
  introTitle: string; introDesc: string;
  introProblems: string[];
  includesLabel: string; includesTitle: string; includesDesc: string;
  includes: { title: string; desc: string }[];
  stepsLabel: string; stepsTitle: string;
  steps: { num: string; title: string; desc: string }[];
  errorsLabel: string; errorsTitle: string; errorsDesc: string;
  errors_list: string[];
  resultsLabel: string; resultsTitle: string; resultsDesc: string;
  results: { title: string; desc: string }[];
  downloadTitle: string; downloadDesc: string;
  successTitle: string; successDesc: string; downloadAgain: string;
  analyseList: string; submitLabel: string; submitLoading: string;
  privacyPrefix: string; privacyLink: string;
  ctaFinalTitle: string; ctaFinalDesc: string; ctaPrimary: string;
  toastSuccess: string; toastError: string;
};

const introProblemIcons = [Layers, List, DollarSign, AlertTriangle];
const includeIcons = [List, GlassWater, Layers, FileText, DollarSign];
const resultIcons = [TrendingUp, BarChart3, Users];

const es: PT = {
  seoTitle: "Plantilla de Carta de Vinos para Restaurante | Descarga Gratis",
  seoDesc: "Descarga gratis una plantilla profesional para diseñar tu carta de vinos. Estructura de categorías, precios equilibrados y sección por copa incluida.",
  seoUrl: "https://winerim.wine/recursos/plantilla-carta-de-vinos",
  breadRes: "Recursos", breadLabel: "Plantilla carta de vinos",
  badge: "Recurso gratuito",
  heroTitle: "Plantilla de carta de vinos para restaurante",
  heroDesc: "Descarga una plantilla profesional para diseñar una carta de vinos clara, equilibrada y pensada para vender más.",
  ctaDownload: "Descargar plantilla", ctaAnalyse: "Analizar mi carta",
  mockupCategories: ["Vinos por Copa", "Blancos", "Tintos", "Espumosos"],
  introTitle: "¿Por qué necesitas una plantilla para tu carta de vinos?",
  introDesc: "Diseñar una carta de vinos desde cero puede ser complicado. Sin una estructura clara, es fácil caer en errores que afectan tanto a la experiencia del cliente como a la rentabilidad del negocio. Una buena plantilla te da el punto de partida profesional que necesitas.",
  introProblems: [
    "Demasiadas referencias sin criterio claro de selección",
    "Organización confusa que dificulta la navegación",
    "Precios mal estructurados con saltos bruscos",
    "Falta de categorías claras y consistentes",
  ],
  includesLabel: "Contenido", includesTitle: "Qué incluye la plantilla",
  includesDesc: "Todo lo que necesitas para diseñar una carta de vinos profesional desde el primer día.",
  includes: [
    { title: "Estructura de categorías", desc: "Plantilla con las categorías principales ya definidas: tintos, blancos, rosados, espumosos y vinos dulces. Lista para personalizar." },
    { title: "Sección de vinos por copa", desc: "Espacio dedicado para tu oferta por copa, con campos para nombre, descripción breve y precio por copa y botella." },
    { title: "Organización por estilos o regiones", desc: "Dos modelos de organización incluidos: por estilo de vino (fresco, estructurado, aromático) o por región de origen." },
    { title: "Espacio para descripciones simples", desc: "Campos predefinidos para descripciones breves, maridajes sugeridos y notas de cata accesibles para cualquier cliente." },
    { title: "Estructura de precios equilibrada", desc: "Guía de rangos de precio con la distribución recomendada: entrada, zona media, premium y alta gama." },
  ],
  stepsLabel: "Paso a paso", stepsTitle: "Cómo utilizar la plantilla",
  steps: [
    { num: "01", title: "Define tus categorías", desc: "Elige entre organizar por tipo de vino, por estilo o por región. La plantilla incluye ambas opciones para que elijas la que mejor se adapta a tu restaurante." },
    { num: "02", title: "Selecciona vinos estratégicos", desc: "Rellena cada categoría con vinos que cumplan una función: entrada accesible, zona media de alta rotación, opciones premium y vinos ancla." },
    { num: "03", title: "Distribuye precios", desc: "Usa la guía de rangos de precio incluida para asegurarte de que no hay huecos ni saltos bruscos. Cada peldaño debe tener 2-3 opciones." },
    { num: "04", title: "Revisa el equilibrio", desc: "Comprueba que cada categoría tiene suficiente variedad, que la oferta por copa es atractiva y que la carta no es ni demasiado larga ni demasiado corta." },
  ],
  errorsLabel: "Prevención", errorsTitle: "Errores que evita esta plantilla",
  errorsDesc: "Los errores más comunes al diseñar una carta de vinos y cómo esta plantilla te ayuda a evitarlos.",
  errors_list: [
    "Cartas demasiado largas con referencias que no se venden y ocupan espacio en bodega",
    "Falta de vinos por copa, perdiendo ventas de mesas individuales y parejas",
    "Precios desordenados sin una escalera de precios lógica y fluida",
    "Categorías confusas que mezclan criterios y desorientan al cliente",
    "Descripciones demasiado técnicas que intimidan en lugar de invitar a probar",
    "Falta de recomendaciones que guíen la decisión del cliente hacia opciones rentables",
  ],
  resultsLabel: "Resultados", resultsTitle: "Lo que consigues con una carta bien estructurada",
  resultsDesc: "Una carta de vinos bien diseñada no solo se ve mejor. Tiene un impacto directo en las ventas y la experiencia del cliente.",
  results: [
    { title: "Aumentar las ventas de vino", desc: "Una carta clara y bien organizada facilita la decisión y anima al cliente a explorar opciones que de otra forma no habría considerado." },
    { title: "Mejorar el ticket medio", desc: "La estructura de precios con vinos ancla y recomendaciones destacadas guía al cliente de forma natural hacia opciones de mayor valor." },
    { title: "Facilitar la elección del cliente", desc: "Categorías claras, descripciones simples y una oferta por copa accesible eliminan la fricción y hacen que elegir vino sea un placer, no un problema." },
  ],
  downloadTitle: "Descarga la plantilla gratuita", downloadDesc: "Déjanos tus datos y descarga el recurso al instante.",
  successTitle: "¡Plantilla lista!", successDesc: "La descarga debería haber comenzado automáticamente.",
  downloadAgain: "Descargar de nuevo", analyseList: "Analizar mi carta de vinos",
  submitLabel: "Descargar plantilla", submitLoading: "Enviando...",
  privacyPrefix: "Al enviar aceptas nuestra ", privacyLink: "política de privacidad",
  ctaFinalTitle: "¿Quieres saber si tu carta de vinos está optimizada?",
  ctaFinalDesc: "Analizamos tu carta de vinos de forma gratuita y te damos recomendaciones personalizadas para mejorar su estructura y rentabilidad.",
  ctaPrimary: "Solicitar análisis gratuito",
  toastSuccess: "¡Plantilla lista! La descarga comenzará en un momento.",
  toastError: "Ha ocurrido un error. Inténtalo de nuevo.",
};

const en_t: PT = {
  seoTitle: "Wine List Template for Restaurants | Free Download",
  seoDesc: "Download a free professional template to design your wine list. Category structure, balanced pricing and by-the-glass section included.",
  seoUrl: "https://winerim.wine/en/resources/wine-list-template",
  breadRes: "Resources", breadLabel: "Wine list template",
  badge: "Free resource",
  heroTitle: "Wine list template for restaurants",
  heroDesc: "Download a professional template to design a clear, balanced wine list built to sell more.",
  ctaDownload: "Download template", ctaAnalyse: "Analyse my list",
  mockupCategories: ["Wines by the Glass", "Whites", "Reds", "Sparkling"],
  introTitle: "Why do you need a wine list template?",
  introDesc: "Designing a wine list from scratch can be tricky. Without a clear structure, it's easy to make mistakes that affect both the guest experience and your bottom line. A good template gives you the professional starting point you need.",
  introProblems: [
    "Too many references without clear selection criteria",
    "Confusing layout that hinders navigation",
    "Poorly structured pricing with abrupt jumps",
    "Lack of clear and consistent categories",
  ],
  includesLabel: "Contents", includesTitle: "What the template includes",
  includesDesc: "Everything you need to design a professional wine list from day one.",
  includes: [
    { title: "Category structure", desc: "Template with main categories already defined: reds, whites, rosés, sparkling and dessert wines. Ready to customise." },
    { title: "By-the-glass section", desc: "Dedicated space for your by-the-glass offer, with fields for name, brief description and glass/bottle pricing." },
    { title: "Organisation by style or region", desc: "Two organisation models included: by wine style (fresh, structured, aromatic) or by region of origin." },
    { title: "Space for simple descriptions", desc: "Pre-defined fields for brief descriptions, suggested pairings and accessible tasting notes." },
    { title: "Balanced pricing structure", desc: "Price range guide with recommended distribution: entry, mid-range, premium and top-end." },
  ],
  stepsLabel: "Step by step", stepsTitle: "How to use the template",
  steps: [
    { num: "01", title: "Define your categories", desc: "Choose between organising by wine type, style or region. The template includes both options so you can pick the best fit." },
    { num: "02", title: "Select strategic wines", desc: "Fill each category with wines that serve a purpose: accessible entry, high-rotation mid-range, premium options and anchor wines." },
    { num: "03", title: "Distribute pricing", desc: "Use the included price range guide to ensure there are no gaps or abrupt jumps. Each tier should have 2-3 options." },
    { num: "04", title: "Review the balance", desc: "Check that each category has enough variety, the by-the-glass offer is attractive and the list is neither too long nor too short." },
  ],
  errorsLabel: "Prevention", errorsTitle: "Mistakes this template prevents",
  errorsDesc: "The most common mistakes when designing a wine list and how this template helps you avoid them.",
  errors_list: [
    "Lists that are too long with unsold references taking up cellar space",
    "No wines by the glass, losing sales from solo diners and couples",
    "Disorganised pricing without a logical and fluid price ladder",
    "Confusing categories that mix criteria and disorient the guest",
    "Overly technical descriptions that intimidate rather than invite tasting",
    "Lack of recommendations to guide the guest towards profitable options",
  ],
  resultsLabel: "Results", resultsTitle: "What you achieve with a well-structured list",
  resultsDesc: "A well-designed wine list doesn't just look better. It has a direct impact on sales and the guest experience.",
  results: [
    { title: "Increase wine sales", desc: "A clear, well-organised list makes choosing easier and encourages guests to explore options they wouldn't have considered." },
    { title: "Improve the average ticket", desc: "Price structure with anchor wines and highlighted recommendations naturally guides guests towards higher-value options." },
    { title: "Make choosing easy for guests", desc: "Clear categories, simple descriptions and an accessible by-the-glass offer remove friction and make choosing wine a pleasure, not a problem." },
  ],
  downloadTitle: "Download the free template", downloadDesc: "Leave your details and download the resource instantly.",
  successTitle: "Template ready!", successDesc: "The download should have started automatically.",
  downloadAgain: "Download again", analyseList: "Analyse my wine list",
  submitLabel: "Download template", submitLoading: "Sending...",
  privacyPrefix: "By submitting you accept our ", privacyLink: "privacy policy",
  ctaFinalTitle: "Want to know if your wine list is optimised?",
  ctaFinalDesc: "We analyse your wine list for free and give you personalised recommendations to improve its structure and profitability.",
  ctaPrimary: "Request free analysis",
  toastSuccess: "Template ready! Download will start shortly.",
  toastError: "An error occurred. Please try again.",
};

const it_t: PT = {
  seoTitle: "Modello Carta dei Vini per Ristorante | Download Gratuito",
  seoDesc: "Scarica gratis un modello professionale per progettare la tua carta dei vini. Struttura delle categorie, prezzi equilibrati e sezione al calice inclusa.",
  seoUrl: "https://winerim.wine/it/risorse/modello-carta-vini",
  breadRes: "Risorse", breadLabel: "Modello carta dei vini",
  badge: "Risorsa gratuita",
  heroTitle: "Modello di carta dei vini per ristorante",
  heroDesc: "Scarica un modello professionale per progettare una carta dei vini chiara, equilibrata e pensata per vendere di più.",
  ctaDownload: "Scarica modello", ctaAnalyse: "Analizza la mia carta",
  mockupCategories: ["Vini al Calice", "Bianchi", "Rossi", "Spumanti"],
  introTitle: "Perché ti serve un modello per la tua carta dei vini?",
  introDesc: "Progettare una carta dei vini da zero può essere complicato. Senza una struttura chiara, è facile commettere errori che influiscono sia sull'esperienza del cliente che sulla redditività. Un buon modello ti offre il punto di partenza professionale di cui hai bisogno.",
  introProblems: [
    "Troppe referenze senza criteri chiari di selezione",
    "Layout confuso che ostacola la navigazione",
    "Prezzi mal strutturati con salti bruschi",
    "Mancanza di categorie chiare e coerenti",
  ],
  includesLabel: "Contenuto", includesTitle: "Cosa include il modello",
  includesDesc: "Tutto ciò che ti serve per progettare una carta dei vini professionale dal primo giorno.",
  includes: [
    { title: "Struttura delle categorie", desc: "Modello con le categorie principali già definite: rossi, bianchi, rosati, spumanti e vini dolci. Pronto da personalizzare." },
    { title: "Sezione vini al calice", desc: "Spazio dedicato per l'offerta al calice, con campi per nome, descrizione breve e prezzo al calice e in bottiglia." },
    { title: "Organizzazione per stile o regione", desc: "Due modelli di organizzazione inclusi: per stile di vino (fresco, strutturato, aromatico) o per regione di origine." },
    { title: "Spazio per descrizioni semplici", desc: "Campi predefiniti per descrizioni brevi, abbinamenti suggeriti e note di degustazione accessibili." },
    { title: "Struttura dei prezzi equilibrata", desc: "Guida alle fasce di prezzo con la distribuzione consigliata: ingresso, fascia media, premium e alta gamma." },
  ],
  stepsLabel: "Passo dopo passo", stepsTitle: "Come utilizzare il modello",
  steps: [
    { num: "01", title: "Definisci le categorie", desc: "Scegli tra organizzare per tipo di vino, per stile o per regione. Il modello include entrambe le opzioni." },
    { num: "02", title: "Seleziona vini strategici", desc: "Compila ogni categoria con vini che svolgano una funzione: ingresso accessibile, fascia media ad alta rotazione, opzioni premium e vini àncora." },
    { num: "03", title: "Distribuisci i prezzi", desc: "Usa la guida alle fasce di prezzo inclusa per assicurarti che non ci siano lacune né salti bruschi. Ogni gradino deve avere 2-3 opzioni." },
    { num: "04", title: "Verifica l'equilibrio", desc: "Controlla che ogni categoria abbia sufficiente varietà, che l'offerta al calice sia attraente e che la carta non sia né troppo lunga né troppo corta." },
  ],
  errorsLabel: "Prevenzione", errorsTitle: "Errori che questo modello previene",
  errorsDesc: "Gli errori più comuni nella progettazione di una carta dei vini e come questo modello ti aiuta ad evitarli.",
  errors_list: [
    "Carte troppo lunghe con referenze invendute che occupano spazio in cantina",
    "Mancanza di vini al calice, perdendo vendite da tavoli singoli e coppie",
    "Prezzi disordinati senza una scala logica e fluida",
    "Categorie confuse che mescolano criteri e disorientano il cliente",
    "Descrizioni troppo tecniche che intimidiscono anziché invitare all'assaggio",
    "Mancanza di raccomandazioni che guidino il cliente verso opzioni redditizie",
  ],
  resultsLabel: "Risultati", resultsTitle: "Cosa ottieni con una carta ben strutturata",
  resultsDesc: "Una carta dei vini ben progettata non solo appare meglio. Ha un impatto diretto sulle vendite e sull'esperienza del cliente.",
  results: [
    { title: "Aumentare le vendite di vino", desc: "Una carta chiara e ben organizzata facilita la scelta e incoraggia il cliente ad esplorare opzioni che altrimenti non avrebbe considerato." },
    { title: "Migliorare lo scontrino medio", desc: "La struttura dei prezzi con vini àncora e raccomandazioni in evidenza guida naturalmente il cliente verso opzioni di maggior valore." },
    { title: "Facilitare la scelta del cliente", desc: "Categorie chiare, descrizioni semplici e un'offerta al calice accessibile eliminano le frizioni e rendono la scelta del vino un piacere." },
  ],
  downloadTitle: "Scarica il modello gratuito", downloadDesc: "Lascia i tuoi dati e scarica la risorsa all'istante.",
  successTitle: "Modello pronto!", successDesc: "Il download dovrebbe essere partito automaticamente.",
  downloadAgain: "Scarica di nuovo", analyseList: "Analizza la mia carta dei vini",
  submitLabel: "Scarica modello", submitLoading: "Invio...",
  privacyPrefix: "Inviando accetti la nostra ", privacyLink: "informativa sulla privacy",
  ctaFinalTitle: "Vuoi sapere se la tua carta dei vini è ottimizzata?",
  ctaFinalDesc: "Analizziamo la tua carta dei vini gratuitamente e ti diamo raccomandazioni personalizzate per migliorarne struttura e redditività.",
  ctaPrimary: "Richiedi analisi gratuita",
  toastSuccess: "Modello pronto! Il download partirà a breve.",
  toastError: "Si è verificato un errore. Riprova.",
};

const fr_t: PT = {
  seoTitle: "Modèle de Carte des Vins pour Restaurant | Téléchargement Gratuit",
  seoDesc: "Téléchargez gratuitement un modèle professionnel pour concevoir votre carte des vins. Structure de catégories, prix équilibrés et section vins au verre incluse.",
  seoUrl: "https://winerim.wine/fr/ressources/modele-carte-vins",
  breadRes: "Ressources", breadLabel: "Modèle carte des vins",
  badge: "Ressource gratuite",
  heroTitle: "Modèle de carte des vins pour restaurant",
  heroDesc: "Téléchargez un modèle professionnel pour concevoir une carte des vins claire, équilibrée et conçue pour vendre davantage.",
  ctaDownload: "Télécharger le modèle", ctaAnalyse: "Analyser ma carte",
  mockupCategories: ["Vins au Verre", "Blancs", "Rouges", "Effervescents"],
  introTitle: "Pourquoi avez-vous besoin d'un modèle pour votre carte des vins ?",
  introDesc: "Concevoir une carte des vins en partant de zéro peut être complexe. Sans structure claire, il est facile de commettre des erreurs qui affectent l'expérience client et la rentabilité. Un bon modèle vous donne le point de départ professionnel dont vous avez besoin.",
  introProblems: [
    "Trop de références sans critères de sélection clairs",
    "Organisation confuse qui complique la navigation",
    "Prix mal structurés avec des sauts brusques",
    "Manque de catégories claires et cohérentes",
  ],
  includesLabel: "Contenu", includesTitle: "Ce que contient le modèle",
  includesDesc: "Tout ce qu'il faut pour concevoir une carte des vins professionnelle dès le premier jour.",
  includes: [
    { title: "Structure de catégories", desc: "Modèle avec les catégories principales déjà définies : rouges, blancs, rosés, effervescents et vins moelleux. Prêt à personnaliser." },
    { title: "Section vins au verre", desc: "Espace dédié pour votre offre au verre, avec champs pour nom, description courte et prix au verre et à la bouteille." },
    { title: "Organisation par style ou région", desc: "Deux modèles d'organisation inclus : par style de vin (frais, structuré, aromatique) ou par région d'origine." },
    { title: "Espace pour descriptions simples", desc: "Champs prédéfinis pour descriptions courtes, accords mets-vins suggérés et notes de dégustation accessibles." },
    { title: "Structure de prix équilibrée", desc: "Guide de gammes de prix avec la distribution recommandée : entrée de gamme, milieu de gamme, premium et haut de gamme." },
  ],
  stepsLabel: "Étape par étape", stepsTitle: "Comment utiliser le modèle",
  steps: [
    { num: "01", title: "Définissez vos catégories", desc: "Choisissez entre organiser par type de vin, par style ou par région. Le modèle inclut les deux options." },
    { num: "02", title: "Sélectionnez des vins stratégiques", desc: "Remplissez chaque catégorie avec des vins remplissant une fonction : entrée accessible, milieu de gamme à forte rotation, options premium et vins d'ancrage." },
    { num: "03", title: "Distribuez les prix", desc: "Utilisez le guide de gammes de prix inclus pour vous assurer qu'il n'y a ni lacunes ni sauts brusques. Chaque palier doit avoir 2-3 options." },
    { num: "04", title: "Vérifiez l'équilibre", desc: "Vérifiez que chaque catégorie a assez de variété, que l'offre au verre est attractive et que la carte n'est ni trop longue ni trop courte." },
  ],
  errorsLabel: "Prévention", errorsTitle: "Erreurs que ce modèle prévient",
  errorsDesc: "Les erreurs les plus courantes lors de la conception d'une carte des vins et comment ce modèle vous aide à les éviter.",
  errors_list: [
    "Cartes trop longues avec des références invendues occupant de l'espace en cave",
    "Absence de vins au verre, perdant des ventes de tables individuelles et couples",
    "Prix désordonnés sans échelle de prix logique et fluide",
    "Catégories confuses mélangeant les critères et désorientant le client",
    "Descriptions trop techniques qui intimident au lieu d'inviter à la dégustation",
    "Absence de recommandations guidant le client vers des options rentables",
  ],
  resultsLabel: "Résultats", resultsTitle: "Ce que vous obtenez avec une carte bien structurée",
  resultsDesc: "Une carte des vins bien conçue n'est pas seulement plus belle. Elle a un impact direct sur les ventes et l'expérience client.",
  results: [
    { title: "Augmenter les ventes de vin", desc: "Une carte claire et bien organisée facilite le choix et encourage le client à explorer des options qu'il n'aurait pas considérées." },
    { title: "Améliorer le ticket moyen", desc: "La structure de prix avec vins d'ancrage et recommandations mises en avant guide naturellement le client vers des options de plus grande valeur." },
    { title: "Faciliter le choix du client", desc: "Catégories claires, descriptions simples et offre au verre accessible éliminent les frictions et font du choix du vin un plaisir." },
  ],
  downloadTitle: "Téléchargez le modèle gratuit", downloadDesc: "Laissez vos coordonnées et téléchargez la ressource instantanément.",
  successTitle: "Modèle prêt !", successDesc: "Le téléchargement devrait avoir commencé automatiquement.",
  downloadAgain: "Télécharger à nouveau", analyseList: "Analyser ma carte des vins",
  submitLabel: "Télécharger le modèle", submitLoading: "Envoi...",
  privacyPrefix: "En soumettant vous acceptez notre ", privacyLink: "politique de confidentialité",
  ctaFinalTitle: "Vous souhaitez savoir si votre carte des vins est optimisée ?",
  ctaFinalDesc: "Nous analysons votre carte des vins gratuitement et vous donnons des recommandations personnalisées pour améliorer sa structure et sa rentabilité.",
  ctaPrimary: "Demander une analyse gratuite",
  toastSuccess: "Modèle prêt ! Le téléchargement va démarrer.",
  toastError: "Une erreur est survenue. Veuillez réessayer.",
};

const i18n: Record<string, PT> = { es, en: en_t, it: it_t, fr: fr_t };

/* ─── Form ─── */
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

const PlantillaCartaVinos = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState("");
  const [referencesCount, setReferencesCount] = useState("");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const leadData = {
        restaurant: data.restaurant, name: data.name, position: data.position,
        phone: data.phone, email: data.email, city: data.city,
        references_count: data.references_count, form_type: "plantilla-carta-vinos",
      };
      const { error } = await supabase.from("contact_leads").insert(leadData);
      if (error) throw error;
      setSubmitted(true);
      toast.success(t.toastSuccess);
      notifyLead(leadData);
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = "/recursos/winerim_plantilla_carta_vinos_2026.xlsx";
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 800);
    } catch {
      toast.error(t.toastError);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "plantilla-carta-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: t.heroTitle, description: t.seoDesc,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: t.seoUrl, inLanguage: lang,
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("plantilla-carta-jsonld")?.remove(); };
  }, [t, lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={t.seoUrl} type="article" />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Breadcrumbs items={[{ label: t.breadRes, href: localePath("/guias-y-recursos") }, { label: t.breadLabel }]} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
              <Download size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">{t.heroTitle}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-8">{t.heroDesc}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <a href="#descargar" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {t.ctaDownload} <Download size={16} />
              </a>
              <Link to={localePath("/analisis-carta")} className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {t.ctaAnalyse}
              </Link>
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="hidden md:block">
            <div className="bg-gradient-card rounded-2xl border border-border p-8 shadow-xl">
              <div className="text-center mb-6">
                <Wine size={28} className="text-wine mx-auto mb-2" />
                <p className="font-heading text-lg font-bold">{lang === "en" ? "Wine List" : lang === "it" ? "Carta dei Vini" : lang === "fr" ? "Carte des Vins" : "Carta de Vinos"}</p>
                <div className="w-12 h-0.5 bg-wine/30 mx-auto mt-2" />
              </div>
              {t.mockupCategories.map((cat) => (
                <div key={cat} className="mb-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-2">{cat}</p>
                  {[1, 2].map(j => (
                    <div key={j} className="flex justify-between items-center py-1.5 border-b border-border/50">
                      <div><div className="h-2.5 w-32 bg-muted rounded" /><div className="h-2 w-20 bg-muted/60 rounded mt-1" /></div>
                      <div className="h-2.5 w-10 bg-muted rounded" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{t.introTitle}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">{t.introDesc}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {t.introProblems.map((p, i) => {
            const Icon = introProblemIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-gradient-card">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5"><Icon size={20} className="text-wine" /></div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 3. INCLUDES */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.includesLabel}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.includesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.includesDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.includes.map((item, i) => {
              const Icon = includeIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="p-6 rounded-xl border border-border bg-background h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><Icon size={20} className="text-wine" /></div>
                    <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STEPS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.stepsLabel}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.stepsTitle}</h2>
        </ScrollReveal>
        <div className="space-y-8">
          {t.steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-start gap-6 p-6 rounded-xl border border-border bg-gradient-card">
                <span className="font-heading text-3xl font-bold text-wine/30 shrink-0">{step.num}</span>
                <div><h3 className="font-heading font-bold mb-2">{step.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. ERRORS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.errorsLabel}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.errorsTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.errorsDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {t.errors_list.map((mistake, i) => (
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

      {/* 6. RESULTS */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.resultsLabel}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.resultsTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.resultsDesc}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {t.results.map((b, i) => {
            const Icon = resultIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><Icon size={20} className="text-wine" /></div>
                  <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 7. DOWNLOAD FORM */}
      <section id="descargar" className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Download size={32} className="text-wine mx-auto mb-4" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.downloadTitle}</h2>
              <p className="text-muted-foreground">{t.downloadDesc}</p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="text-center p-8 rounded-xl border border-wine/30 bg-wine/5">
                <CheckCircle size={40} className="text-wine mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">{t.successTitle}</h3>
                <p className="text-muted-foreground mb-4">{t.successDesc}</p>
                <a href="/recursos/winerim_plantilla_carta_vinos_2026.xlsx" download
                  className="inline-flex items-center gap-2 text-wine text-sm font-semibold hover:underline mb-6">
                  <Download size={16} /> {t.downloadAgain}
                </a>
                <div>
                  <Link to={localePath("/analisis-carta")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                    {t.analyseList} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <ContactFormFields register={register} errors={errors} position={position} onPositionChange={(v) => { setPosition(v); setValue("position", v); }} referencesCount={referencesCount} onReferencesCountChange={(v) => { setReferencesCount(v); setValue("references_count", v); }} />
              <Button type="submit" disabled={submitting}
                className="w-full bg-gradient-wine text-primary-foreground hover:opacity-90 py-6 text-sm font-semibold tracking-wider uppercase">
                {submitting ? t.submitLoading : t.submitLabel}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                {t.privacyPrefix}<Link to={localePath("/privacidad")} className="underline hover:text-foreground">{t.privacyLink}</Link>.
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
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaFinalTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{t.ctaFinalDesc}</p>
            <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {t.ctaPrimary} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default PlantillaCartaVinos;
