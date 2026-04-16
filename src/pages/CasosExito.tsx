import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import RealCaseCard, { type RealCase } from "@/components/cases/RealCaseCard";
import ScenarioCard, { type Scenario } from "@/components/cases/ScenarioCard";
import { useLanguage } from "@/i18n/LanguageContext";

/* ═══════════════════════════════════════════════════════
   DATA — Spanish only shown in full; other langs follow same structure
   ═══════════════════════════════════════════════════════ */

const realCases: Record<string, RealCase[]> = {
  es: [
    {
      name: "Álex Pardo", role: "Mejor Sommelier de España 2023", restaurant: "Restaurante Coque", initials: "ÁP",
      city: "Madrid", cuisine: "Cocina de autor", references: 350, badge: "2 Estrellas Michelin",
      highlight: "Gestión de stocks y ventas",
      situation: "Bodega amplia con carta impresa que requería reimpresiones constantes y no permitía al equipo de sala explorar referencias menos conocidas.",
      problem: "Control de stocks manual, dificultad para actualizar precios y añadas, y falta de datos sobre qué referencias se vendían más.",
      implementation: "Digitalización completa con Winerim: carta siempre actualizada, integración de stocks, compras y ventas en un único panel.",
      impact: "Eliminación de impresiones, carta siempre al día, mejor visibilidad de stocks y un impacto directo en la experiencia del cliente y las ventas.",
      quote: "Con Winerim no hay que imprimir, permite tener la carta actualizada siempre, me ayuda a gestionar los stocks, compras y ventas, y es muy visual y atractiva, lo que repercute en la experiencia del cliente y en las ventas.",
    },
    {
      name: "Nacho Otamendi", role: "Propietario/Sommelier", restaurant: "Travieso Bar", initials: "NO",
      city: "España", cuisine: "Bar de vinos / Gastrobar", badge: "Gastrobar",
      highlight: "Ahorro de tiempo en sala",
      situation: "Restaurante con carta de vinos rica pero con un solo sommelier que no podía atender todas las mesas durante los momentos de mayor afluencia.",
      problem: "10-15 minutos por mesa para explicar la carta, lo que limitaba la capacidad de servicio y las ventas de vino en horas punta.",
      implementation: "Carta digital con fichas visuales, descripciones accesibles y recomendaciones que el cliente puede explorar autónomamente.",
      impact: "El tiempo de explicación de la carta bajó de 10-15 minutos a 3 minutos. El sommelier ahora llega a todas las mesas.",
      quote: "Winerim me ayuda muchísimo en el día a día. Lo que antes eran 10/15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos. Me resulta imprescindible para poder llegar a todas las mesas.",
    },
    {
      name: "Juanfra", role: "Propietario", restaurant: "Puerta de Murcia", initials: "J",
      city: "España", cuisine: "Restaurante sin sommelier", badge: "Sin sommelier",
      highlight: "Vender sin sommelier",
      situation: "Restaurante sin figura de sommelier donde la venta de vino dependía exclusivamente de la iniciativa del camarero.",
      problem: "El equipo de sala no tenía formación en vinos, lo que provocaba que los clientes eligieran siempre opciones seguras y de bajo valor.",
      implementation: "Winerim como asistente de sala: descripciones claras, sugerencias contextuales y maridajes que cualquier camarero puede compartir.",
      impact: "La venta de vino se simplificó notablemente. El equipo de sala recomienda con confianza sin necesidad de un sommelier.",
      quote: "Desde que tenemos Winerim es mucho más sencillo vender vino y más aún cuando careces de la figura de sommelier, estamos muy contentos con esta forma de carta de vinos.",
    },
    {
      name: "Mario Martínez Plaza", role: "Head Sommelier", restaurant: "Hotel La Zambra 5⭐ GL", initials: "MMP",
      city: "Málaga", cuisine: "Hotel 5 estrellas Gran Lujo", badge: "Hotel 5⭐ GL",
      highlight: "Analítica de ventas",
      situation: "Hotel de lujo con una carta de vinos extensa donde la dirección no tenía visibilidad sobre qué vinos se vendían ni por qué.",
      problem: "Sin datos de ventas por referencia, sin métricas de rotación y decisiones de compra basadas en intuición en lugar de datos.",
      implementation: "Panel analítico de Winerim con datos de venta por referencia, rotación y tendencias de consumo.",
      impact: "Visibilidad completa sobre qué vinos se venden y por qué. Las decisiones de compra y pricing se basan ahora en datos reales.",
      quote: "Desde que usamos WineRim, sabemos qué vino se vende y por qué. La carta deja de ser una incógnita.",
    },
    {
      name: "Fernando Fernández Ríos", role: "Propietario", restaurant: "Ríos o Freixo", initials: "FFR",
      city: "Galicia", cuisine: "Restaurante tradicional", badge: "Restaurante tradicional",
      highlight: "Control de bodega",
      situation: "Restaurante con una carta de papel de más de 100 páginas que saturaba a los clientes y hacía imposible el control real de la bodega.",
      problem: "Los clientes se abrumaban con la carta. El propietario no tenía visibilidad sobre el gasto ni el número de botellas en bodega.",
      implementation: "Carta digital que facilita la elección del cliente y panel de control de bodega con gasto y stock por referencia.",
      impact: "Los clientes eligen con más facilidad y el propietario controla la bodega en tiempo real: gasto, botellas y rotación.",
      quote: "Como dueño controlo lo que hay en la bodega con Winerim, tanto para el gasto y número de botellas. Para el cliente una carta de papel de 100 páginas les satura y con Winerim facilita más la elección.",
    },
    {
      name: "Lorena Cuevas", role: "Sommelier", restaurant: "El Paladar By Zuriñe García", initials: "LC",
      city: "España", cuisine: "Restaurante gastronómico", badge: "Gastronómico",
      highlight: "Control de precios y márgenes",
      situation: "Restaurante donde el escandallo de vinos se hacía en hojas de cálculo dispersas y no había visibilidad inmediata del margen por referencia.",
      problem: "Calcular el precio de venta y controlar el margen era un proceso manual lento, con riesgo de errores en cada actualización.",
      implementation: "Winerim centraliza precios de compra, venta y márgenes por referencia, con actualización inmediata.",
      impact: "El escandallo diario es automático. La sommelier tiene control instantáneo de la relación entre precio de compra y venta.",
      quote: "Me ayuda al escandallo en el día a día de los vinos, a tener un mayor control de la carta con el precio de compra y el precio de venta.",
    },
  ],
  en: [
    {
      name: "Álex Pardo", role: "Best Sommelier of Spain 2023", restaurant: "Restaurante Coque", initials: "ÁP",
      city: "Madrid", cuisine: "Author cuisine", references: 350, badge: "2 Michelin Stars",
      highlight: "Stock & sales management",
      situation: "Large cellar with a printed list requiring constant reprints, making it hard for the floor team to explore lesser-known references.",
      problem: "Manual stock control, difficulty updating prices and vintages, and no data on which references sold best.",
      implementation: "Full digitization with Winerim: always-updated list, stock, purchasing and sales integrated in one panel.",
      impact: "No more printing, list always up to date, better stock visibility and a direct impact on guest experience and sales.",
      quote: "With Winerim there's no need to print, it keeps the list always updated, helps me manage stocks, purchases and sales, and it's very visual and attractive, which impacts the customer experience and sales.",
    },
    {
      name: "Nacho Otamendi", role: "Owner/Sommelier", restaurant: "Travieso Bar", initials: "NO",
      city: "Spain", cuisine: "Wine bar / Gastrobar", badge: "Gastrobar",
      highlight: "Time saved on floor",
      situation: "Restaurant with a rich wine list but only one sommelier who couldn't attend every table during peak hours.",
      problem: "10-15 minutes per table to explain the list, limiting service capacity and wine sales at peak times.",
      implementation: "Digital list with visual cards, accessible descriptions and recommendations guests can explore on their own.",
      impact: "Explanation time dropped from 10-15 minutes to 3 minutes. The sommelier now reaches every table.",
      quote: "Winerim helps me enormously day to day. What used to be 10/15 minutes to explain the list, now with Winerim in 3 minutes they already have a full overview. It's essential for me to reach every table.",
    },
    {
      name: "Mario Martínez Plaza", role: "Head Sommelier", restaurant: "Hotel La Zambra 5⭐ GL", initials: "MMP",
      city: "Málaga", cuisine: "5-star Grand Luxury Hotel", badge: "Hotel 5⭐ GL",
      highlight: "Sales analytics",
      situation: "Luxury hotel with an extensive wine list where management had no visibility into which wines sold or why.",
      problem: "No sales data by reference, no rotation metrics, purchasing decisions based on intuition instead of data.",
      implementation: "Winerim analytics panel with sales data by reference, rotation and consumption trends.",
      impact: "Full visibility into which wines sell and why. Purchasing and pricing decisions are now data-driven.",
      quote: "Since using Winerim, we know which wine sells and why. The list is no longer a mystery.",
    },
  ],
  it: [
    {
      name: "Álex Pardo", role: "Miglior Sommelier di Spagna 2023", restaurant: "Restaurante Coque", initials: "ÁP",
      city: "Madrid", cuisine: "Cucina d'autore", references: 350, badge: "2 Stelle Michelin",
      highlight: "Gestione stock e vendite",
      situation: "Cantina ampia con carta stampata che richiedeva ristampe costanti.",
      problem: "Controllo stock manuale, aggiornamento prezzi e annate difficile, nessun dato sulle vendite.",
      implementation: "Digitalizzazione completa con Winerim: carta sempre aggiornata, stock e vendite in un unico pannello.",
      impact: "Niente più stampe, carta sempre aggiornata, migliore visibilità dello stock e impatto diretto sulle vendite.",
      quote: "Con Winerim non c'è bisogno di stampare, la carta è sempre aggiornata, gestisco stock, acquisti e vendite.",
    },
    {
      name: "Nacho Otamendi", role: "Proprietario/Sommelier", restaurant: "Travieso Bar", initials: "NO",
      city: "Spagna", cuisine: "Wine bar / Gastrobar",
      highlight: "Tempo risparmiato in sala",
      situation: "Ristorante con carta ricca ma un solo sommelier che non riusciva a seguire tutti i tavoli.",
      problem: "10-15 minuti per tavolo per spiegare la carta, limitando il servizio nelle ore di punta.",
      implementation: "Carta digitale con schede visive e raccomandazioni che il cliente esplora autonomamente.",
      impact: "Il tempo di spiegazione è passato da 10-15 minuti a 3 minuti.",
      quote: "Winerim mi aiuta enormemente. Quello che prima erano 10/15 minuti, ora in 3 minuti hanno una visione globale.",
    },
  ],
  fr: [
    {
      name: "Álex Pardo", role: "Meilleur Sommelier d'Espagne 2023", restaurant: "Restaurante Coque", initials: "ÁP",
      city: "Madrid", cuisine: "Cuisine d'auteur", references: 350, badge: "2 Étoiles Michelin",
      highlight: "Gestion des stocks et ventes",
      situation: "Grande cave avec carte imprimée nécessitant des réimpressions constantes.",
      problem: "Contrôle des stocks manuel, mise à jour des prix difficile, aucune donnée sur les ventes.",
      implementation: "Digitalisation complète avec Winerim : carte toujours à jour, stocks et ventes dans un seul panneau.",
      impact: "Plus d'impressions, carte toujours à jour, meilleure visibilité des stocks et impact direct sur les ventes.",
      quote: "Avec Winerim, pas besoin d'imprimer, la carte est toujours à jour, je gère les stocks, achats et ventes.",
    },
    {
      name: "Nacho Otamendi", role: "Propriétaire/Sommelier", restaurant: "Travieso Bar", initials: "NO",
      city: "Espagne", cuisine: "Bar à vins / Gastrobar",
      highlight: "Temps gagné en salle",
      situation: "Restaurant avec une carte riche mais un seul sommelier qui ne pouvait pas servir toutes les tables.",
      problem: "10-15 minutes par table pour expliquer la carte, limitant le service aux heures de pointe.",
      implementation: "Carte digitale avec fiches visuelles et recommandations que le client explore seul.",
      impact: "Le temps d'explication est passé de 10-15 minutes à 3 minutes.",
      quote: "Winerim m'aide énormément. Ce qui prenait 10/15 minutes, maintenant en 3 minutes ils ont une vision globale.",
    },
  ],
};

const scenarios: Record<string, Scenario[]> = {
  es: [
    {
      profile: "Restaurante gastronómico con sommelier",
      cuisine: "Cocina de autor con menú degustación", references: 80,
      pain: "La carta en PDF impide que los comensales descubran vinos premium. Baja rotación y el sommelier no da abasto en servicio completo.",
      howWinerimHelps: "Carta digital con maridajes integrados al menú degustación, recomendaciones contextuales y visibilidad de toda la bodega para el equipo.",
      indicators: ["Descubrimiento de referencias premium", "Rotación de bodega", "Autonomía del equipo de sala", "Tiempo de atención por mesa"],
      ctaUrl: "/demo", ctaLabel: "Solicitar demo para restaurante gastronómico",
    },
    {
      profile: "Gastrobar de vinos naturales",
      cuisine: "Tapas gastronómicas y vinos de autor", references: 40,
      pain: "Vinos desconocidos para el cliente sin contexto ni explicación. La pizarra no permite actualizar con frecuencia. Merma en vinos por copa.",
      howWinerimHelps: "Descripciones accesibles con perfil de sabor visual, sugerencias automáticas de maridaje y rotación inteligente de vinos por copa.",
      indicators: ["Clientes que prueban vinos nuevos", "Reducción de merma por copa", "Satisfacción y repetición de visitas"],
      ctaUrl: "/demo", ctaLabel: "Solicitar demo para gastrobar",
    },
    {
      profile: "Hotel con restaurante y bar",
      cuisine: "Cocina internacional — restaurante y bar del hotel", references: 120,
      pain: "Dos cartas sin coherencia de precios ni marca. Clientes internacionales sin información en su idioma. Gestión manual costosa.",
      howWinerimHelps: "Unificación de cartas con precios coherentes, traducción automática a 4 idiomas y gestión centralizada de ambos puntos de venta.",
      indicators: ["Coherencia de precios entre puntos de venta", "Acceso en idioma del huésped", "Tiempo de actualización de carta"],
      ctaUrl: "/demo", ctaLabel: "Solicitar demo para hotel",
    },
  ],
  en: [
    {
      profile: "Fine dining restaurant with sommelier",
      cuisine: "Author cuisine with tasting menu", references: 80,
      pain: "PDF list prevents guests from discovering premium wines. Low rotation and the sommelier can't cover full service.",
      howWinerimHelps: "Digital list with pairings integrated into the tasting menu, contextual recommendations and full cellar visibility.",
      indicators: ["Premium reference discovery", "Cellar rotation", "Floor staff autonomy", "Time per table"],
      ctaUrl: "/demo", ctaLabel: "Request demo for fine dining",
    },
    {
      profile: "Natural wine gastrobar",
      cuisine: "Gastronomic tapas & natural wines", references: 40,
      pain: "Unknown wines without context. Chalkboard can't be updated often. By-the-glass waste from poor rotation.",
      howWinerimHelps: "Accessible descriptions with visual flavor profiles, automatic pairing suggestions and smart by-the-glass rotation.",
      indicators: ["Customers trying new wines", "By-the-glass waste reduction", "Guest satisfaction & repeat visits"],
      ctaUrl: "/demo", ctaLabel: "Request demo for gastrobar",
    },
    {
      profile: "Hotel with restaurant and bar",
      cuisine: "International cuisine — hotel restaurant & bar", references: 120,
      pain: "Two inconsistent lists with no pricing or brand coherence. International guests without info in their language.",
      howWinerimHelps: "Unified lists with consistent pricing, automatic translation to 4 languages and centralized management.",
      indicators: ["Pricing consistency across venues", "Guest-language access", "Update time"],
      ctaUrl: "/demo", ctaLabel: "Request demo for hotel",
    },
  ],
  it: [
    {
      profile: "Ristorante gastronomico con sommelier",
      cuisine: "Cucina d'autore con menu degustazione", references: 80,
      pain: "La carta PDF impedisce ai clienti di scoprire vini premium. Bassa rotazione e il sommelier non riesce a coprire tutto.",
      howWinerimHelps: "Carta digitale con abbinamenti, raccomandazioni contestuali e visibilità completa della cantina.",
      indicators: ["Scoperta referenze premium", "Rotazione cantina", "Autonomia del personale"],
      ctaUrl: "/demo", ctaLabel: "Richiedi demo per ristorante gastronomico",
    },
  ],
  fr: [
    {
      profile: "Restaurant gastronomique avec sommelier",
      cuisine: "Cuisine d'auteur avec menu dégustation", references: 80,
      pain: "La carte PDF empêche les clients de découvrir les vins premium. Faible rotation.",
      howWinerimHelps: "Carte digitale avec accords mets-vins, recommandations contextuelles et visibilité complète de la cave.",
      indicators: ["Découverte de références premium", "Rotation cave", "Autonomie du personnel"],
      ctaUrl: "/demo", ctaLabel: "Demander une démo pour restaurant gastronomique",
    },
  ],
};

/* ─── Additional testimonials (not structured as full cases) ─── */
const extraTestimonials: { quote: string; name: string; role: string; restaurant: string; initials: string; highlight: string }[] = [
  { quote: "Gestiono mi carta de manera más eficiente y los clientes quedan sorprendidos visualmente con Winerim.", name: "Jason Tong", role: "Chef y Propietario", restaurant: "Singapore Garden", initials: "JT", highlight: "Experiencia visual" },
  { quote: "Me ayuda a ahorrar tiempo en la creación de cartas de vinos, ofrecer un aliado al camarero en la venta de los vinos.", name: "Xavi Nolla", role: "Sommelier y Fundador", restaurant: "enoAula", initials: "XN", highlight: "Formación y agilidad" },
  { quote: "Winerim es el compañero de trabajo que siempre quieres tener. Te puede ayudar en todo lo que se refiere a la digitalización de la carta de vinos y gestión de bodega.", name: "Daniel Ramos", role: "Sommelier y Responsable de Formación", restaurant: "Vinófilos", initials: "DR", highlight: "Digitalización de bodega" },
  { quote: "Me da la facilidad de introducir nuevas referencias de forma rápida con el buscador y tener actualizada la carta según mi necesidad.", name: "Imar", role: "Propietario y Chef", restaurant: "Vinyam Restaurant", initials: "I", highlight: "Actualización rápida" },
  { quote: "Nos ha permitido rotar mejor los vinos, incluir etiquetas nuevas sin miedo, y dedicar más tiempo al cliente.", name: "Simone Monese", role: "Sommelier", restaurant: "La Vecchia Griglia", initials: "SM", highlight: "Rotación de vinos" },
  { quote: "Es el compañero ideal para el sommelier, te permite tener tu carta actualizada en todo momento.", name: "Juan Pérez Vidal", role: "Sommelier", restaurant: "Vinoteca Jaleo", initials: "JPV", highlight: "Rentabilidad" },
  { quote: "Les muestra a los clientes la información sobre el vino cuando no puedo estar yo presente.", name: "Elisa Barroso", role: "Sommelier", restaurant: "Sport Hotel Hermitage & Spa", initials: "EB", highlight: "Información sin sommelier" },
  { quote: "Es como una extensión mía en versión digital. Tengo todas mis notas de cata apuntadas.", name: "Alberto Rodríguez", role: "Sommelier", restaurant: "En la Parra", initials: "AR", highlight: "Extensión digital" },
  { quote: "Podemos modificar el stock, el formato de venta, la añada, etc… Al momento. Un lujo y una ventaja para el cliente.", name: "Jordi Subirós", role: "Responsable de Vinos", restaurant: "Motel Restaurant", initials: "JS", highlight: "Cambios en tiempo real" },
  { quote: "Winerim facilita la gestión de la bodega y la actualización de la carta de vinos, permitiendo optimizar inventarios.", name: "Periko Ortega", role: "Chef y Sommelier", restaurant: "ReComiendo", initials: "PO", highlight: "Inventario y maridajes" },
  { quote: "Facilidad de uso a nivel de gestión profesional, pero sobre todo la visualidad que proporciona y la sencillez de manejo para el cliente.", name: "Xavier Valenzuela", role: "Sommelier", restaurant: "Forat 19", initials: "XV", highlight: "Facilidad para el cliente" },
  { quote: "Me permite introducir cambios de forma muy rápida, entrar y sacar referencias, actualizar precios, añadas. En resumen hace que la carta sea mucho más viva y actual.", name: "Álex Peiró", role: "Sommelier", restaurant: "Restaurante Casamar", initials: "ÁP", highlight: "Carta viva" },
];

/* ─── Labels per language ─── */
const labels: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; h1Highlight: string; subtitle: string;
  realTitle: string; realTitleHighlight: string; realDesc: string;
  scenarioTitle: string; scenarioTitleHighlight: string; scenarioDesc: string;
  voicesTitle: string; voicesTitleHighlight: string;
  situation: string; problem: string; implementation: string; impact: string; refs: string;
  scenarioBadge: string; painLabel: string; helpLabel: string; indicatorsLabel: string;
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string; ctaBtn1: string; ctaBtn2: string;
  faqs: { q: string; a: string }[];
}> = {
  es: {
    seoTitle: "Casos de Éxito | Restaurantes que Usan Winerim",
    seoDesc: "Descubre cómo restaurantes con Estrella Michelin y grupos de restauración venden más vino con Winerim. Casos reales con resultados.",
    badge: "Casos de éxito",
    h1: "Casos de éxito — Restaurantes que venden más vino con",
    h1Highlight: "Winerim",
    subtitle: "Testimonios verificados de profesionales que usan Winerim. Descubre cómo restaurantes con Estrella Michelin, hoteles de lujo y gastrobares mejoran sus ventas de vino.",
    realTitle: "Casos reales con",
    realTitleHighlight: "testimonios verificados",
    realDesc: "Cada caso incluye la situación inicial, el problema, la implementación y el impacto observado, junto con una cita validada por el profesional.",
    scenarioTitle: "Escenarios tipo basados en",
    scenarioTitleHighlight: "patrones reales",
    scenarioDesc: "Perfiles de negocio frecuentes donde Winerim puede ayudar. No son casos de éxito individuales — son patrones habituales con indicadores de mejora potencial.",
    voicesTitle: "Más voces de profesionales que usan",
    voicesTitleHighlight: "Winerim cada día",
    situation: "Situación", problem: "Problema", implementation: "Implementación", impact: "Impacto", refs: "referencias",
    scenarioBadge: "Escenario tipo", painLabel: "Dolor habitual", helpLabel: "Cómo ayuda Winerim", indicatorsLabel: "Indicadores que puede mejorar",
    ctaBadge: "Tu restaurante puede ser el siguiente", ctaTitle: "¿Quieres resultados similares? Solicita tu", ctaTitleHighlight: "análisis gratuito",
    ctaDesc: "Envíanos tu carta y te mostramos qué resultados podrías obtener con Winerim. Sin compromiso.",
    ctaBtn1: "Solicitar análisis gratuito", ctaBtn2: "Solicitar demo",
    faqs: [
      { q: "¿Los casos mostrados son de clientes reales?", a: "Sí. Los casos reales incluyen nombre, cargo y restaurante verificado, con citas textuales del profesional. Los escenarios tipo están etiquetados como tal y representan patrones frecuentes, no clientes individuales." },
      { q: "¿Qué resultados puedo esperar con Winerim?", a: "Los resultados varían según el restaurante. El potencial estimado de mejora en ticket medio de vino oscila entre un 15 % y un 25 %, según contexto e implementación. Los casos reales aquí ilustran resultados observados." },
      { q: "¿Winerim funciona para restaurantes sin sommelier?", a: "Sí. Varios de los casos reales mostrados son de restaurantes sin sommelier, donde Winerim actúa como asistente inteligente para el equipo de sala." },
      { q: "¿Cómo puedo probar Winerim con mi carta?", a: "Envía tu carta en cualquier formato (PDF, foto, Excel) y te preparamos una demo personalizada gratuita con tus referencias reales." },
    ],
  },
  en: {
    seoTitle: "Real Cases & Scenario Profiles | Winerim",
    seoDesc: "Verified testimonials from professionals using Winerim, plus scenario profiles showing how Winerim helps different business types.",
    badge: "Real evidence + Scenario profiles",
    h1: "Real cases & scenario",
    h1Highlight: "profiles",
    subtitle: "Verified testimonials from professionals using Winerim and scenario profiles based on real restaurant patterns.",
    realTitle: "Real cases with",
    realTitleHighlight: "verified testimonials",
    realDesc: "Each case includes the initial situation, problem, implementation and observed impact, with a validated quote.",
    scenarioTitle: "Scenario profiles based on",
    scenarioTitleHighlight: "real patterns",
    scenarioDesc: "Common business profiles where Winerim can help. These are not individual case studies — they are typical patterns with potential improvement indicators.",
    voicesTitle: "More voices from professionals using",
    voicesTitleHighlight: "Winerim daily",
    situation: "Situation", problem: "Problem", implementation: "Implementation", impact: "Impact", refs: "references",
    scenarioBadge: "Scenario profile", painLabel: "Typical pain", helpLabel: "How Winerim helps", indicatorsLabel: "Improvable indicators",
    ctaBadge: "Your restaurant could be next", ctaTitle: "Discover the potential of your", ctaTitleHighlight: "wine list",
    ctaDesc: "Send us your list and we'll show you what results you could achieve. No commitment.",
    ctaBtn1: "Request wine list analysis", ctaBtn2: "Request demo",
    faqs: [
      { q: "Are the cases shown from real clients?", a: "Yes. Real cases include verified name, role and restaurant with direct quotes. Scenario profiles are labeled as such and represent common patterns, not individual clients." },
      { q: "What results can I expect?", a: "Results vary by restaurant. Estimated potential improvement in wine average ticket ranges between 15% and 25%, depending on context." },
      { q: "Does Winerim work without a sommelier?", a: "Yes. Several real cases shown are from restaurants without a sommelier, where Winerim acts as an intelligent assistant for the floor team." },
    ],
  },
  it: {
    seoTitle: "Casi Reali e Scenari Tipo | Winerim",
    seoDesc: "Testimonianze verificate di professionisti che usano Winerim e scenari tipo basati su pattern reali.",
    badge: "Evidenza reale + Scenari tipo",
    h1: "Casi reali e scenari",
    h1Highlight: "tipo",
    subtitle: "Testimonianze verificate di professionisti e scenari basati su pattern reali di ristoranti e hotel.",
    realTitle: "Casi reali con",
    realTitleHighlight: "testimonianze verificate",
    realDesc: "Ogni caso include situazione, problema, implementazione e impatto, con citazione validata.",
    scenarioTitle: "Scenari tipo basati su",
    scenarioTitleHighlight: "pattern reali",
    scenarioDesc: "Profili di business frequenti. Non sono casi individuali — sono pattern con indicatori di miglioramento potenziale.",
    voicesTitle: "Altre voci di professionisti che usano",
    voicesTitleHighlight: "Winerim ogni giorno",
    situation: "Situazione", problem: "Problema", implementation: "Implementazione", impact: "Impatto", refs: "referenze",
    scenarioBadge: "Scenario tipo", painLabel: "Dolore abituale", helpLabel: "Come aiuta Winerim", indicatorsLabel: "Indicatori migliorabili",
    ctaBadge: "Il tuo ristorante potrebbe essere il prossimo", ctaTitle: "Scopri il potenziale della tua", ctaTitleHighlight: "carta dei vini",
    ctaDesc: "Inviaci la tua carta e ti mostriamo i risultati possibili. Senza impegno.",
    ctaBtn1: "Richiedi analisi carta", ctaBtn2: "Richiedi demo",
    faqs: [
      { q: "I casi mostrati sono di clienti reali?", a: "Sì. I casi reali includono nome, ruolo e ristorante verificato. Gli scenari tipo sono etichettati come tali." },
      { q: "Winerim funziona senza sommelier?", a: "Sì. Diversi casi reali sono di ristoranti senza sommelier." },
    ],
  },
  fr: {
    seoTitle: "Cas Réels et Scénarios Types | Winerim",
    seoDesc: "Témoignages vérifiés de professionnels utilisant Winerim et scénarios types basés sur des patterns réels.",
    badge: "Évidence réelle + Scénarios types",
    h1: "Cas réels et scénarios",
    h1Highlight: "types",
    subtitle: "Témoignages vérifiés de professionnels et scénarios basés sur des patterns réels de restaurants et hôtels.",
    realTitle: "Cas réels avec",
    realTitleHighlight: "témoignages vérifiés",
    realDesc: "Chaque cas inclut la situation, le problème, l'implémentation et l'impact, avec une citation validée.",
    scenarioTitle: "Scénarios types basés sur",
    scenarioTitleHighlight: "des patterns réels",
    scenarioDesc: "Profils de business fréquents. Ce ne sont pas des cas individuels — ce sont des patterns avec indicateurs d'amélioration potentielle.",
    voicesTitle: "D'autres voix de professionnels utilisant",
    voicesTitleHighlight: "Winerim au quotidien",
    situation: "Situation", problem: "Problème", implementation: "Mise en œuvre", impact: "Impact", refs: "références",
    scenarioBadge: "Scénario type", painLabel: "Douleur habituelle", helpLabel: "Comment Winerim aide", indicatorsLabel: "Indicateurs améliorables",
    ctaBadge: "Votre restaurant pourrait être le suivant", ctaTitle: "Découvrez le potentiel de votre", ctaTitleHighlight: "carte des vins",
    ctaDesc: "Envoyez-nous votre carte et nous vous montrons les résultats possibles. Sans engagement.",
    ctaBtn1: "Demander une analyse", ctaBtn2: "Demander une démo",
    faqs: [
      { q: "Les cas présentés sont-ils de vrais clients ?", a: "Oui. Les cas réels incluent nom, poste et restaurant vérifiés. Les scénarios types sont étiquetés comme tels." },
      { q: "Winerim fonctionne-t-il sans sommelier ?", a: "Oui. Plusieurs cas réels sont de restaurants sans sommelier." },
    ],
  },
  de: {
    seoTitle: "Echte Fälle und Szenarien | Winerim",
    seoDesc: "Verifizierte Erfahrungsberichte von Gastronomieprofis, die Winerim nutzen, sowie Szenarien auf Basis realer Muster.",
    badge: "Echte Belege + Szenarien",
    h1: "Echte Fälle und",
    h1Highlight: "Szenarien",
    subtitle: "Verifizierte Stimmen von Profis, die Winerim nutzen, und Szenarien auf Basis realer Muster aus Restaurants und Hotels.",
    realTitle: "Echte Fälle mit",
    realTitleHighlight: "verifizierten Stimmen",
    realDesc: "Jeder Fall enthält Ausgangslage, Problem, Implementierung und beobachtete Wirkung, zusammen mit einem validierten Zitat.",
    scenarioTitle: "Szenarien auf Basis",
    scenarioTitleHighlight: "realer Muster",
    scenarioDesc: "Häufige Geschäftsprofile, bei denen Winerim helfen kann. Es sind keine Einzelfallstudien – es sind typische Muster mit potenziellen Verbesserungsindikatoren.",
    voicesTitle: "Weitere Stimmen von Profis, die",
    voicesTitleHighlight: "Winerim täglich nutzen",
    situation: "Ausgangslage", problem: "Problem", implementation: "Umsetzung", impact: "Wirkung", refs: "Referenzen",
    scenarioBadge: "Szenario", painLabel: "Typischer Schmerzpunkt", helpLabel: "Wie Winerim hilft", indicatorsLabel: "Verbesserbare Kennzahlen",
    ctaBadge: "Ihr Restaurant könnte das nächste sein", ctaTitle: "Entdecken Sie das Potenzial Ihrer", ctaTitleHighlight: "Weinkarte",
    ctaDesc: "Senden Sie uns Ihre Weinkarte und wir zeigen Ihnen, welche Ergebnisse möglich sind. Unverbindlich.",
    ctaBtn1: "Weinkarten-Analyse anfordern", ctaBtn2: "Demo anfordern",
    faqs: [
      { q: "Sind die gezeigten Fälle von echten Kunden?", a: "Ja. Echte Fälle enthalten verifizierten Namen, Funktion und Restaurant mit wörtlichen Zitaten. Szenarien sind als solche gekennzeichnet und stellen häufige Muster dar, keine Einzelkunden." },
      { q: "Welche Ergebnisse kann ich erwarten?", a: "Die Ergebnisse variieren je nach Restaurant. Das geschätzte Verbesserungspotenzial beim durchschnittlichen Weinumsatz pro Tisch liegt zwischen 15 % und 25 %, abhängig vom Kontext." },
      { q: "Funktioniert Winerim ohne Sommelier?", a: "Ja. Mehrere der gezeigten Fälle stammen aus Restaurants ohne Sommelier, wo Winerim als intelligenter Assistent für das Serviceteam fungiert." },
    ],
  },
  pt: {
    seoTitle: "Casos Reais e Cenários-Tipo | Winerim",
    seoDesc: "Testemunhos verificados de profissionais que usam a Winerim e cenários-tipo baseados em padrões reais.",
    badge: "Evidência real + Cenários-tipo",
    h1: "Casos reais e cenários-",
    h1Highlight: "tipo",
    subtitle: "Testemunhos verificados de profissionais que usam a Winerim e cenários baseados em padrões reais de restaurantes e hotéis.",
    realTitle: "Casos reais com",
    realTitleHighlight: "testemunhos verificados",
    realDesc: "Cada caso inclui a situação inicial, o problema, a implementação e o impacto observado, com uma citação validada.",
    scenarioTitle: "Cenários-tipo baseados em",
    scenarioTitleHighlight: "padrões reais",
    scenarioDesc: "Perfis de negócio frequentes em que a Winerim pode ajudar. Não são casos individuais – são padrões comuns com indicadores de melhoria potencial.",
    voicesTitle: "Mais vozes de profissionais que usam a",
    voicesTitleHighlight: "Winerim todos os dias",
    situation: "Situação", problem: "Problema", implementation: "Implementação", impact: "Impacto", refs: "referências",
    scenarioBadge: "Cenário-tipo", painLabel: "Dor habitual", helpLabel: "Como a Winerim ajuda", indicatorsLabel: "Indicadores que pode melhorar",
    ctaBadge: "O seu restaurante pode ser o próximo", ctaTitle: "Descubra o potencial da sua", ctaTitleHighlight: "carta de vinhos",
    ctaDesc: "Envie-nos a sua carta e mostramos-lhe que resultados pode obter. Sem compromisso.",
    ctaBtn1: "Pedir análise da carta", ctaBtn2: "Pedir demo",
    faqs: [
      { q: "Os casos apresentados são de clientes reais?", a: "Sim. Os casos reais incluem nome, cargo e restaurante verificados, com citações textuais do profissional. Os cenários-tipo estão identificados como tal e representam padrões frequentes, não clientes individuais." },
      { q: "Que resultados posso esperar com a Winerim?", a: "Os resultados variam consoante o restaurante. O potencial estimado de melhoria no ticket médio de vinho situa-se entre 15 % e 25 %, consoante o contexto e a implementação." },
      { q: "A Winerim funciona para restaurantes sem sommelier?", a: "Sim. Vários dos casos reais apresentados são de restaurantes sem sommelier, onde a Winerim atua como assistente inteligente para a equipa de sala." },
    ],
  },
};

const internalLinks = [
  { to: "/demo", label: "Solicitar demo gratuita personalizada", type: "solution" as const },
  { to: "/analisis-carta", label: "Analiza tu carta gratis y recibe un diagnóstico", type: "tool" as const },
  { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "solution" as const },
  { to: "/herramientas", label: "Herramientas gratuitas de análisis y pricing", type: "tool" as const },
  { to: "/comparativas", label: "Compara Winerim con alternativas", type: "solution" as const },
  { to: "/guias-y-recursos", label: "Guías prácticas y recursos descargables", type: "guide" as const },
  { to: "/benchmarks-playbooks", label: "Benchmarks y playbooks del sector", type: "resource" as const },
  { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica: IA táctica para carta", type: "solution" as const },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
const CasosExito = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const l = labels[lang] || labels.es;
  const cases = realCases[lang] || realCases.es;
  const scens = scenarios[lang] || scenarios.es;
  const url = `https://winerim.wine${localePath("/casos-exito")}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={l.seoTitle} description={l.seoDesc} url={url} hreflang={allLangPaths("/casos-exito")} />
      <DynamicSchemaMarkup
        id="casos-exito"
        type="CollectionPage"
        title={l.seoTitle}
        description={l.seoDesc}
        url={url}
        faqs={l.faqs}
        breadcrumbs={[
          { name: "Inicio", url: "https://winerim.wine" },
          { name: l.h1 + " " + l.h1Highlight, url },
        ]}
      />
      {/* Review JSON-LD for each real case */}
      {cases.map((c, i) => (
        <script key={`review-ld-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          author: { "@type": "Person", name: c.name, jobTitle: c.role },
          reviewBody: c.quote,
          itemReviewed: { "@type": "SoftwareApplication", name: "Winerim", applicationCategory: "BusinessApplication" },
        }) }} />
      ))}
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: l.h1 + " " + l.h1Highlight }]} />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{l.badge}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl">
            {l.h1} <span className="text-gradient-wine italic">{l.h1Highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{l.subtitle}</p>
        </div>
      </section>

      {/* ── REAL CASES ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{l.realTitle}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              {l.realTitle} <span className="text-gradient-wine italic">{l.realTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{l.realDesc}</p>
          </ScrollReveal>

          <div className="space-y-8">
            {cases.map((c, i) => (
              <RealCaseCard
                key={i}
                data={c}
                index={i}
                labels={{
                  situation: l.situation,
                  problem: l.problem,
                  implementation: l.implementation,
                  impact: l.impact,
                  refs: l.refs,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENARIO PROFILES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              {l.scenarioTitle} <span className="text-gradient-wine italic">{l.scenarioTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{l.scenarioDesc}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {scens.map((s, i) => (
              <ScenarioCard
                key={i}
                data={s}
                index={i}
                labels={{
                  scenarioBadge: l.scenarioBadge,
                  painLabel: l.painLabel,
                  helpLabel: l.helpLabel,
                  indicatorsLabel: l.indicatorsLabel,
                  refs: l.refs,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXTRA TESTIMONIALS WALL ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              {l.voicesTitle} <span className="text-gradient-wine italic">{l.voicesTitleHighlight}</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extraTestimonials.map((t, i) => (
              <ScrollReveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 hover:border-wine/30 transition-all duration-300 group overflow-hidden relative h-full flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine to-wine-light opacity-30 group-hover:opacity-100 transition-opacity" />
                  <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-wine bg-wine/10 border border-wine/20 rounded-full px-3 py-1 mb-3 self-start">
                    {t.highlight}
                  </span>
                  <Quote size={18} className="text-wine/25 mb-2" />
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5 flex-1">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                    <div className="w-9 h-9 rounded-full bg-wine flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                      <p className="text-xs text-wine font-medium">{t.restaurant}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {l.faqs.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-3xl mx-auto">
            <FAQSection faqs={l.faqs} />
          </div>
        </section>
      )}

      {/* ── INTERNAL LINKS ── */}
      <InternalLinks links={internalLinks} title="Explora más" />

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{l.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {l.ctaTitle} <span className="text-gradient-wine italic">{l.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{l.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {l.ctaBtn1} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/demo")} className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                  {l.ctaBtn2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CasosExito;
