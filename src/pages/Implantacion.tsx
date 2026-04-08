import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Clock, FileCheck, Settings, Users, Headphones,
  CheckCircle, AlertTriangle, Check, X, Zap, MessageSquare,
  Layers, BarChart3, ShieldCheck, Rocket, BookOpen, Wine
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import CommonMistakes from "@/components/seo/CommonMistakes";
import SummaryBox from "@/components/seo/SummaryBox";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── types ─── */
interface Phase { title: string; duration: string; desc: string; details: string[] }
interface ExpectItem { text: string }

type Content = {
  seoTitle: string; seoDesc: string; badge: string;
  breadProduct: string; breadLabel: string;
  h1: string; h1Highlight: string; subtitle: string;
  ctaDemo: string; ctaContact: string;
  summaryDef: string; summaryBullets: string[];
  /* Phases */
  phasesLabel: string; phasesTitle: string; phasesSubtitle: string;
  phases: Phase[];
  /* What client needs */
  clientLabel: string; clientTitle: string; clientTitleHighlight: string;
  clientNeeds: { title: string; desc: string }[];
  /* What to expect */
  expectLabel: string; expectTitle: string;
  expects: ExpectItem[];
  /* What you DON'T need */
  dontNeedLabel: string; dontNeedTitle: string;
  dontNeeds: ExpectItem[];
  /* What Winerim provides */
  providesLabel: string; providesTitle: string;
  provides: { title: string; desc: string }[];
  /* Common mistakes */
  mistakesTitle: string;
  mistakes: { mistake: string; consequence: string }[];
  /* Timeline */
  timelineLabel: string; timelineTitle: string; timelineSubtitle: string;
  timelineRows: { phase: string; time: string; who: string }[];
  /* Support */
  supportLabel: string; supportTitle: string; supportSubtitle: string;
  supportItems: { title: string; desc: string }[];
  /* Does / doesn't */
  doesTitle: string; doesLabel: string; doesItems: string[];
  doesNotLabel: string; doesNotItems: string[];
  /* CTA */
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string; ctaBtn: string; ctaSecondary: string;
  /* FAQs */
  faqs: { q: string; a: string }[];
};

/* ═══════════════════════════════════════════════════════════ */
/*  ES                                                        */
/* ═══════════════════════════════════════════════════════════ */

const ES: Content = {
  seoTitle: "Cómo funciona la implantación de Winerim | Onboarding paso a paso",
  seoDesc: "Cómo se implanta Winerim en tu restaurante u hotel: fases, tiempos, formación del equipo y soporte continuo. Sin fricciones.",
  badge: "Implantación",
  breadProduct: "Producto", breadLabel: "Implantación",
  h1: "Cómo funciona la ", h1Highlight: "implantación de Winerim",
  subtitle: "Un proceso diseñado para no interrumpir tu operativa. Te acompañamos desde la carga de la carta hasta la puesta en marcha y más allá.",
  ctaDemo: "Solicitar demo", ctaContact: "Consultar proceso",

  summaryDef: "La implantación de Winerim sigue un proceso estructurado de 4 fases que permite poner en marcha la carta inteligente en menos de 2 semanas, sin interrumpir la operativa del restaurante. El equipo de Winerim se encarga de la configuración técnica, la carga de datos y la formación del personal.",
  summaryBullets: [
    "Tiempo medio de implantación: 5-10 días laborables",
    "Sin instalación de hardware ni software en local",
    "Formación presencial u online incluida",
    "Soporte continuo tras la puesta en marcha",
    "El restaurante no necesita equipo técnico propio",
  ],

  phasesLabel: "Proceso", phasesTitle: "4 fases para poner en marcha Winerim", phasesSubtitle: "Un proceso claro, con tiempos definidos y responsabilidades repartidas.",
  phases: [
    {
      title: "1. Evaluación y planificación",
      duration: "1-2 días",
      desc: "Analizamos tu situación actual: carta, TPV, equipo, objetivos. Definimos el plan de implantación.",
      details: [
        "Revisión de la carta actual (formato, referencias, estructura)",
        "Identificación del TPV y sistemas existentes",
        "Definición de objetivos: ¿qué quieres mejorar?",
        "Planificación de tiempos y responsables",
      ],
    },
    {
      title: "2. Carga de datos y configuración",
      duration: "2-4 días",
      desc: "El equipo de Winerim carga la carta, configura categorías, precios, fichas y conexiones con TPV.",
      details: [
        "Carga completa de la carta de vinos (referencias, precios, fichas)",
        "Configuración de categorías, secciones y estructura visual",
        "Conexión con TPV si aplica (Agora, Revo, ICG, etc.)",
        "Configuración de vino por copa, maridajes y recomendaciones",
      ],
    },
    {
      title: "3. Formación del equipo",
      duration: "1-2 días",
      desc: "Formamos a sala y dirección para que sepan usar Winerim desde el primer día. Presencial u online.",
      details: [
        "Sesión para el equipo de sala: cómo recomendar con Winerim",
        "Sesión para dirección / F&B: analítica y gestión",
        "Material de apoyo y guía de uso",
        "Resolución de dudas y simulación de servicio",
      ],
    },
    {
      title: "4. Puesta en marcha y acompañamiento",
      duration: "Continuo",
      desc: "Activamos Winerim en servicio real. Monitorizamos los primeros días y ajustamos lo que haga falta.",
      details: [
        "Activación en servicio real con acompañamiento",
        "Monitorización de uso y rendimiento los primeros 7 días",
        "Ajustes de configuración según feedback del equipo",
        "Transición a soporte continuo",
      ],
    },
  ],

  clientLabel: "Tu parte", clientTitle: "Qué necesitas ", clientTitleHighlight: "aportar tú",
  clientNeeds: [
    { title: "Tu carta actual", desc: "En cualquier formato: PDF, Excel, Word, foto del menú o simplemente una lista de referencias. Nosotros la digitalizamos." },
    { title: "Acceso al TPV (si aplica)", desc: "Credenciales o contacto con tu proveedor de TPV para configurar la integración. No siempre es necesario desde el inicio." },
    { title: "Un interlocutor", desc: "Una persona de referencia en el restaurante (encargado, F&B, propietario) para coordinar formación y resolver dudas." },
    { title: "Disponibilidad para formación", desc: "Entre 1 y 2 horas para la sesión de formación del equipo. Se adapta al horario del restaurante." },
  ],

  expectLabel: "Qué esperar", expectTitle: "Qué puedes esperar del proceso",
  expects: [
    { text: "Un proceso guiado de principio a fin, sin que tengas que improvisar." },
    { text: "Comunicación clara sobre tiempos, estado y próximos pasos." },
    { text: "La carta lista para funcionar antes de 2 semanas." },
    { text: "Formación adaptada al nivel de tu equipo: no hace falta experiencia previa." },
    { text: "Soporte real tras la puesta en marcha, no solo durante la implantación." },
    { text: "Ajustes continuos las primeras semanas según lo que observe tu equipo." },
  ],

  dontNeedLabel: "Qué NO necesitas", dontNeedTitle: "Qué no necesitas tener resuelto",
  dontNeeds: [
    { text: "No necesitas tener la carta digitalizada: la digitalizamos nosotros." },
    { text: "No necesitas un equipo técnico ni un departamento de IT." },
    { text: "No necesitas haber decidido qué integraciones quieres: te asesoramos." },
    { text: "No necesitas que tu equipo de sala sepa de vinos: para eso está Winerim." },
    { text: "No necesitas cambiar de TPV, PMS ni ningún sistema existente." },
    { text: "No necesitas tener experiencia con herramientas digitales de este tipo." },
  ],

  providesLabel: "Winerim facilita", providesTitle: "Qué facilita Winerim durante la implantación",
  provides: [
    { title: "Carga completa de la carta", desc: "Nosotros digitalizamos tu carta, creamos las fichas de vino y configuramos la estructura visual." },
    { title: "Configuración técnica", desc: "Nos encargamos de la conexión con el TPV, la configuración de categorías y la personalización de la carta." },
    { title: "Formación del equipo", desc: "Sesiones prácticas para sala y dirección, adaptadas al nivel del equipo. Incluye material de apoyo." },
    { title: "Soporte dedicado", desc: "Un interlocutor directo durante toda la implantación y soporte continuo después de la puesta en marcha." },
    { title: "Ajustes post-lanzamiento", desc: "Monitorizamos el uso los primeros días y ajustamos configuración, recomendaciones y estructura según feedback." },
    { title: "Documentación y guías", desc: "Guías de uso, vídeos de referencia y material de consulta para el equipo." },
  ],

  mistakesTitle: "Errores habituales al implantar una solución de carta digital",
  mistakes: [
    { mistake: "No involucrar al equipo de sala desde el principio", consequence: "El personal no adopta la herramienta y sigue recomendando como antes. La inversión no se traduce en resultados." },
    { mistake: "Esperar a tener la carta perfecta para empezar", consequence: "La implantación se retrasa indefinidamente. Es mejor empezar con la carta actual y optimizar después." },
    { mistake: "No definir un interlocutor claro", consequence: "La comunicación se dispersa, las decisiones se retrasan y el proceso pierde fluidez." },
    { mistake: "Subestimar la formación", consequence: "El equipo no entiende el valor de la herramienta y la usa como un PDF glorificado." },
    { mistake: "No medir resultados tras la puesta en marcha", consequence: "No se sabe si la carta está funcionando mejor. Sin datos, no hay optimización posible." },
  ],

  timelineLabel: "Tiempos", timelineTitle: "Timeline de implantación", timelineSubtitle: "Tiempos orientativos para un restaurante independiente. Grupos y hoteles pueden requerir ajustes.",
  timelineRows: [
    { phase: "Evaluación y planificación", time: "1-2 días", who: "Winerim + restaurante" },
    { phase: "Carga de datos y configuración", time: "2-4 días", who: "Winerim" },
    { phase: "Formación del equipo", time: "1-2 días", who: "Winerim + equipo de sala" },
    { phase: "Puesta en marcha", time: "1 día", who: "Winerim + restaurante" },
    { phase: "Acompañamiento post-lanzamiento", time: "7-14 días", who: "Winerim" },
    { phase: "Total estimado", time: "5-10 días laborables", who: "—" },
  ],

  supportLabel: "Soporte", supportTitle: "Soporte después de la implantación", supportSubtitle: "La relación no termina con la puesta en marcha. Winerim incluye soporte continuo.",
  supportItems: [
    { title: "Soporte técnico directo", desc: "Canal de comunicación dedicado para resolver dudas, incidencias o peticiones de ajuste." },
    { title: "Actualizaciones de producto", desc: "Nuevas funcionalidades, mejoras de rendimiento y actualizaciones de la plataforma sin coste adicional." },
    { title: "Revisiones periódicas", desc: "Sesiones de seguimiento para analizar resultados, optimizar la carta y detectar oportunidades." },
    { title: "Formación continua", desc: "Sesiones adicionales para nuevos miembros del equipo o para profundizar en funcionalidades avanzadas." },
  ],

  doesTitle: "Implantación de Winerim: transparencia total",
  doesLabel: "Qué incluye la implantación",
  doesItems: [
    "Digitalización completa de tu carta de vinos",
    "Configuración técnica y conexión con TPV",
    "Formación presencial u online para sala y dirección",
    "Acompañamiento durante la puesta en marcha",
    "Soporte continuo tras el lanzamiento",
    "Ajustes de configuración según feedback del equipo",
  ],
  doesNotLabel: "Qué no incluye",
  doesNotItems: [
    "No requiere instalación de hardware ni software en local",
    "No implica cambiar de TPV ni de proveedor tecnológico",
    "No sustituye la toma de decisiones del restaurante: la potencia con datos",
  ],

  ctaBadge: "Empieza hoy",
  ctaTitle: "Pon en marcha Winerim ", ctaTitleHighlight: "sin complicaciones",
  ctaDesc: "Te acompañamos en todo el proceso. Sin interrupciones, sin sorpresas, sin letra pequeña.",
  ctaBtn: "Solicitar demo", ctaSecondary: "Consultar proceso",

  faqs: [
    { q: "¿Cuánto tarda la implantación de Winerim?", a: "El proceso completo suele durar entre 5 y 10 días laborables para un restaurante independiente. Incluye evaluación, carga de carta, configuración, formación y puesta en marcha. Grupos y hoteles pueden requerir más tiempo." },
    { q: "¿Qué necesito aportar yo como restaurante?", a: "Tu carta actual (en cualquier formato), acceso al TPV si quieres integración, una persona de referencia para coordinar y disponibilidad de 1-2 horas para la formación del equipo." },
    { q: "¿Necesito tener la carta digitalizada?", a: "No. Puedes enviarnos tu carta en PDF, Excel, Word o incluso una foto. El equipo de Winerim se encarga de digitalizarla completamente." },
    { q: "¿Hay que instalar algo en el restaurante?", a: "No. Winerim funciona 100% en la nube. No requiere instalación de hardware ni software en local. Solo necesitas un dispositivo con navegador (tablet, móvil, ordenador)." },
    { q: "¿Qué pasa si mi equipo no sabe de vinos?", a: "Precisamente para eso existe Winerim. La formación está diseñada para equipos sin experiencia previa en vino. El sistema guía las recomendaciones automáticamente." },
    { q: "¿Incluye formación para el equipo de sala?", a: "Sí. Incluimos sesiones prácticas para sala y para dirección, adaptadas al nivel del equipo. También proporcionamos material de apoyo y guías de uso." },
    { q: "¿Qué soporte tengo después de la implantación?", a: "Soporte técnico directo, revisiones periódicas de rendimiento, actualizaciones de producto y formación continua para nuevos miembros del equipo." },
    { q: "¿Puedo implantar Winerim en varios locales a la vez?", a: "Sí. Para grupos de restauración, diseñamos un plan de implantación escalonado que permite poner en marcha varios locales de forma ordenada y eficiente." },
    { q: "¿La implantación tiene coste adicional?", a: "La implantación estándar está incluida en todos los planes. Proyectos con integraciones complejas o necesidades especiales pueden requerir un presupuesto a medida." },
    { q: "¿Puedo cambiar la carta después de la implantación?", a: "Por supuesto. Winerim está diseñado para que actualices la carta cuando quieras: añadir o quitar referencias, cambiar precios, ajustar categorías. Todo en tiempo real." },
  ],
};

/* ═══════════════════════════════════════════════════════════ */
/*  EN                                                        */
/* ═══════════════════════════════════════════════════════════ */

const EN: Content = {
  seoTitle: "How Winerim Implementation Works | Step-by-step Onboarding",
  seoDesc: "Discover how Winerim is implemented in your restaurant or hotel: phases, timelines, what you need, team training, and ongoing support.",
  badge: "Implementation",
  breadProduct: "Product", breadLabel: "Implementation",
  h1: "How ", h1Highlight: "Winerim implementation works",
  subtitle: "A process designed not to disrupt your operations. We guide you from wine list upload to go-live and beyond.",
  ctaDemo: "Request demo", ctaContact: "Ask about the process",

  summaryDef: "Winerim implementation follows a structured 4-phase process that gets the smart wine list running in under 2 weeks, without disrupting restaurant operations. The Winerim team handles technical setup, data loading and staff training.",
  summaryBullets: [
    "Average implementation time: 5-10 business days",
    "No hardware or software installation required on-site",
    "In-person or online training included",
    "Ongoing support after go-live",
    "No in-house technical team required",
  ],

  phasesLabel: "Process", phasesTitle: "4 phases to launch Winerim", phasesSubtitle: "A clear process with defined timelines and shared responsibilities.",
  phases: [
    {
      title: "1. Assessment & planning",
      duration: "1-2 days",
      desc: "We analyze your current situation: list, POS, team, goals. We define the implementation plan.",
      details: ["Review of current wine list", "POS and systems identification", "Goal definition", "Timeline and owners planning"],
    },
    {
      title: "2. Data loading & configuration",
      duration: "2-4 days",
      desc: "The Winerim team loads the list, configures categories, prices, wine profiles and POS connections.",
      details: ["Full wine list upload", "Category and visual structure setup", "POS connection if applicable", "By-the-glass, pairings and recommendations config"],
    },
    {
      title: "3. Team training",
      duration: "1-2 days",
      desc: "We train floor staff and management so they can use Winerim from day one.",
      details: ["Floor staff session: recommending with Winerim", "Management/F&B session: analytics and management", "Support materials and user guide", "Q&A and service simulation"],
    },
    {
      title: "4. Go-live & support",
      duration: "Ongoing",
      desc: "We activate Winerim in live service. We monitor the first days and adjust as needed.",
      details: ["Live activation with support", "7-day usage and performance monitoring", "Configuration adjustments from team feedback", "Transition to ongoing support"],
    },
  ],

  clientLabel: "Your part", clientTitle: "What you ", clientTitleHighlight: "need to provide",
  clientNeeds: [
    { title: "Your current wine list", desc: "In any format: PDF, Excel, Word, photo or a list of references. We digitize it." },
    { title: "POS access (if applicable)", desc: "Credentials or POS provider contact to configure integration. Not always needed from day 1." },
    { title: "A point of contact", desc: "One person in the restaurant (manager, F&B, owner) to coordinate training and resolve questions." },
    { title: "Training availability", desc: "1-2 hours for the team training session. Adapted to restaurant schedule." },
  ],

  expectLabel: "What to expect", expectTitle: "What you can expect from the process",
  expects: [
    { text: "A guided process from start to finish." },
    { text: "Clear communication on timelines, status and next steps." },
    { text: "The list ready to go in under 2 weeks." },
    { text: "Training adapted to your team's level." },
    { text: "Real support after go-live, not just during implementation." },
    { text: "Continuous adjustments during the first weeks." },
  ],

  dontNeedLabel: "What you DON'T need", dontNeedTitle: "What you don't need to have sorted",
  dontNeeds: [
    { text: "You don't need a digitized wine list: we handle it." },
    { text: "You don't need a technical team or IT department." },
    { text: "You don't need to have decided on integrations: we advise you." },
    { text: "You don't need your floor staff to know about wine: that's what Winerim is for." },
    { text: "You don't need to change POS, PMS or any existing system." },
    { text: "You don't need prior experience with digital tools." },
  ],

  providesLabel: "Winerim provides", providesTitle: "What Winerim handles during implementation",
  provides: [
    { title: "Full list digitization", desc: "We digitize your list, create wine profiles and set up the visual structure." },
    { title: "Technical setup", desc: "We handle POS connection, category configuration and list customization." },
    { title: "Team training", desc: "Practical sessions for floor staff and management, adapted to team level." },
    { title: "Dedicated support", desc: "A direct contact throughout implementation and ongoing support after go-live." },
    { title: "Post-launch adjustments", desc: "We monitor usage the first days and adjust configuration based on feedback." },
    { title: "Documentation & guides", desc: "User guides, reference videos and reference materials for the team." },
  ],

  mistakesTitle: "Common mistakes when implementing a digital wine list solution",
  mistakes: [
    { mistake: "Not involving floor staff from the start", consequence: "Staff doesn't adopt the tool and keeps recommending the old way." },
    { mistake: "Waiting for the perfect list before starting", consequence: "Implementation gets delayed indefinitely. Better to start with the current list." },
    { mistake: "Not assigning a clear point of contact", consequence: "Communication gets scattered, decisions are delayed." },
    { mistake: "Underestimating training", consequence: "The team doesn't understand the tool's value and uses it as a glorified PDF." },
    { mistake: "Not measuring results after go-live", consequence: "No way to know if the list is performing better. Without data, no optimization." },
  ],

  timelineLabel: "Timeline", timelineTitle: "Implementation timeline", timelineSubtitle: "Indicative timelines for an independent restaurant. Groups and hotels may vary.",
  timelineRows: [
    { phase: "Assessment & planning", time: "1-2 days", who: "Winerim + restaurant" },
    { phase: "Data loading & configuration", time: "2-4 days", who: "Winerim" },
    { phase: "Team training", time: "1-2 days", who: "Winerim + floor team" },
    { phase: "Go-live", time: "1 day", who: "Winerim + restaurant" },
    { phase: "Post-launch support", time: "7-14 days", who: "Winerim" },
    { phase: "Total estimated", time: "5-10 business days", who: "—" },
  ],

  supportLabel: "Support", supportTitle: "Support after implementation", supportSubtitle: "The relationship doesn't end at go-live. Winerim includes ongoing support.",
  supportItems: [
    { title: "Direct technical support", desc: "Dedicated channel for questions, issues or adjustment requests." },
    { title: "Product updates", desc: "New features, performance improvements and platform updates at no extra cost." },
    { title: "Periodic reviews", desc: "Follow-up sessions to analyze results, optimize the list and spot opportunities." },
    { title: "Ongoing training", desc: "Additional sessions for new team members or advanced features." },
  ],

  doesTitle: "Winerim implementation: full transparency",
  doesLabel: "What implementation includes",
  doesItems: [
    "Full wine list digitization",
    "Technical setup and POS connection",
    "In-person or online training for staff and management",
    "Go-live support and monitoring",
    "Ongoing support after launch",
    "Configuration adjustments based on team feedback",
  ],
  doesNotLabel: "What it doesn't include",
  doesNotItems: [
    "No hardware or software installation required on-site",
    "No POS or technology provider changes needed",
    "Doesn't replace restaurant decision-making: it empowers it with data",
  ],

  ctaBadge: "Get started",
  ctaTitle: "Launch Winerim ", ctaTitleHighlight: "without hassle",
  ctaDesc: "We guide you through the entire process. No disruptions, no surprises, no fine print.",
  ctaBtn: "Request demo", ctaSecondary: "Ask about the process",

  faqs: [
    { q: "How long does Winerim implementation take?", a: "5-10 business days for an independent restaurant. Includes assessment, list loading, configuration, training and go-live. Groups and hotels may take longer." },
    { q: "What do I need to provide?", a: "Your current wine list (any format), POS access if you want integration, a point of contact, and 1-2 hours for team training." },
    { q: "Do I need a digitized wine list?", a: "No. Send us your list in PDF, Excel, Word or even a photo. We handle the digitization." },
    { q: "Do I need to install anything?", a: "No. Winerim is 100% cloud-based. No hardware or software installation needed." },
    { q: "What if my team doesn't know about wine?", a: "That's exactly what Winerim is for. Training is designed for teams with no prior wine experience." },
    { q: "Does it include staff training?", a: "Yes. Practical sessions for floor staff and management, plus support materials and user guides." },
    { q: "What support do I get after implementation?", a: "Direct technical support, periodic performance reviews, product updates, and ongoing training." },
    { q: "Can I implement across multiple locations?", a: "Yes. For restaurant groups, we design a phased rollout plan." },
    { q: "Does implementation cost extra?", a: "Standard implementation is included in all plans. Complex integrations may require a custom quote." },
    { q: "Can I change the list after implementation?", a: "Absolutely. Winerim lets you update the list anytime: add/remove wines, change prices, adjust categories. All in real time." },
  ],
};

const IT: Content = { ...EN,
  seoTitle: "Come funziona l'implementazione di Winerim | Onboarding passo per passo",
  seoDesc: "Scopri come si implementa Winerim nel tuo ristorante o hotel: fasi, tempi, formazione e supporto continuo.",
  badge: "Implementazione", breadProduct: "Prodotto", breadLabel: "Implementazione",
  h1: "Come funziona l'", h1Highlight: "implementazione di Winerim",
  subtitle: "Un processo progettato per non interrompere la tua operatività.",
  ctaDemo: "Richiedi demo", ctaContact: "Chiedi info sul processo",
  ctaBtn: "Richiedi demo", ctaSecondary: "Chiedi info sul processo",
};

const FR: Content = { ...EN,
  seoTitle: "Comment fonctionne l'implantation de Winerim | Onboarding étape par étape",
  seoDesc: "Découvrez comment Winerim est implanté dans votre restaurant ou hôtel : phases, délais, formation et support continu.",
  badge: "Implantation", breadProduct: "Produit", breadLabel: "Implantation",
  h1: "Comment fonctionne ", h1Highlight: "l'implantation de Winerim",
  subtitle: "Un processus conçu pour ne pas interrompre votre activité.",
  ctaDemo: "Demander une démo", ctaContact: "Demander des informations",
  ctaBtn: "Demander une démo", ctaSecondary: "Demander des informations",
};

const contentMap: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR };

/* ─── icons ─── */
const phaseIcons = [FileCheck, Settings, Users, Rocket];
const clientIcons = [Wine, Layers, MessageSquare, Clock];
const provideIcons = [BookOpen, Settings, Users, Headphones, BarChart3, FileCheck];
const supportIcons = [Headphones, Zap, BarChart3, BookOpen];

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════ */

const Implantacion = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = contentMap[lang] || contentMap.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "implantacion-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: t.seoTitle,
      description: t.seoDesc,
      totalTime: "P10D",
      step: t.phases.map((p, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: p.title,
        text: p.desc,
      })),
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("implantacion-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/implantacion")}`} hreflang={allLangPaths("/implantacion")} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadProduct, href: localePath("/software-carta-de-vinos") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Rocket size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1}<span className="text-gradient-wine italic">{t.h1Highlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.subtitle}
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

      {/* ── SUMMARY BOX ── */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <SummaryBox definition={t.summaryDef} bullets={t.summaryBullets} label={t.badge} />
        </div>
      </section>

      {/* ── PHASES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.phasesLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{t.phasesTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.phasesSubtitle}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {t.phases.map((phase, i) => {
              const Icon = phaseIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-bold">{phase.title}</h3>
                        <span className="text-xs text-wine font-medium">{phase.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{phase.desc}</p>
                    <ul className="mt-auto space-y-1.5">
                      {phase.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle size={12} className="text-wine shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT CLIENT NEEDS ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.clientLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              {t.clientTitle}<span className="text-gradient-wine italic">{t.clientTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.clientNeeds.map((need, i) => {
              const Icon = clientIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{need.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{need.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT / DON'T NEED ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Expect */}
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-5">{t.expectTitle}</p>
                <ul className="space-y-3">
                  {t.expects.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{e.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            {/* Don't need */}
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-5">{t.dontNeedTitle}</p>
                <ul className="space-y-3">
                  {t.dontNeeds.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{e.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── WHAT WINERIM PROVIDES ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.providesLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.providesTitle}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.provides.map((p, i) => {
              const Icon = provideIcons[i] || CheckCircle;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ── */}
      <section className="px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <CommonMistakes title={t.mistakesTitle} mistakes={t.mistakes} />
        </div>
      </section>

      {/* ── TIMELINE TABLE ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.timelineLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.timelineTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">{t.timelineSubtitle}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wine/5 border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">{lang === "es" ? "Fase" : "Phase"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">{lang === "es" ? "Tiempo" : "Time"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">{lang === "es" ? "Quién" : "Who"}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.timelineRows.map((row, i) => (
                    <tr key={i} className={`border-b border-border last:border-0 ${i === t.timelineRows.length - 1 ? "bg-wine/5 font-semibold" : ""}`}>
                      <td className="py-3 px-4 text-muted-foreground">{row.phase}</td>
                      <td className="py-3 px-4 text-wine font-medium">{row.time}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.supportLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.supportTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.supportSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.supportItems.map((item, i) => {
              const Icon = supportIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

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
      <FAQSection faqs={t.faqs} schemaId="implantacion" />

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
                {t.ctaTitle}<span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaBtn} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/contacto")} className="inline-flex items-center justify-center gap-2 border border-border hover:border-wine/30 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all hover:-translate-y-0.5 text-muted-foreground hover:text-foreground">
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next Steps ── */}
      <NextSteps
        title={lang === "es" ? "Siguientes pasos" : "Next steps"}
        steps={[
          { to: "/demo", label: lang === "es" ? "Solicitar demo" : "Request demo", description: lang === "es" ? "Te mostramos el proceso en detalle." : "We show you the process in detail.", type: "solution" },
          { to: "/integraciones", label: lang === "es" ? "Integraciones" : "Integrations", description: lang === "es" ? "Cómo se conecta con tu TPV y sistemas." : "How it connects with your POS and systems.", type: "solution" },
          { to: "/precios", label: lang === "es" ? "Planes y precios" : "Plans and pricing", description: lang === "es" ? "La implantación está incluida en todos los planes." : "Implementation is included in all plans.", type: "solution" },
          { to: "/funcionalidades", label: lang === "es" ? "Funcionalidades" : "Features", description: lang === "es" ? "Todo lo que incluye Winerim." : "Everything Winerim includes.", type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: lang === "es" ? "Software de carta de vinos" : "Wine list software", type: "solution" },
        { to: localePath("/integraciones"), label: lang === "es" ? "Integraciones" : "Integrations", type: "solution" },
        { to: localePath("/soluciones/restaurantes-sin-sumiller"), label: lang === "es" ? "Para restaurantes sin sumiller" : "For restaurants without sommelier", type: "solution" },
        { to: localePath("/soluciones/hoteles"), label: lang === "es" ? "Winerim para hoteles" : "Winerim for hotels", type: "solution" },
        { to: localePath("/soluciones/grupos-restauracion"), label: lang === "es" ? "Winerim para grupos" : "Winerim for groups", type: "solution" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "solution" },
      ]} />

      <Footer />
    </div>
  );
};

export default Implantacion;
