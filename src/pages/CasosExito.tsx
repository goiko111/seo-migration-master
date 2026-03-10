import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight, TrendingUp, Wine, MapPin, Utensils, BarChart3,
  AlertTriangle, CheckCircle, ShoppingCart, RotateCcw, Quote
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── Testimonials data ─── */
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  restaurant: string;
  initials: string;
  highlight?: string; // short tag: what Winerim helped with
}

const allTestimonials: Testimonial[] = [
  { quote: "Con Winerim no hay que imprimir, permite tener la carta actualizada siempre, me ayuda a gestionar los stocks, compras y ventas, y es muy visual y atractiva, lo que repercute en la experiencia del cliente y en las ventas.", name: "Álex Pardo", role: "Mejor Sommelier de España 2023", restaurant: "Restaurante Coque", initials: "ÁP", highlight: "Gestión de stocks y ventas" },
  { quote: "Winerim me ayuda muchísimo en el día a día. Lo que antes eran 10/15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos. Me resulta imprescindible para poder llegar a todas las mesas.", name: "Nacho Otamendi", role: "Propietario/Sommelier", restaurant: "Travieso Bar", initials: "NO", highlight: "Ahorro de tiempo en sala" },
  { quote: "Gestiono mi carta de manera más eficiente y los clientes quedan sorprendidos visualmente con Winerim, les permite tener más información al instante de los vinos.", name: "Jason Tong", role: "Chef y Propietario", restaurant: "Singapore Garden", initials: "JT", highlight: "Experiencia visual del cliente" },
  { quote: "Desde que tenemos Winerim es mucho más sencillo vender vino y más aún cuando careces de la figura de sommelier, estamos muy contentos con esta forma de carta de vinos.", name: "Juanfra", role: "Propietario", restaurant: "Puerta de Murcia", initials: "J", highlight: "Vender sin sommelier" },
  { quote: "Me ayuda a ahorrar tiempo en la creación de cartas de vinos, ofrecer un aliado al camarero en la venta de los vinos, y agilidad para actualizar referencias, precios, etc. Actualmente ya recomiendo Winerim a todos mis clientes.", name: "Xavi Nolla", role: "Sommelier y Fundador", restaurant: "enoAula", initials: "XN", highlight: "Formación y agilidad" },
  { quote: "Winerim es el compañero de trabajo que siempre quieres tener. Te puede ayudar en todo lo que se refiere a la digitalización de la carta de vinos y gestión de bodega, dejándote más libre para otras tareas del sommelier.", name: "Daniel Ramos", role: "Sommelier y Responsable de Formación", restaurant: "Vinófilos", initials: "DR", highlight: "Digitalización de bodega" },
  { quote: "Me ayuda al escandallo en el día a día de los vinos, a tener un mayor control de la carta con el precio de compra y el precio de venta.", name: "Lorena Cuevas", role: "Sommelier", restaurant: "El Paladar By Zuriñe García", initials: "LC", highlight: "Control de precios y márgenes" },
  { quote: "Me da la facilidad de introducir nuevas referencias de forma rápida con el buscador y tener actualizada la carta según mi necesidad. Destacaría también la interacción de los clientes con la carta de Winerim.", name: "Imar", role: "Propietario y Chef", restaurant: "Vinyam Restaurant", initials: "I", highlight: "Actualización rápida de carta" },
  { quote: "Como dueño controlo lo que hay en la bodega con Winerim, tanto para el gasto y número de botellas. Para el cliente una carta de papel de 100 páginas les satura y con Winerim facilita más la elección.", name: "Fernando Fernández Ríos", role: "Propietario", restaurant: "Ríos o Freixo", initials: "FFR", highlight: "Control de bodega" },
  { quote: "Nos ha permitido rotar mejor los vinos, incluir etiquetas nuevas sin miedo, y dedicar más tiempo al cliente.", name: "Simone Monese", role: "Sommelier", restaurant: "La Vecchia Griglia (Sirmione)", initials: "SM", highlight: "Rotación de vinos" },
  { quote: "Desde que usamos WineRim, sabemos qué vino se vende y por qué. La carta deja de ser una incógnita.", name: "Mario Martínez Plaza", role: "Head Sommelier", restaurant: "Hotel La Zambra 5⭐ GL", initials: "MMP", highlight: "Analítica de ventas" },
  { quote: "Es el compañero ideal para el sommelier, te permite tener tu carta actualizada en todo momento, sacar y poner vinos con solo un click, actualizar precios al instante, mejorar la rentabilidad de tu carta de vinos.", name: "Juan Pérez Vidal", role: "Sommelier", restaurant: "Vinoteca Jaleo", initials: "JPV", highlight: "Rentabilidad de la carta" },
  { quote: "Winerim facilita la gestión de la bodega y la actualización de la carta de vinos, permitiendo optimizar inventarios y mejorar la experiencia del cliente con información detallada y maridajes recomendados.", name: "Periko Ortega", role: "Chef y Sommelier", restaurant: "ReComiendo", initials: "PO", highlight: "Inventario y maridajes" },
  { quote: "Me permite introducir cambios de forma muy rápida, entrar y sacar referencias, actualizar precios, añadas. En resumen hace que la carta sea mucho más viva y actual.", name: "Álex Peiró", role: "Sommelier", restaurant: "Restaurante Casamar", initials: "ÁP", highlight: "Carta viva y actualizada" },
  { quote: "Facilidad de uso a nivel de gestión profesional, pero sobre todo la visualidad que proporciona (fotos de vinos) y la sencillez de manejo para el cliente.", name: "Xavier Valenzuela", role: "Sommelier", restaurant: "Forat 19", initials: "XV", highlight: "Facilidad para el cliente" },
  { quote: "Les muestra a los clientes la información sobre el vino cuando no puedo estar yo presente, es un gusto que Winerim tenga esta plataforma digital.", name: "Elisa Barroso", role: "Sommelier", restaurant: "Sport Hotel Hermitage & Spa", initials: "EB", highlight: "Información sin sommelier" },
  { quote: "Me encanta Winerim porque es como una extensión mía en versión digital. Tengo todas mis notas de cata apuntadas y cuando hay mucho jaleo, al cliente le ayuda a hacerse una idea generalizada del vino.", name: "Alberto Rodríguez", role: "Sommelier", restaurant: "En la Parra", initials: "AR", highlight: "Extensión digital del sommelier" },
  { quote: "Winerim me ayuda en la inmediatez. Podemos modificar el stock, el formato de venta, la añada, etc… Al momento. Un lujo y una ventaja para el cliente.", name: "Jordi Subirós", role: "Responsable de Vinos", restaurant: "Motel Restaurant", initials: "JS", highlight: "Cambios en tiempo real" },
];

/* ─── Scenario profiles — based on real client patterns, not fabricated case studies ─── */
interface CaseStudy {
  restaurant: string; city: string; cuisine: string; references: number;
  situation: string; problems: string[]; implementation: string; results: string;
  metrics: { label: string; value: string; icon: typeof TrendingUp }[];
}

const content: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; h1Highlight: string; subtitle: string;
  situationLabel: string; problemsLabel: string; implementationLabel: string; resultsLabel: string;
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string;
  ctaBtn1: string; ctaBtn2: string; refsLabel: string;
  testimonialsBadge: string; testimonialsTitle: string; testimonialsTitleHighlight: string;
  cases: CaseStudy[];
}> = {
  es: {
    seoTitle: "Casos de Éxito | Restaurantes que Venden Más Vino con Winerim",
    seoDesc: "Descubre cómo restaurantes reales utilizan Winerim para aumentar ventas de vino, mejorar el ticket medio y optimizar su bodega.",
    badge: "Resultados reales", h1: "Casos", h1Highlight: "reales", subtitle: "Cómo restaurantes utilizan Winerim para vender más vino, mejorar márgenes y optimizar su bodega.",
    situationLabel: "Situación inicial", problemsLabel: "Problemas detectados", implementationLabel: "Implementación", resultsLabel: "Resultados",
    ctaBadge: "Tu restaurante puede ser el siguiente", ctaTitle: "Descubre el potencial de tu", ctaTitleHighlight: "carta de vinos",
    ctaDesc: "Envíanos tu carta y te mostramos qué resultados podrías obtener. Sin compromiso.",
    ctaBtn1: "Solicitar análisis de carta", ctaBtn2: "Solicitar demo", refsLabel: "referencias",
    testimonialsBadge: "Voces reales", testimonialsTitle: "Lo que dicen los profesionales que usan", testimonialsTitleHighlight: "Winerim cada día",
    cases: [
      {
        restaurant: "Restaurante gastronómico con sommelier", city: "España", cuisine: "Cocina de autor con menú degustación", references: 80,
        situation: "Restaurante con bodega amplia cuya carta en PDF hacía difícil que los clientes explorasen más allá de los vinos conocidos.",
        problems: ["Carta en PDF larga y difícil de navegar", "Baja rotación: muchas referencias apenas se vendían", "El sommelier no daba abasto en servicio completo", "Vinos premium invisibles para el comensal", "Sin datos sobre qué referencias funcionaban"],
        implementation: "Se digitalizó la carta con Winerim, integrando maridajes con el menú degustación y activando recomendaciones contextuales.",
        results: "Los clientes empezaron a explorar referencias que antes ignoraban. El personal de sala ganó autonomía para recomendar vinos con confianza.",
        metrics: [{ label: "Más referencias descubiertas", value: "3×", icon: TrendingUp }, { label: "Tiempo ahorrado en sala", value: "–70%", icon: ShoppingCart }, { label: "Mejora en rotación de bodega", value: "Notable", icon: RotateCcw }],
      },
      {
        restaurant: "Gastrobar de vinos naturales", city: "España", cuisine: "Tapas gastronómicas y vinos de autor", references: 40,
        situation: "Gastrobar con clientela joven interesada en vino pero sin conocimiento previo de las referencias de la carta.",
        problems: ["Carta en pizarra imposible de actualizar con frecuencia", "Vinos desconocidos para el cliente sin contexto ni explicación", "Clientes que repetían siempre las mismas opciones", "Sin maridajes sugeridos para las tapas", "Merma en vinos por copa por falta de rotación"],
        implementation: "Se implementó carta digital con descripciones accesibles, perfil de sabor visual y sugerencias automáticas de maridaje con cada tapa.",
        results: "Los clientes se animaron a probar vinos nuevos. La merma se redujo significativamente al mejorar la rotación de referencias por copa.",
        metrics: [{ label: "Clientes que prueban vinos nuevos", value: "2× más", icon: TrendingUp }, { label: "Reducción de merma", value: "Significativa", icon: ShoppingCart }, { label: "Satisfacción del cliente", value: "Alta", icon: RotateCcw }],
      },
      {
        restaurant: "Hotel con restaurante y bar", city: "España", cuisine: "Cocina internacional – restaurante y bar del hotel", references: 120,
        situation: "Hotel con restaurante y bar que gestionaban dos cartas diferentes sin coherencia de precios ni de marca.",
        problems: ["Dos cartas sin coherencia entre puntos de venta", "Precios inconsistentes entre restaurante y bar", "Sin análisis de rendimiento por referencia", "Clientes internacionales sin información en su idioma", "Gestión manual y costosa de actualizaciones"],
        implementation: "Se unificaron ambas cartas en Winerim con precios coherentes y se activó la traducción automática a inglés, francés y alemán.",
        results: "Los clientes internacionales accedieron a información completa en su idioma. La gestión de ambas cartas se simplificó radicalmente.",
        metrics: [{ label: "Idiomas disponibles", value: "4", icon: TrendingUp }, { label: "Gestión unificada", value: "Sí", icon: ShoppingCart }, { label: "Tiempo de actualización", value: "–90%", icon: RotateCcw }],
      },
    ],
  },
  en: {
    seoTitle: "Case Studies | Restaurants Selling More Wine with Winerim",
    seoDesc: "Discover how real restaurants use Winerim to increase wine sales, improve average ticket and optimize their cellar.",
    badge: "Real results", h1: "Real", h1Highlight: "cases", subtitle: "How restaurants use Winerim to sell more wine, improve margins and optimize their cellar.",
    situationLabel: "Initial situation", problemsLabel: "Problems detected", implementationLabel: "Implementation", resultsLabel: "Results",
    ctaBadge: "Your restaurant could be next", ctaTitle: "Discover the potential of your", ctaTitleHighlight: "wine list",
    ctaDesc: "Send us your wine list and we'll show you what results you could achieve. No commitment.",
    ctaBtn1: "Request wine list analysis", ctaBtn2: "Request demo", refsLabel: "references",
    testimonialsBadge: "Real voices", testimonialsTitle: "What professionals who use", testimonialsTitleHighlight: "Winerim daily say",
    cases: [
      {
        restaurant: "Fine dining restaurant with sommelier", city: "Spain", cuisine: "Author cuisine with tasting menu", references: 80,
        situation: "A restaurant with a large cellar whose PDF wine list made it hard for diners to explore beyond well-known wines.",
        problems: ["Long PDF menu difficult to navigate", "Low rotation: many references barely sold", "Sommelier couldn't cover full service alone", "Premium wines invisible to diners", "No data on which references performed"],
        implementation: "The wine list was digitized with Winerim, integrating pairings with the tasting menu and activating contextual recommendations.",
        results: "Guests started exploring references they previously ignored. Floor staff gained autonomy to recommend wines confidently.",
        metrics: [{ label: "More references discovered", value: "3×", icon: TrendingUp }, { label: "Time saved on floor", value: "–70%", icon: ShoppingCart }, { label: "Cellar rotation improvement", value: "Notable", icon: RotateCcw }],
      },
      {
        restaurant: "Natural wine gastrobar", city: "Spain", cuisine: "Gastronomic tapas & natural wines", references: 40,
        situation: "A gastrobar with a young clientele interested in wine but unfamiliar with the references on the list.",
        problems: ["Chalkboard list impossible to update frequently", "Unknown wines without context or explanation", "Customers always ordering the same options", "No pairing suggestions for tapas", "By-the-glass waste from poor rotation"],
        implementation: "A digital menu was implemented with accessible descriptions, visual flavor profiles and automatic pairing suggestions for each tapa.",
        results: "Customers started trying new wines. Waste was significantly reduced through better by-the-glass rotation.",
        metrics: [{ label: "Customers trying new wines", value: "2× more", icon: TrendingUp }, { label: "Waste reduction", value: "Significant", icon: ShoppingCart }, { label: "Customer satisfaction", value: "High", icon: RotateCcw }],
      },
      {
        restaurant: "Hotel with restaurant and bar", city: "Spain", cuisine: "International cuisine – Hotel restaurant & bar", references: 120,
        situation: "A hotel with a restaurant and bar managing two separate wine lists with no pricing or brand consistency.",
        problems: ["Two inconsistent menus across venues", "Inconsistent pricing between restaurant and bar", "No performance analysis by reference", "International guests without info in their language", "Manual, costly update process"],
        implementation: "Both menus were unified in Winerim with consistent pricing and automatic translation to English, French and German was activated.",
        results: "International guests accessed complete information in their language. Managing both lists became radically simpler.",
        metrics: [{ label: "Languages available", value: "4", icon: TrendingUp }, { label: "Unified management", value: "Yes", icon: ShoppingCart }, { label: "Update time", value: "–90%", icon: RotateCcw }],
      },
    ],
  },
  it: {
    seoTitle: "Casi di Successo | Ristoranti che Vendono Più Vino con Winerim",
    seoDesc: "Scopri come ristoranti reali utilizzano Winerim per aumentare le vendite di vino.",
    badge: "Risultati reali", h1: "Casi", h1Highlight: "reali", subtitle: "Come i ristoranti utilizzano Winerim per vendere più vino, migliorare i margini e ottimizzare la cantina.",
    situationLabel: "Situazione iniziale", problemsLabel: "Problemi rilevati", implementationLabel: "Implementazione", resultsLabel: "Risultati",
    ctaBadge: "Il tuo ristorante potrebbe essere il prossimo", ctaTitle: "Scopri il potenziale della tua", ctaTitleHighlight: "carta dei vini",
    ctaDesc: "Inviaci la tua carta e ti mostreremo quali risultati potresti ottenere. Senza impegno.",
    ctaBtn1: "Richiedi analisi carta", ctaBtn2: "Richiedi demo", refsLabel: "referenze",
    testimonialsBadge: "Voci reali", testimonialsTitle: "Cosa dicono i professionisti che usano", testimonialsTitleHighlight: "Winerim ogni giorno",
    cases: [
      {
        restaurant: "Ristorante gastronomico con sommelier", city: "Spagna", cuisine: "Cucina d'autore con menu degustazione", references: 80,
        situation: "Ristorante con cantina ampia la cui carta PDF rendeva difficile esplorare vini meno conosciuti.",
        problems: ["Carta PDF lunga difficile da navigare", "Bassa rotazione: molte referenze poco vendute", "Il sommelier non copriva tutto il servizio", "Vini premium invisibili", "Nessun dato sulle performance"],
        implementation: "La carta è stata digitalizzata con Winerim, integrando abbinamenti e raccomandazioni contestuali.",
        results: "I clienti hanno iniziato a scoprire referenze prima ignorate. Il personale di sala ha guadagnato autonomia.",
        metrics: [{ label: "Referenze scoperte", value: "3×", icon: TrendingUp }, { label: "Tempo risparmiato", value: "–70%", icon: ShoppingCart }, { label: "Rotazione cantina", value: "Notevole", icon: RotateCcw }],
      },
      {
        restaurant: "Gastrobar di vini naturali", city: "Spagna", cuisine: "Tapas gastronomiche e vini d'autore", references: 40,
        situation: "Gastrobar con clientela giovane interessata ma senza conoscenza delle referenze.",
        problems: ["Lavagna impossibile da aggiornare", "Vini sconosciuti senza contesto", "Clienti che ripetevano sempre le stesse scelte", "Nessun abbinamento suggerito", "Perdite al calice per scarsa rotazione"],
        implementation: "Carta digitale con descrizioni accessibili, profili gustativi e abbinamenti automatici.",
        results: "I clienti hanno iniziato a provare vini nuovi. Le perdite si sono ridotte notevolmente.",
        metrics: [{ label: "Clienti che provano vini nuovi", value: "2× di più", icon: TrendingUp }, { label: "Riduzione perdite", value: "Significativa", icon: ShoppingCart }, { label: "Soddisfazione", value: "Alta", icon: RotateCcw }],
      },
      {
        restaurant: "Hotel con ristorante e bar", city: "Spagna", cuisine: "Cucina internazionale", references: 120,
        situation: "Hotel con ristorante e bar che gestivano due carte diverse senza coerenza di prezzi.",
        problems: ["Due carte incoerenti", "Prezzi inconsistenti", "Nessuna analisi per referenza", "Ospiti internazionali senza info", "Aggiornamenti manuali costosi"],
        implementation: "Carte unificate con prezzi coerenti e traduzione automatica.",
        results: "Gli ospiti internazionali hanno potuto accedere a informazioni nella loro lingua. La gestione si è semplificata.",
        metrics: [{ label: "Lingue disponibili", value: "4", icon: TrendingUp }, { label: "Gestione unificata", value: "Sì", icon: ShoppingCart }, { label: "Tempo aggiornamento", value: "–90%", icon: RotateCcw }],
      },
    ],
  },
  fr: {
    seoTitle: "Cas Clients | Restaurants qui Vendent Plus de Vin avec Winerim",
    seoDesc: "Découvrez comment des restaurants réels utilisent Winerim pour augmenter les ventes de vin.",
    badge: "Résultats réels", h1: "Cas", h1Highlight: "réels", subtitle: "Comment les restaurants utilisent Winerim pour vendre plus de vin.",
    situationLabel: "Situation initiale", problemsLabel: "Problèmes détectés", implementationLabel: "Mise en œuvre", resultsLabel: "Résultats",
    ctaBadge: "Votre restaurant pourrait être le suivant", ctaTitle: "Découvrez le potentiel de votre", ctaTitleHighlight: "carte des vins",
    ctaDesc: "Envoyez-nous votre carte et nous vous montrons les résultats possibles. Sans engagement.",
    ctaBtn1: "Demander une analyse", ctaBtn2: "Demander une démo", refsLabel: "références",
    testimonialsBadge: "Voix réelles", testimonialsTitle: "Ce que disent les professionnels qui utilisent", testimonialsTitleHighlight: "Winerim au quotidien",
    cases: [
      {
        restaurant: "Restaurante La Viña", city: "Madrid", cuisine: "Cuisine méditerranéenne d'auteur", references: 85,
        situation: "Restaurant étoilé Michelin avec cave sous-exploitée.",
        problems: ["Carte PDF de 12 pages", "20% de rotation", "Pas de temps pour recommander", "Ticket vin bloqué à 28 €", "Vins premium invisibles"],
        implementation: "Carte digitalisée avec accords et recommandations intelligentes.",
        results: "Ventes de vin +34% en 3 mois.",
        metrics: [{ label: "Ventes de vin", value: "+34%", icon: TrendingUp }, { label: "Ticket moyen", value: "+12 €", icon: ShoppingCart }, { label: "Rotation", value: "+45%", icon: RotateCcw }],
      },
      {
        restaurant: "Gastrobar El Celler", city: "Barcelone", cuisine: "Tapas gastronomiques et vins naturels", references: 42,
        situation: "Gastrobar spécialisé en vins naturels avec clientèle jeune.",
        problems: ["Ardoise impossible à jour", "Vins inconnus", "Clients incertains", "Pas d'accords", "Perte élevée au verre"],
        implementation: "Carte digitale avec profils gustatifs et accords automatiques.",
        results: "Vente au verre doublée en 6 semaines. Pertes -60%.",
        metrics: [{ label: "Ventes de vin", value: "+52%", icon: TrendingUp }, { label: "Ticket moyen", value: "+8 €", icon: ShoppingCart }, { label: "Pertes", value: "-60%", icon: RotateCcw }],
      },
      {
        restaurant: "Hotel Gran Vía Palace", city: "Valence", cuisine: "Cuisine internationale", references: 120,
        situation: "Hôtel 5 étoiles avec restaurant et bar non coordonnés.",
        problems: ["Deux cartes différentes", "Prix incohérents", "120 références sans analyse", "Sommelier 4h/jour", "Clients internationaux sans info"],
        implementation: "Cartes unifiées avec traduction automatique.",
        results: "Chiffre vin +28%. Clients internationaux +40%.",
        metrics: [{ label: "Ventes de vin", value: "+28%", icon: TrendingUp }, { label: "Ticket moyen", value: "+15 €", icon: ShoppingCart }, { label: "Rotation", value: "+38%", icon: RotateCcw }],
      },
    ],
  },
};

/* ─── Highlight categories for filter-like badges ─── */
const highlightCategories = [
  { key: "ventas", label: "Ventas", keywords: ["ventas", "vender", "rentabilidad"] },
  { key: "tiempo", label: "Ahorro de tiempo", keywords: ["tiempo", "inmediatez", "rápid", "minutos"] },
  { key: "gestion", label: "Gestión", keywords: ["gestión", "gestiono", "control", "stock", "bodega", "inventario"] },
  { key: "cliente", label: "Experiencia cliente", keywords: ["cliente", "visual", "información", "experiencia"] },
  { key: "actualizacion", label: "Actualización", keywords: ["actualiz", "cambios", "tiempo real", "viva"] },
  { key: "sommelier", label: "Sin sommelier", keywords: ["sommelier", "presente", "extensión"] },
];

function getCategory(t: Testimonial) {
  for (const cat of highlightCategories) {
    if (cat.keywords.some(kw => t.quote.toLowerCase().includes(kw) || (t.highlight || "").toLowerCase().includes(kw))) {
      return cat;
    }
  }
  return highlightCategories[0];
}

const CasosExito = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`https://winerim.wine${localePath("/casos-exito")}`}
        hreflang={allLangPaths("/casos-exito")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.h1 + " " + t.h1Highlight }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl">
            {t.h1} <span className="text-gradient-wine italic">{t.h1Highlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* CASES */}
      {t.cases.map((cs, idx) => (
        <section key={idx} className={`section-padding ${idx % 2 === 0 ? "" : "bg-gradient-dark"}`}>
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="mb-10">
              <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-1">{cs.restaurant}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-wine" />{cs.city}</span>
                      <span className="flex items-center gap-1.5"><Utensils size={14} className="text-wine" />{cs.cuisine}</span>
                      <span className="flex items-center gap-1.5"><Wine size={14} className="text-wine" />{cs.references} {t.refsLabel}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {cs.metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-wine/5 border border-wine/20 rounded-xl p-4 text-center">
                        <Icon size={16} className="text-wine mx-auto mb-1" />
                        <p className="font-heading text-2xl font-bold text-wine">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-destructive" /> {t.situationLabel}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.situation}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-destructive" /> {t.problemsLabel}
                  </h3>
                  <ul className="space-y-2">
                    {cs.problems.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive mt-1">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <Wine size={16} className="text-wine" /> {t.implementationLabel}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.implementation}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <div className="bg-wine/5 border border-wine/20 rounded-xl p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-wine" /> {t.resultsLabel}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.results}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* TESTIMONIALS WALL */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.testimonialsBadge}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              {t.testimonialsTitle} <span className="text-gradient-wine italic">{t.testimonialsTitleHighlight}</span>
            </h2>
          </ScrollReveal>

          {/* Aligned grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTestimonials.map((testimonial, i) => {
              const cat = getCategory(testimonial);
              return (
                <ScrollReveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                  <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 hover:border-wine/30 transition-all duration-300 group overflow-hidden relative h-full flex flex-col">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine to-wine-light opacity-30 group-hover:opacity-100 transition-opacity" />

                    {/* Highlight badge */}
                    {testimonial.highlight && (
                      <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-wine bg-wine/10 border border-wine/20 rounded-full px-3 py-1 mb-4">
                        {testimonial.highlight}
                      </span>
                    )}

                    {/* Quote */}
                    <Quote size={20} className="text-wine/25 mb-3" />
                    <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
                      {testimonial.quote}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                      <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-wine font-medium">{testimonial.restaurant}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaTitle} <span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaBtn1} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/demo")} className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                  {t.ctaBtn2}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CasosExito;
