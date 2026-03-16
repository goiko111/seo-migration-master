import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, AlertTriangle, CheckCircle, BarChart3, Wine,
  Users, Sparkles, X, Check, GraduationCap, Target,
  DollarSign, TrendingUp, MessageSquare, HelpCircle, BookOpen,
  Utensils, Globe
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import WinerimSupplyBlock from "@/components/WinerimSupplyBlock";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── types ─── */
type TableRow = { area: string; without: string; with_w: string };
type UseCase = { title: string; scenario: string; result: string };

type Content = {
  metaTitle: string; metaDescription: string;
  badgeLabel: string; breadSolutions: string; breadLabel: string;
  heroTitle1: string; heroTitleHighlight: string;
  heroDesc: string; ctaDemo: string; ctaContact: string;
  heroSummary: string;
  /* For / not for */
  forTitle: string; forLabel: string; notForLabel: string;
  forItems: string[]; notForItems: string[];
  /* Pains */
  painLabel: string; painTitle1: string; painTitleHighlight: string;
  pains: { text: string }[];
  /* Table */
  tableLabel: string; tableTitle: string;
  tableHeaders: [string, string, string];
  tableRows: TableRow[];
  /* Solution */
  solLabel: string; solTitle1: string; solTitleHighlight: string;
  advantages: { title: string; desc: string }[];
  /* How it works in practice */
  howLabel: string; howTitle: string;
  useCases: UseCase[];
  /* Impact */
  impactLabel: string; impactTitle: string; impactSubtitle: string;
  impacts: { label: string; desc: string }[];
  /* What it does / doesn't */
  doesLabel: string; doesTitle: string;
  doesItems: string[]; doesNotLabel: string; doesNotItems: string[];
  /* CTA */
  ctaLabel: string; ctaTitle: string; ctaDesc: string;
  ctaPrimary: string; ctaSecondary: string; ctaMicro: string;
  /* FAQs */
  faqs: { q: string; a: string }[];
};

/* ═══════════════════════════════════════════════════════════ */
/*  SPANISH                                                   */
/* ═══════════════════════════════════════════════════════════ */

const ES: Content = {
  metaTitle: "Winerim para Restaurantes sin Sumiller | Vende Más Vino sin Experto en Sala",
  metaDescription: "Tu equipo de sala recomienda vino con confianza gracias a fichas, maridajes e IA. Sin necesidad de sumiller. Más ventas, mejor experiencia, menos fricción.",
  badgeLabel: "Sin sumiller, con criterio", breadSolutions: "Soluciones", breadLabel: "Restaurantes sin sumiller",
  heroTitle1: "Vende más vino sin depender de ", heroTitleHighlight: "un sumiller en cada mesa",
  heroDesc: "Winerim convierte tu carta de vinos en un asistente de venta que guía al equipo de sala y al comensal. Recomendaciones inteligentes, maridajes automáticos y fichas claras para que cualquier camarero recomiende con confianza.",
  ctaDemo: "Solicitar demo", ctaContact: "Hablar con el equipo",
  heroSummary: "El 80 % de los restaurantes con carta de vinos no tienen sumiller. Winerim cubre ese hueco: da al equipo de sala las herramientas para recomendar vino de forma profesional, aumentar el ticket medio y mejorar la experiencia del comensal sin necesidad de formación previa en enología.",

  forTitle: "¿Es Winerim para tu restaurante?", forLabel: "Es para ti si...", notForLabel: "Probablemente no es para ti si...",
  forItems: [
    "Tienes carta de vinos pero no sumiller a tiempo completo",
    "Tu equipo de sala no se siente seguro recomendando vino",
    "Muchos comensales piden 'el de la casa' o el más barato por falta de orientación",
    "Quieres vender más vino sin complicar la operativa",
    "Tienes 50 o más referencias y necesitas que roten mejor",
    "Buscas elevar la experiencia sin contratar más personal especializado",
  ],
  notForItems: [
    "Tienes un sumiller permanente y no necesitas apoyo adicional",
    "Tu carta tiene menos de 50 referencias y no buscas optimizarla",
    "Solo necesitas un PDF bonito sin funcionalidades de venta o gestión",
  ],

  painLabel: "El problema", painTitle1: "El vino se queda en la carta porque ", painTitleHighlight: "nadie sabe venderlo",
  pains: [
    { text: "El equipo de sala no tiene tiempo ni conocimiento para recomendar vinos. Cuando el comensal pregunta, la respuesta suele ser vaga o evasiva." },
    { text: "La inseguridad al recomendar hace que el camarero evite sugerir vino. Si no sabe qué decir, no dice nada. Cada mesa sin recomendación es una venta perdida." },
    { text: "El comensal se enfrenta a una carta que no entiende: demasiadas referencias, sin contexto, sin maridaje, sin guía. Acaba pidiendo lo más barato o directamente no pide vino." },
    { text: "El restaurante pierde margen porque vende menos vino del que podría, vende referencias de bajo valor y no aprovecha la carta como herramienta de venta activa." },
    { text: "La formación en vino es cara, lenta y se pierde con la rotación de personal. Cada camarero nuevo vuelve a empezar desde cero." },
    { text: "No hay datos sobre qué vinos funcionan, cuáles se estancan ni qué impacto tiene cada referencia. Las decisiones de compra se basan en intuición." },
  ],

  tableLabel: "Comparativa", tableTitle: "Carta estática vs Winerim",
  tableHeaders: ["Situación", "Con carta estática", "Con Winerim"],
  tableRows: [
    { area: "El comensal pide ayuda", without: "El camarero improvisa o dice 'todos están bien'", with_w: "La carta sugiere por plato, estilo o presupuesto" },
    { area: "Un camarero nuevo empieza", without: "Semanas hasta que conoce la carta (si lo hace)", with_w: "Fichas, maridajes y puntos clave desde el primer día" },
    { area: "Mesa sin pedido de vino", without: "Nadie sugiere, la mesa se queda sin vino", with_w: "Recomendaciones inteligentes invitan a explorar" },
    { area: "Vinos que no rotan", without: "Nadie sabe cuáles son hasta que es tarde", with_w: "Alertas de rotación y rendimiento en tiempo real" },
    { area: "Comensal internacional", without: "No entiende la carta, pide cerveza", with_w: "Carta en su idioma con descripciones claras" },
    { area: "Decisiones de compra", without: "Se compra por intuición o relación con proveedor", with_w: "Datos de rotación, margen y rendimiento real" },
    { area: "Margen del vino", without: "Se desconoce el margen real por referencia", with_w: "Margen por vino, categoría y periodo visible" },
    { area: "Experiencia del comensal", without: "Genérica, sin personalización", with_w: "Personalizada, educativa, memorable" },
  ],

  solLabel: "La solución", solTitle1: "Tu carta de vinos se convierte en ", solTitleHighlight: "tu mejor vendedor",
  advantages: [
    { title: "Recomendaciones sin sumiller", desc: "La carta sugiere vinos al comensal según plato, perfil o momento. Tu equipo no necesita ser experto: la herramienta guía la venta." },
    { title: "Fichas de vino para el equipo", desc: "Cada referencia tiene notas de cata, origen, estilo y puntos clave de venta en lenguaje claro. El camarero sabe qué decir desde el primer día." },
    { title: "Maridajes automáticos", desc: "Por plato del menú, tipo de cocina o preferencia del comensal. Sin necesidad de que el equipo memorice nada." },
    { title: "Carta en el idioma del comensal", desc: "Multiidioma automático. El huésped internacional ve la carta en su idioma con descripciones adaptadas." },
    { title: "Datos para decidir mejor", desc: "Qué vinos se venden, cuáles no rotan, qué margen genera cada referencia. Decisiones de compra basadas en rendimiento real." },
    { title: "Operativa sin fricción", desc: "Se integra con tu forma de trabajar. No sustituye al equipo: lo equipa. Sin formación previa, sin complicaciones técnicas." },
  ],

  howLabel: "Ejemplos de uso", howTitle: "Cómo funciona en el día a día",
  useCases: [
    { title: "Restaurante gastronómico sin sumiller fijo", scenario: "Carta de 80 referencias, equipo de sala rotativo. Los camareros no conocen todos los vinos.", result: "Winerim da al comensal maridajes por plato y al camarero fichas con puntos clave de venta. El ticket medio en vino sube sin necesidad de formación intensiva." },
    { title: "Restaurante casual con buena carta", scenario: "Carta de 60 referencias, cocina de mercado. El vino está en la carta pero nadie lo sugiere activamente.", result: "La carta digital invita a explorar: recomendaciones por estilo, descripciones claras y maridajes automáticos. Más mesas piden vino." },
    { title: "Restaurante de hotel o resort", scenario: "Clientela internacional, varios turnos de servicio. Imposible tener un sumiller en cada turno.", result: "Carta multiidioma con recomendaciones inteligentes. El huésped entiende la oferta y el equipo tiene soporte para cada mesa." },
  ],

  impactLabel: "Impacto esperado", impactTitle: "Qué cambia cuando el vino se vende activamente",
  impactSubtitle: "Resultados que los restaurantes que usan Winerim observan desde las primeras semanas.",
  impacts: [
    { label: "Más mesas piden vino", desc: "Las recomendaciones inteligentes invitan a explorar. El vino deja de ser una decisión difícil." },
    { label: "Sube el ticket medio", desc: "El comensal descubre opciones que no habría elegido solo. Menos 'el de la casa', más venta de valor." },
    { label: "El equipo recomienda con confianza", desc: "Fichas claras y maridajes accesibles reducen la inseguridad. No necesitan ser expertos." },
    { label: "Menos vinos estancados", desc: "Alertas de rotación y datos de rendimiento ayudan a mover el stock y renovar la carta con criterio." },
    { label: "Mejor experiencia del comensal", desc: "Una carta que guía, educa y personaliza eleva la percepción del restaurante." },
    { label: "Decisiones de compra más inteligentes", desc: "Datos reales de qué funciona y qué no. Menos intuición, más criterio de negocio." },
  ],

  doesLabel: "Qué hace", doesTitle: "Winerim sin sumiller: transparencia total",
  doesItems: [
    "Sugiere vinos al comensal según plato, estilo o presupuesto",
    "Da al equipo de sala fichas claras, maridajes y puntos clave de venta",
    "Muestra la carta en el idioma del comensal automáticamente",
    "Genera datos de rotación, margen y rendimiento por referencia",
    "Se integra sin cambiar la operativa del restaurante",
    "Funciona desde el primer día sin formación previa",
  ],
  doesNotLabel: "Qué no hace",
  doesNotItems: [
    "No sustituye el criterio humano: el equipo sigue siendo clave",
    "No decide qué vinos comprar: aporta datos para que tú decidas",
    "No es un curso de enología: es una herramienta de venta y gestión",
  ],

  ctaLabel: "Sin sumiller, con Winerim",
  ctaTitle: "¿Quieres que tu carta de vinos venda por sí misma?",
  ctaDesc: "Analizamos tu carta y te mostramos dónde hay oportunidades de venta, margen y experiencia. Sin compromiso.",
  ctaPrimary: "Solicitar análisis gratuito", ctaSecondary: "Ver demo",
  ctaMicro: "Especialmente útil para restaurantes con 50+ referencias, sin sumiller fijo o con equipo de sala rotativo.",

  faqs: [
    { q: "¿Winerim sustituye al sumiller?", a: "No. Winerim no pretende sustituir al sumiller, sino cubrir el hueco cuando no lo hay. Da al equipo de sala herramientas para recomendar vino con confianza: fichas claras, maridajes automáticos y recomendaciones inteligentes." },
    { q: "¿El equipo de sala necesita formación previa en vino?", a: "No. Winerim funciona desde el primer día. Las fichas de cada vino incluyen puntos clave de venta, notas de cata en lenguaje claro y maridajes. Un camarero nuevo puede recomendar con solvencia desde su primer turno." },
    { q: "¿Cuántas referencias necesito en carta para que tenga sentido?", a: "A partir de 50 referencias, Winerim aporta un valor claro. Con cartas más pequeñas, el equipo puede gestionarlas de forma manual, pero a partir de 50 la complejidad crece y la herramienta marca la diferencia." },
    { q: "¿Qué impacto real tiene en ventas?", a: "Los restaurantes que usan Winerim ven más mesas pidiendo vino, un ticket medio más alto en la categoría y menos vinos estancados. El impacto depende del contexto, pero las mejoras suelen ser visibles en las primeras semanas." },
    { q: "¿Es difícil de implantar?", a: "No. Se activa en menos de 48 horas. Se carga la carta, se configuran los maridajes y ya está operativa. Sin instalaciones técnicas ni cambios en la forma de trabajar." },
    { q: "¿El comensal ve la carta en su idioma?", a: "Sí. Winerim muestra la carta automáticamente en español, inglés, italiano y francés, con más idiomas en desarrollo." },
    { q: "¿Qué datos puedo ver sobre el rendimiento del vino?", a: "Ticket medio en vino, margen por referencia y categoría, rotación, ratio de mesas que piden vino y evolución mensual. Datos para decidir qué comprar, qué retirar y qué potenciar." },
    { q: "¿Hay permanencia?", a: "No. Sin permanencia ni penalizaciones. Puedes empezar con un plan mensual y escalar o cancelar cuando quieras." },
  ],
};

/* ═══════════════════════════════════════════════════════════ */
/*  ENGLISH                                                   */
/* ═══════════════════════════════════════════════════════════ */

const EN: Content = {
  metaTitle: "Winerim for Restaurants Without a Sommelier | Sell More Wine Without an Expert",
  metaDescription: "Your floor team recommends wine confidently with profiles, pairings and AI. No sommelier needed. More sales, better experience, less friction.",
  badgeLabel: "No sommelier, full confidence", breadSolutions: "Solutions", breadLabel: "Restaurants without sommelier",
  heroTitle1: "Sell more wine without relying on ", heroTitleHighlight: "a sommelier at every table",
  heroDesc: "Winerim turns your wine list into a sales assistant that guides your team and your guests. Smart recommendations, automatic pairings and clear profiles so any waiter can recommend with confidence.",
  ctaDemo: "Request demo", ctaContact: "Talk to the team",
  heroSummary: "80% of restaurants with a wine list don't have a sommelier. Winerim fills that gap: it gives floor staff the tools to recommend wine professionally, increase average ticket and improve the guest experience without prior wine training.",

  forTitle: "Is Winerim right for your restaurant?", forLabel: "It's for you if...", notForLabel: "Probably not for you if...",
  forItems: [
    "You have a wine list but no full-time sommelier",
    "Your floor team doesn't feel confident recommending wine",
    "Many guests order 'the house wine' or cheapest option for lack of guidance",
    "You want to sell more wine without complicating operations",
    "You have 50+ references and need better rotation",
    "You want to elevate experience without hiring more specialist staff",
  ],
  notForItems: [
    "You have a permanent sommelier and don't need additional support",
    "Your list has fewer than 50 references and you don't want to optimize it",
    "You only need a nice PDF without sales or management features",
  ],

  painLabel: "The problem", painTitle1: "Wine stays on the list because ", painTitleHighlight: "nobody knows how to sell it",
  pains: [
    { text: "Floor staff don't have the time or knowledge to recommend wines. When guests ask, the answer is vague or evasive." },
    { text: "Insecurity about recommending makes waiters avoid suggesting wine. If they don't know what to say, they say nothing. Every table without a recommendation is a lost sale." },
    { text: "Guests face a list they don't understand: too many references, no context, no pairings, no guidance. They order the cheapest or skip wine entirely." },
    { text: "The restaurant loses margin because it sells less wine than it could, sells low-value references and doesn't use the list as an active sales tool." },
    { text: "Wine training is expensive, slow and lost with staff turnover. Every new waiter starts from scratch." },
    { text: "No data on which wines work, which stagnate or what impact each reference has. Purchase decisions are based on intuition." },
  ],

  tableLabel: "Comparison", tableTitle: "Static list vs Winerim",
  tableHeaders: ["Situation", "With a static list", "With Winerim"],
  tableRows: [
    { area: "Guest asks for help", without: "Waiter improvises or says 'they're all good'", with_w: "The list suggests by dish, style or budget" },
    { area: "New waiter starts", without: "Weeks to learn the list (if ever)", with_w: "Profiles, pairings and selling points from day one" },
    { area: "Table without wine order", without: "Nobody suggests, table stays wineless", with_w: "Smart recommendations invite exploration" },
    { area: "Non-rotating wines", without: "Nobody knows which until it's too late", with_w: "Rotation and performance alerts in real time" },
    { area: "International guest", without: "Can't understand the list, orders beer", with_w: "List in their language with clear descriptions" },
    { area: "Purchase decisions", without: "Bought by intuition or supplier relationship", with_w: "Rotation, margin and real performance data" },
    { area: "Wine margin", without: "Real margin per reference unknown", with_w: "Margin by wine, category and period visible" },
    { area: "Guest experience", without: "Generic, no personalization", with_w: "Personalized, educational, memorable" },
  ],

  solLabel: "The solution", solTitle1: "Your wine list becomes ", solTitleHighlight: "your best salesperson",
  advantages: [
    { title: "Recommendations without a sommelier", desc: "The list suggests wines to guests by dish, profile or moment. Your team doesn't need to be experts." },
    { title: "Wine profiles for your team", desc: "Each reference has tasting notes, origin, style and selling points in clear language. Waiters know what to say from day one." },
    { title: "Automatic pairings", desc: "By menu dish, cuisine type or guest preference. No memorization needed." },
    { title: "List in the guest's language", desc: "Automatic multi-language. International guests see the list in their language." },
    { title: "Data for better decisions", desc: "Which wines sell, which don't rotate, what margin each generates. Data-based purchasing." },
    { title: "Friction-free operations", desc: "Integrates with your workflow. Doesn't replace the team: it equips them. No training, no complexity." },
  ],

  howLabel: "Examples", howTitle: "How it works day-to-day",
  useCases: [
    { title: "Fine dining without a fixed sommelier", scenario: "80-reference list, rotating floor team. Waiters don't know every wine.", result: "Winerim gives guests dish pairings and waiters selling points. Wine ticket increases without intensive training." },
    { title: "Casual restaurant with a good list", scenario: "60 references, market cuisine. Wine is on the list but nobody actively suggests it.", result: "The digital list invites exploration: style recommendations, clear descriptions and automatic pairings. More tables order wine." },
    { title: "Hotel or resort restaurant", scenario: "International clientele, multiple shifts. Impossible to have a sommelier every shift.", result: "Multi-language list with smart recommendations. Guests understand the offer and staff have support for every table." },
  ],

  impactLabel: "Expected impact", impactTitle: "What changes when wine is actively sold",
  impactSubtitle: "Results restaurants using Winerim observe within the first weeks.",
  impacts: [
    { label: "More tables order wine", desc: "Smart recommendations invite exploration. Wine stops being a difficult decision." },
    { label: "Average ticket increases", desc: "Guests discover options they wouldn't have chosen alone. Less 'house wine', more value selling." },
    { label: "Team recommends confidently", desc: "Clear profiles and accessible pairings reduce insecurity. No expertise needed." },
    { label: "Fewer stagnant wines", desc: "Rotation alerts and performance data help move stock and renew the list with criteria." },
    { label: "Better guest experience", desc: "A list that guides, educates and personalizes elevates the restaurant's perception." },
    { label: "Smarter purchasing decisions", desc: "Real data on what works and what doesn't. Less intuition, more business criteria." },
  ],

  doesLabel: "What it does", doesTitle: "Winerim without sommelier: full transparency",
  doesItems: [
    "Suggests wines to guests by dish, style or budget",
    "Gives floor staff clear profiles, pairings and selling points",
    "Shows the list in the guest's language automatically",
    "Generates rotation, margin and performance data per reference",
    "Integrates without changing restaurant operations",
    "Works from day one without prior training",
  ],
  doesNotLabel: "What it doesn't do",
  doesNotItems: [
    "Doesn't replace human judgment: the team remains key",
    "Doesn't decide which wines to buy: provides data so you decide",
    "Isn't a wine course: it's a sales and management tool",
  ],

  ctaLabel: "No sommelier, with Winerim",
  ctaTitle: "Want your wine list to sell by itself?",
  ctaDesc: "We analyze your list and show you where sales, margin and experience opportunities are. No commitment.",
  ctaPrimary: "Request free analysis", ctaSecondary: "See demo",
  ctaMicro: "Especially useful for restaurants with 50+ references, no fixed sommelier or rotating floor staff.",

  faqs: [
    { q: "Does Winerim replace the sommelier?", a: "No. Winerim doesn't replace the sommelier — it fills the gap when there isn't one. It gives floor staff tools to recommend wine confidently: clear profiles, automatic pairings and smart recommendations." },
    { q: "Does the team need prior wine training?", a: "No. Winerim works from day one. Each wine profile includes selling points, tasting notes in plain language and pairings. A new waiter can recommend confidently from their first shift." },
    { q: "How many references do I need for it to make sense?", a: "From 50 references, Winerim adds clear value. Smaller lists can be managed manually, but beyond 50 the complexity grows and the tool makes a real difference." },
    { q: "What real impact does it have on sales?", a: "Restaurants using Winerim see more tables ordering wine, higher category ticket and fewer stagnant wines. Impact depends on context but improvements are usually visible within the first weeks." },
    { q: "Is it hard to implement?", a: "No. Activated in under 48 hours. Upload the list, configure pairings and it's operational." },
    { q: "Does the guest see the list in their language?", a: "Yes. Automatically in Spanish, English, Italian and French, with more languages in development." },
    { q: "What performance data can I see?", a: "Wine ticket, margin per reference and category, rotation, tables ordering wine ratio and monthly evolution." },
    { q: "Is there a lock-in?", a: "No lock-in or penalties. Start monthly and scale or cancel anytime." },
  ],
};

const IT: Content = { ...EN,
  metaTitle: "Winerim per Ristoranti senza Sommelier | Vendi Più Vino senza Esperto",
  metaDescription: "Il tuo team di sala consiglia il vino con sicurezza grazie a schede, abbinamenti e IA. Senza sommelier.",
  badgeLabel: "Senza sommelier, con criterio", breadSolutions: "Soluzioni", breadLabel: "Ristoranti senza sommelier",
  heroTitle1: "Vendi più vino senza dipendere da ", heroTitleHighlight: "un sommelier ad ogni tavolo",
  heroDesc: "Winerim trasforma la carta dei vini in un assistente di vendita che guida il team e il cliente.",
  ctaDemo: "Richiedi demo", ctaContact: "Parla con il team",
  ctaPrimary: "Richiedi analisi gratuita", ctaSecondary: "Vedi demo",
};

const FR: Content = { ...EN,
  metaTitle: "Winerim pour Restaurants sans Sommelier | Vendez Plus de Vin sans Expert",
  metaDescription: "Votre équipe de salle recommande le vin avec confiance grâce aux fiches, accords et IA. Sans sommelier.",
  badgeLabel: "Sans sommelier, avec méthode", breadSolutions: "Solutions", breadLabel: "Restaurants sans sommelier",
  heroTitle1: "Vendez plus de vin sans dépendre d'", heroTitleHighlight: "un sommelier à chaque table",
  heroDesc: "Winerim transforme votre carte des vins en un assistant de vente qui guide l'équipe et le client.",
  ctaDemo: "Demander une démo", ctaContact: "Parler à l'équipe",
  ctaPrimary: "Demander une analyse gratuite", ctaSecondary: "Voir la démo",
};

const content: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR };

const advIcons = [Sparkles, BookOpen, Utensils, Globe, BarChart3, CheckCircle];
const impactIcons = [Wine, TrendingUp, Users, Target, MessageSquare, DollarSign];
const ucIcons = [Wine, Utensils, Globe];

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════ */

const RestauranteSinSumiller = () => {
  const { lang, localePath } = useLanguage();
  const t = content[lang] || content.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "sin-sumiller-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.metaTitle,
      description: t.metaDescription,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.heroDesc,
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("sin-sumiller-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url="https://winerim.wine/soluciones/restaurantes-sin-sumiller" />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadSolutions, href: localePath("/soluciones") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <HelpCircle size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badgeLabel}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroTitleHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaDemo} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SUMMARY ── */}
      <section className="pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-wine/15 p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">{t.heroSummary}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOR / NOT FOR ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.forTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.forLabel}</p>
                <ul className="space-y-3">
                  {t.forItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.notForLabel}</p>
                <ul className="space-y-3">
                  {t.notForItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PAINS ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.painLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.painTitle1}<span className="text-gradient-wine italic">{t.painTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.pains.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABLE ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.tableLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.tableTitle}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left p-4 font-medium text-muted-foreground w-[22%]">{t.tableHeaders[0]}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground/60 w-[39%]">{t.tableHeaders[1]}</th>
                    <th className="text-left p-4 font-medium text-wine w-[39%]">{t.tableHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.tableRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="p-3 pl-4 font-medium text-foreground/80">{row.area}</td>
                      <td className="p-3 text-muted-foreground/60">{row.without}</td>
                      <td className="p-3 text-foreground/90">{row.with_w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.solTitle1}<span className="text-gradient-wine italic">{t.solTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.advantages.map((adv, i) => {
              const Icon = advIcons[i] || Wine;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.howLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.howTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => {
              const Icon = ucIcons[i] || Wine;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-sm font-bold">{uc.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{uc.scenario}</p>
                    <div className="mt-auto flex items-start gap-2 bg-wine/5 rounded-lg p-3">
                      <Sparkles size={13} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">{uc.result}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.impactLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.impactTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.impactSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.impacts.map((imp, i) => {
              const Icon = impactIcons[i] || TrendingUp;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{imp.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{imp.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── WINERIM SUPPLY ── */}
      <WinerimSupplyBlock />

      {/* ── DOES / DOESN'T ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.doesTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.doesLabel}</p>
                <ul className="space-y-3">
                  {t.doesItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.doesNotLabel}</p>
                <ul className="space-y-3">
                  {t.doesNotItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQSection faqs={t.faqs} schemaId="sin-sumiller" />

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 border border-border hover:border-wine/30 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all hover:-translate-y-0.5 text-muted-foreground hover:text-foreground">
                  {t.ctaSecondary}
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/60 max-w-lg mx-auto">{t.ctaMicro}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next Steps ── */}
      <NextSteps
        title={lang === "es" ? "Siguientes pasos" : "Next steps"}
        steps={[
          { to: "/analisis-carta", label: lang === "es" ? "Analiza tu carta de vinos" : "Analyze your wine list", description: lang === "es" ? "Diagnóstico gratuito con recomendaciones accionables." : "Free diagnosis with actionable recommendations.", type: "tool" },
          { to: "/guias/como-usar-winerim-sin-sumiller", label: lang === "es" ? "Guía: usar Winerim sin sumiller" : "Guide: use Winerim without a sommelier", description: lang === "es" ? "Paso a paso para sacar partido sin experto en sala." : "Step by step to get value without an expert.", type: "guide" },
          { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: lang === "es" ? "Guía: formar al equipo de sala" : "Guide: train floor staff", description: lang === "es" ? "Cómo tu equipo puede recomendar vino con criterio." : "How your team can recommend wine with criteria.", type: "guide" },
          { to: "/precios", label: lang === "es" ? "Planes y precios" : "Plans and pricing", description: lang === "es" ? "Desde el plan Starter para restaurantes independientes." : "From the Starter plan for independent restaurants.", type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: lang === "es" ? "Software de carta de vinos inteligente" : "Smart wine list software", type: "solution" },
        { to: localePath("/producto/inteligencia-dinamica"), label: lang === "es" ? "Inteligencia dinámica: IA táctica" : "Dynamic intelligence", type: "solution" },
        { to: localePath("/soluciones/aumentar-ticket-medio-restaurante"), label: lang === "es" ? "Aumentar ticket medio con datos" : "Increase average ticket", type: "guide" },
        { to: localePath("/vino-por-copa"), label: lang === "es" ? "Estrategia de vino por copa" : "By-the-glass strategy", type: "guide" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "solution" },
        { to: localePath("/funcionalidades"), label: lang === "es" ? "Todas las funcionalidades" : "All features", type: "solution" },
        { to: localePath("/soluciones/hoteles"), label: lang === "es" ? "Winerim para hoteles" : "Winerim for hotels", type: "solution" },
        { to: localePath("/comparativas"), label: lang === "es" ? "Compara Winerim con alternativas" : "Compare Winerim", type: "solution" },
      ]} />

      <Footer />
    </div>
  );
};

export default RestauranteSinSumiller;
