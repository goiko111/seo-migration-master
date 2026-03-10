import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle, TrendingDown, ArrowRight, Wine, Users, Clock, Brain,
  UserX, Package, ShoppingCart, DollarSign, Tag, FileX, Eye, BarChart3,
  Unplug, GraduationCap, Gem, HelpCircle, ListX, ChevronsDown, Utensils,
  BookX, ShieldAlert, Equal, Compass, HeartCrack, Lock, Lightbulb, Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

interface Pain { icon: typeof Wine; title: string; desc: string }
interface PainBlock { badge: string; title: string; pains: Pain[] }

interface LangContent {
  seoTitle: string; seoDesc: string; badge: string; h1: string; subtitle: string;
  blocks: PainBlock[];
  summary_badge: string; summary_title: string; summary_items: string[];
  notFound: string; notFoundDesc: string; notFoundBtn: string;
  cta_title: string; cta_sub: string; cta_btn: string;
  linksTitle: string;
}

const content: Record<string, LangContent> = {
  es: {
    seoTitle: "Problemas con la Carta de Vinos | Diagnóstico y Solución",
    seoDesc: "¿Tu carta de vinos no funciona? Diagnóstico completo de los problemas más comunes para restaurantes, comensales y la experiencia global.",
    badge: "Diagnóstico", h1: "Problemas con la carta de vinos",
    subtitle: "Todos los problemas que afectan a las ventas de vino en tu restaurante, organizados por perspectiva: restaurante, comensal y experiencia global.",
    blocks: [
      {
        badge: "Para el restaurante", title: "17 problemas que frenan tus ventas de vino",
        pains: [
          { icon: Wine, title: "La carta no vende, solo informa", desc: "Tu carta presenta vinos pero no guía al comensal hacia la compra." },
          { icon: TrendingDown, title: "El vino está infravendido", desc: "Las ventas de vino están muy por debajo de su potencial real." },
          { icon: DollarSign, title: "Ticket medio en vino demasiado bajo", desc: "Los clientes gastan menos de lo que podrían en vino." },
          { icon: Clock, title: "El equipo no tiene tiempo para vender vino", desc: "El servicio va rápido y no hay margen para recomendar." },
          { icon: Brain, title: "Falta conocimiento para recomendar", desc: "El personal de sala no domina la carta de vinos." },
          { icon: UserX, title: "Dependencia del sumiller", desc: "Sin el sumiller presente, nadie recomienda bien." },
          { icon: ListX, title: "Demasiadas referencias sin orden comercial", desc: "La carta tiene muchos vinos pero sin estrategia de venta." },
          { icon: Package, title: "Vinos parados sin rotación", desc: "Hay referencias que no se venden y ocupan espacio en bodega." },
          { icon: ShoppingCart, title: "Compras sin criterio de rentabilidad", desc: "Se compran vinos sin analizar márgenes ni demanda." },
          { icon: DollarSign, title: "Márgenes sin optimizar", desc: "Los márgenes por referencia no están trabajados." },
          { icon: Tag, title: "Precios mal planteados", desc: "Los precios por botella o copa no están alineados con la estrategia." },
          { icon: FileX, title: "Carta desactualizada o difícil de mantener", desc: "Actualizar la carta es lento y propenso a errores." },
          { icon: Eye, title: "Falta visibilidad sobre el cliente", desc: "No sabes qué vinos interesan realmente a tus comensales." },
          { icon: BarChart3, title: "Sin datos para decidir", desc: "Las decisiones de compra y carta se toman por intuición." },
          { icon: Unplug, title: "Gestión del vino desconectada", desc: "Carta, stock y ventas no están integrados." },
          { icon: GraduationCap, title: "Cuesta formar al personal", desc: "Formar al equipo en vinos es caro y lento." },
          { icon: Gem, title: "Se desaprovecha el vino como palanca", desc: "El vino podría aportar mucho más margen del que genera." },
        ],
      },
      {
        badge: "Para el comensal", title: "8 barreras que frenan la elección de vino",
        pains: [
          { icon: HelpCircle, title: "No entiende la carta", desc: "Demasiada información técnica y poco contexto útil." },
          { icon: ListX, title: "Se abruma al elegir", desc: "Muchas opciones sin guía clara generan parálisis." },
          { icon: ChevronsDown, title: "Acaba pidiendo el más barato", desc: "Sin orientación, el precio es el único criterio." },
          { icon: Utensils, title: "No sabe qué encaja con su plato", desc: "Falta información sobre maridajes." },
          { icon: BookX, title: "No entiende los términos técnicos", desc: "Vocabulario enológico que aleja al cliente medio." },
          { icon: ShieldAlert, title: "Tiene miedo a equivocarse", desc: "La inseguridad frena la exploración." },
          { icon: Equal, title: "Percibe los vinos como \"todos iguales\"", desc: "Sin diferenciación clara entre referencias." },
          { icon: Compass, title: "Elección no guiada", desc: "La experiencia de elegir vino no está asistida." },
        ],
      },
      {
        badge: "Para la experiencia", title: "4 problemas que afectan a la experiencia global",
        pains: [
          { icon: HeartCrack, title: "Un mal maridaje arruina la experiencia", desc: "Un vino mal elegido perjudica toda la experiencia gastronómica." },
          { icon: Lock, title: "Una carta compleja frena la venta", desc: "La complejidad genera abandono: el comensal no pide vino." },
          { icon: Unplug, title: "El vino no está integrado en sala", desc: "El vino se trata como algo aparte, no como parte de la experiencia." },
          { icon: Lightbulb, title: "Se pierde la oportunidad de educar y vender", desc: "Cada interacción con el vino es una oportunidad desaprovechada." },
        ],
      },
    ],
    summary_badge: "Resumen",
    summary_title: "Los 6 problemas raíz",
    summary_items: [
      "Baja venta de vino",
      "Baja conversión",
      "Mala rotación",
      "Falta de conocimiento en sala",
      "Decisiones sin datos",
      "Carta poco comercial",
    ],
    notFound: "¿No encuentras tu problema?",
    notFoundDesc: "Analiza tu carta de vinos gratis y recibe un diagnóstico personalizado con recomendaciones de mejora.",
    notFoundBtn: "Analizar mi carta gratis",
    cta_title: "Winerim resuelve todos estos problemas",
    cta_sub: "Descubre cómo nuestra plataforma convierte tu carta en una herramienta de venta, recomendación, gestión y análisis.",
    cta_btn: "Ver funcionalidades",
    linksTitle: "Contenido relacionado",
  },
  en: {
    seoTitle: "Wine List Problems | Diagnosis and Solutions",
    seoDesc: "Is your wine list not working? Complete diagnosis of the most common problems for restaurants, diners, and the overall experience.",
    badge: "Diagnosis", h1: "Wine list problems",
    subtitle: "All the problems affecting wine sales in your restaurant, organized by perspective: restaurant, diner, and global experience.",
    blocks: [
      {
        badge: "For the restaurant", title: "17 problems holding back your wine sales",
        pains: [
          { icon: Wine, title: "The list doesn't sell, it only informs", desc: "Your list presents wines but doesn't guide diners to buy." },
          { icon: TrendingDown, title: "Wine is undersold", desc: "Wine sales are well below their real potential." },
          { icon: DollarSign, title: "Average wine ticket too low", desc: "Guests spend less than they could on wine." },
          { icon: Clock, title: "Staff don't have time to sell wine", desc: "Service moves fast with no room to recommend." },
          { icon: Brain, title: "Lack of knowledge to recommend", desc: "Floor staff don't master the wine list." },
          { icon: UserX, title: "Sommelier dependency", desc: "Without the sommelier, no one recommends well." },
          { icon: ListX, title: "Too many references without commercial order", desc: "The list has many wines but no sales strategy." },
          { icon: Package, title: "Stagnant wines without rotation", desc: "References that don't sell and take up cellar space." },
          { icon: ShoppingCart, title: "Purchases without profitability criteria", desc: "Wines bought without analyzing margins or demand." },
          { icon: DollarSign, title: "Unoptimized margins", desc: "Margins per reference aren't worked on." },
          { icon: Tag, title: "Poorly set prices", desc: "Bottle/glass prices not aligned with strategy." },
          { icon: FileX, title: "Outdated or hard-to-maintain list", desc: "Updating the list is slow and error-prone." },
          { icon: Eye, title: "No visibility on customer interest", desc: "You don't know which wines actually interest your diners." },
          { icon: BarChart3, title: "No data for decisions", desc: "Purchasing and list decisions made by intuition." },
          { icon: Unplug, title: "Disconnected wine management", desc: "List, stock, and sales aren't integrated." },
          { icon: GraduationCap, title: "Hard to train staff", desc: "Training the team on wines is expensive and slow." },
          { icon: Gem, title: "Wine underutilized as a margin lever", desc: "Wine could deliver far more margin than it generates." },
        ],
      },
      {
        badge: "For the diner", title: "8 barriers holding back wine selection",
        pains: [
          { icon: HelpCircle, title: "Doesn't understand the list", desc: "Too much technical info, too little useful context." },
          { icon: ListX, title: "Overwhelmed by choices", desc: "Too many options without clear guidance cause paralysis." },
          { icon: ChevronsDown, title: "Ends up ordering the cheapest", desc: "Without guidance, price becomes the only criterion." },
          { icon: Utensils, title: "Doesn't know what pairs with their dish", desc: "No pairing information available." },
          { icon: BookX, title: "Doesn't understand technical terms", desc: "Wine vocabulary that alienates the average guest." },
          { icon: ShieldAlert, title: "Afraid to make a mistake", desc: "Insecurity holds back exploration." },
          { icon: Equal, title: "Perceives wines as 'all the same'", desc: "No clear differentiation between references." },
          { icon: Compass, title: "Unguided selection", desc: "The wine selection experience isn't assisted." },
        ],
      },
      {
        badge: "For the experience", title: "4 problems affecting the overall experience",
        pains: [
          { icon: HeartCrack, title: "A bad pairing ruins the experience", desc: "A poorly chosen wine damages the entire dining experience." },
          { icon: Lock, title: "A complex list stops sales", desc: "Complexity leads to abandonment: the diner skips wine." },
          { icon: Unplug, title: "Wine isn't integrated into the dining floor", desc: "Wine is treated separately, not as part of the experience." },
          { icon: Lightbulb, title: "Missed opportunity to educate and sell", desc: "Every wine interaction is a missed opportunity." },
        ],
      },
    ],
    summary_badge: "Summary",
    summary_title: "The 6 root problems",
    summary_items: ["Low wine sales", "Low conversion", "Poor rotation", "Lack of floor knowledge", "Decisions without data", "Uncommercial wine list"],
    notFound: "Can't find your problem?",
    notFoundDesc: "Analyze your wine list for free and get a personalized diagnosis with improvement recommendations.",
    notFoundBtn: "Analyze my list free",
    cta_title: "Winerim solves all these problems",
    cta_sub: "Discover how our platform turns your list into a sales, recommendation, management, and analytics tool.",
    cta_btn: "See features",
    linksTitle: "Related content",
  },
  it: {
    seoTitle: "Problemi con la Carta dei Vini | Diagnosi e Soluzioni",
    seoDesc: "La tua carta dei vini non funziona? Diagnosi completa dei problemi più comuni per ristoranti, clienti e esperienza globale.",
    badge: "Diagnosi", h1: "Problemi con la carta dei vini",
    subtitle: "Tutti i problemi che influenzano le vendite di vino nel tuo ristorante, organizzati per prospettiva.",
    blocks: [
      {
        badge: "Per il ristorante", title: "17 problemi che frenano le vendite di vino",
        pains: [
          { icon: Wine, title: "La carta non vende, solo informa", desc: "La carta presenta vini ma non guida all'acquisto." },
          { icon: TrendingDown, title: "Il vino è sottovalutato", desc: "Le vendite sono ben sotto il potenziale." },
          { icon: DollarSign, title: "Scontrino medio vino troppo basso", desc: "I clienti spendono meno del possibile in vino." },
          { icon: Clock, title: "Il personale non ha tempo", desc: "Il servizio è veloce, non c'è spazio per consigliare." },
          { icon: Brain, title: "Mancanza di competenze", desc: "Il personale non padroneggia la carta." },
          { icon: UserX, title: "Dipendenza dal sommelier", desc: "Senza il sommelier nessuno consiglia bene." },
          { icon: ListX, title: "Troppe referenze senza ordine", desc: "Molti vini senza strategia commerciale." },
          { icon: Package, title: "Vini fermi senza rotazione", desc: "Referenze che non si vendono." },
          { icon: ShoppingCart, title: "Acquisti senza criterio", desc: "Vini comprati senza analizzare margini." },
          { icon: DollarSign, title: "Margini non ottimizzati", desc: "I margini per referenza non sono lavorati." },
          { icon: Tag, title: "Prezzi mal impostati", desc: "I prezzi non sono allineati alla strategia." },
          { icon: FileX, title: "Carta obsoleta o difficile da aggiornare", desc: "Aggiornare la carta è lento e soggetto a errori." },
          { icon: Eye, title: "Nessuna visibilità sul cliente", desc: "Non sai quali vini interessano ai clienti." },
          { icon: BarChart3, title: "Nessun dato per decidere", desc: "Decisioni prese per intuizione." },
          { icon: Unplug, title: "Gestione vino scollegata", desc: "Carta, stock e vendite non integrati." },
          { icon: GraduationCap, title: "Difficile formare il personale", desc: "Formazione costosa e lenta." },
          { icon: Gem, title: "Vino sottoutilizzato come leva", desc: "Il vino potrebbe generare molto più margine." },
        ],
      },
      {
        badge: "Per il commensale", title: "8 barriere nella scelta del vino",
        pains: [
          { icon: HelpCircle, title: "Non capisce la carta", desc: "Troppe info tecniche, poco contesto utile." },
          { icon: ListX, title: "Si sente sopraffatto", desc: "Troppe opzioni senza guida." },
          { icon: ChevronsDown, title: "Ordina il più economico", desc: "Senza guida, il prezzo è l'unico criterio." },
          { icon: Utensils, title: "Non sa cosa abbinare", desc: "Mancano informazioni sugli abbinamenti." },
          { icon: BookX, title: "Non capisce i termini tecnici", desc: "Vocabolario che allontana il cliente medio." },
          { icon: ShieldAlert, title: "Ha paura di sbagliare", desc: "L'insicurezza frena l'esplorazione." },
          { icon: Equal, title: "Percepisce i vini come uguali", desc: "Nessuna differenziazione chiara." },
          { icon: Compass, title: "Scelta non guidata", desc: "L'esperienza di scelta non è assistita." },
        ],
      },
      {
        badge: "Per l'esperienza", title: "4 problemi per l'esperienza globale",
        pains: [
          { icon: HeartCrack, title: "Un cattivo abbinamento rovina l'esperienza", desc: "Un vino sbagliato danneggia tutta l'esperienza." },
          { icon: Lock, title: "Una carta complessa blocca la vendita", desc: "La complessità porta all'abbandono." },
          { icon: Unplug, title: "Il vino non è integrato in sala", desc: "Il vino viene trattato separatamente." },
          { icon: Lightbulb, title: "Si perde l'opportunità di educare", desc: "Ogni interazione col vino è un'occasione persa." },
        ],
      },
    ],
    summary_badge: "Riassunto",
    summary_title: "I 6 problemi radice",
    summary_items: ["Basse vendite di vino", "Bassa conversione", "Scarsa rotazione", "Poca conoscenza in sala", "Decisioni senza dati", "Carta poco commerciale"],
    notFound: "Non trovi il tuo problema?",
    notFoundDesc: "Analizza la tua carta gratis e ricevi una diagnosi personalizzata.",
    notFoundBtn: "Analizza la mia carta gratis",
    cta_title: "Winerim risolve tutti questi problemi",
    cta_sub: "Scopri come la nostra piattaforma trasforma la tua carta in uno strumento di vendita, raccomandazione e analisi.",
    cta_btn: "Vedi funzionalità",
    linksTitle: "Contenuti correlati",
  },
  fr: {
    seoTitle: "Problèmes de Carte des Vins | Diagnostic et Solutions",
    seoDesc: "Votre carte des vins ne fonctionne pas ? Diagnostic complet des problèmes les plus courants pour restaurants, clients et expérience globale.",
    badge: "Diagnostic", h1: "Problèmes de carte des vins",
    subtitle: "Tous les problèmes qui affectent les ventes de vin dans votre restaurant, organisés par perspective.",
    blocks: [
      {
        badge: "Pour le restaurant", title: "17 problèmes qui freinent vos ventes de vin",
        pains: [
          { icon: Wine, title: "La carte ne vend pas, elle informe", desc: "Votre carte présente des vins mais ne guide pas vers l'achat." },
          { icon: TrendingDown, title: "Le vin est sous-vendu", desc: "Les ventes sont bien en dessous du potentiel." },
          { icon: DollarSign, title: "Ticket moyen vin trop bas", desc: "Les clients dépensent moins que possible en vin." },
          { icon: Clock, title: "L'équipe n'a pas le temps", desc: "Le service va vite, pas de marge pour recommander." },
          { icon: Brain, title: "Manque de connaissances", desc: "Le personnel ne maîtrise pas la carte." },
          { icon: UserX, title: "Dépendance au sommelier", desc: "Sans le sommelier, personne ne recommande bien." },
          { icon: ListX, title: "Trop de références sans ordre", desc: "Beaucoup de vins sans stratégie commerciale." },
          { icon: Package, title: "Vins stagnants sans rotation", desc: "Des références qui ne se vendent pas." },
          { icon: ShoppingCart, title: "Achats sans critère de rentabilité", desc: "Vins achetés sans analyser les marges." },
          { icon: DollarSign, title: "Marges non optimisées", desc: "Les marges par référence ne sont pas travaillées." },
          { icon: Tag, title: "Prix mal fixés", desc: "Les prix ne sont pas alignés avec la stratégie." },
          { icon: FileX, title: "Carte obsolète ou difficile à maintenir", desc: "La mise à jour est lente et sujette aux erreurs." },
          { icon: Eye, title: "Pas de visibilité sur le client", desc: "Vous ne savez pas quels vins intéressent vos clients." },
          { icon: BarChart3, title: "Pas de données pour décider", desc: "Décisions prises par intuition." },
          { icon: Unplug, title: "Gestion du vin déconnectée", desc: "Carte, stock et ventes non intégrés." },
          { icon: GraduationCap, title: "Difficile de former le personnel", desc: "Formation coûteuse et lente." },
          { icon: Gem, title: "Le vin sous-utilisé comme levier", desc: "Le vin pourrait apporter bien plus de marge." },
        ],
      },
      {
        badge: "Pour le client", title: "8 barrières qui freinent le choix du vin",
        pains: [
          { icon: HelpCircle, title: "Ne comprend pas la carte", desc: "Trop d'infos techniques, trop peu de contexte utile." },
          { icon: ListX, title: "Submergé par les choix", desc: "Trop d'options sans guide clair." },
          { icon: ChevronsDown, title: "Finit par commander le moins cher", desc: "Sans orientation, le prix est le seul critère." },
          { icon: Utensils, title: "Ne sait pas quoi accorder", desc: "Manque d'information sur les accords." },
          { icon: BookX, title: "Ne comprend pas les termes techniques", desc: "Vocabulaire qui éloigne le client moyen." },
          { icon: ShieldAlert, title: "Peur de se tromper", desc: "L'insécurité freine l'exploration." },
          { icon: Equal, title: "Perçoit les vins comme \"tous pareils\"", desc: "Aucune différenciation claire." },
          { icon: Compass, title: "Choix non guidé", desc: "L'expérience de sélection n'est pas assistée." },
        ],
      },
      {
        badge: "Pour l'expérience", title: "4 problèmes pour l'expérience globale",
        pains: [
          { icon: HeartCrack, title: "Un mauvais accord ruine l'expérience", desc: "Un vin mal choisi nuit à toute l'expérience." },
          { icon: Lock, title: "Une carte complexe freine la vente", desc: "La complexité mène à l'abandon." },
          { icon: Unplug, title: "Le vin n'est pas intégré en salle", desc: "Le vin est traité séparément." },
          { icon: Lightbulb, title: "Opportunité manquée d'éduquer et vendre", desc: "Chaque interaction est une occasion perdue." },
        ],
      },
    ],
    summary_badge: "Résumé",
    summary_title: "Les 6 problèmes racines",
    summary_items: ["Faibles ventes de vin", "Faible conversion", "Mauvaise rotation", "Manque de connaissances en salle", "Décisions sans données", "Carte peu commerciale"],
    notFound: "Vous ne trouvez pas votre problème ?",
    notFoundDesc: "Analysez votre carte gratuitement et recevez un diagnostic personnalisé.",
    notFoundBtn: "Analyser ma carte gratuitement",
    cta_title: "Winerim résout tous ces problèmes",
    cta_sub: "Découvrez comment notre plateforme transforme votre carte en outil de vente, recommandation et analyse.",
    cta_btn: "Voir les fonctionnalités",
    linksTitle: "Contenu associé",
  },
};

const blockColors = [
  { border: "border-destructive/20", iconBg: "bg-destructive/10", iconColor: "text-destructive" },
  { border: "border-amber-500/20", iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
  { border: "border-wine/20", iconBg: "bg-wine/10", iconColor: "text-wine" },
];

const Problemas = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/problemas")}`} hreflang={allLangPaths("/problemas")} />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.h1 }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">{t.badge}</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.h1}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{t.subtitle}</motion.p>
          </div>
        </section>

        {/* Pain blocks */}
        {t.blocks.map((block, blockIdx) => {
          const colors = blockColors[blockIdx] || blockColors[0];
          return (
            <section key={blockIdx} className={`${blockIdx % 2 === 1 ? 'bg-gradient-dark' : ''} section-padding`}>
              <div className="max-w-6xl mx-auto px-6 md:px-12">
                <ScrollReveal className="text-center mb-12">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors.border} bg-background/50 mb-4`}>
                    <AlertTriangle size={14} className={colors.iconColor} />
                    <span className={`text-xs font-semibold tracking-widest uppercase ${colors.iconColor}`}>{block.badge}</span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">{block.title}</h2>
                </ScrollReveal>

                <div className={`grid ${block.pains.length <= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
                  {block.pains.map((pain, i) => {
                    const Icon = pain.icon;
                    return (
                      <ScrollReveal key={i} delay={i * 0.04}>
                        <div className={`flex items-start gap-4 bg-gradient-card rounded-xl border ${colors.border} p-6 hover:border-wine/30 transition-all duration-300 h-full`}>
                          <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon size={18} className={colors.iconColor} />
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold text-sm mb-1">{pain.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{pain.desc}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* Summary */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.summary_badge}</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.summary_title}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {t.summary_items.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-wine/20 bg-wine/5 text-sm font-medium text-foreground/90">
                    <TrendingDown size={14} className="text-wine" />
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA → Funcionalidades */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <Sparkles size={28} className="text-wine mx-auto mb-4" />
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-3">{t.cta_title}</h2>
                  <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">{t.cta_sub}</p>
                  <Link to={localePath("/funcionalidades")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                    {t.cta_btn} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Not found */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-10">
              <AlertTriangle size={28} className="text-wine mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold mb-3">{t.notFound}</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">{t.notFoundDesc}</p>
              <Link to="/analisis-carta" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                {t.notFoundBtn} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <InternalLinks title={t.linksTitle} links={[
          { to: localePath("/funcionalidades"), label: lang === "es" ? "Funcionalidades" : "Features", type: "solution" },
          { to: localePath("/como-vender-mas-vino-en-un-restaurante"), label: lang === "es" ? "Cómo vender más vino" : "How to sell more wine", type: "guide" },
          { to: "/wine-list-analyzer", label: "Wine List Analyzer", type: "tool" },
        ]} />
      </main>
      <Footer />
    </div>
  );
};

export default Problemas;
