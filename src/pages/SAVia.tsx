import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  DollarSign,
  FileSearch,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";
import { CANONICAL_DOMAIN } from "@/seo/config";

type RelatedType = "guide" | "tool" | "resource" | "solution" | "decision-center";

type SAViaCopy = {
  seoTitle: string;
  seoDesc: string;
  breadcrumbProduct: string;
  breadcrumbCurrent: string;
  badge: string;
  h1: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  heroNote: string;
  inputDesc: string;
  problemKicker: string;
  problemTitle: string;
  problemParagraphs: string[];
  examplesTitle: string;
  examples: string[];
  securityTitle: string;
  securityText: string;
  benefitsTitle: string;
  benefits: { title: string; desc: string }[];
  decisionTitle: string;
  decisionText: string;
  finalTitle: string;
  finalText: string;
  finalCta: string;
  faqs: { q: string; a: string }[];
  related: { to: string; label: string; type: RelatedType }[];
};

const copy: I18nMap<SAViaCopy> = {
  es: {
    seoTitle: "SAVia | Agente IA para gestionar la carta de vinos del restaurante",
    seoDesc:
      "SAVia es el agente conversacional de Winerim. Consulta ventas, stock, margen, costes, carta y oportunidades para ayudarte a decidir que comprar, revisar o impulsar.",
    breadcrumbProduct: "Producto",
    breadcrumbCurrent: "SAVia",
    badge: "SAVIA",
    h1: "Pregunta a tu bodega. SAVia responde con datos de Winerim.",
    subtitle:
      "SAVia es el agente conversacional de Winerim. Entiende tu carta, ventas, stock, albaranes, costes y margenes para ayudarte a tomar mejores decisiones sin perderte en dashboards.",
    primaryCta: "Ver SAVia en una demo",
    secondaryCta: "Conocer CloudRIM",
    heroNote: "Consulta, resume y prepara acciones. Las decisiones criticas siguen bajo aprobacion humana.",
    inputDesc: "Carta, ventas, stock, costes y margen",
    problemKicker: "Decision layer",
    problemTitle: "La informacion existe, pero no siempre es facil convertirla en decision",
    problemParagraphs: [
      "Puedes tener ventas, stock, margenes, cartas y costes actualizados. Pero si nadie tiene tiempo de cruzarlos, las decisiones siguen dependiendo de intuicion: que reponer, que quitar, que subir de precio o que vino impulsar esta semana.",
      "SAVia convierte esos datos en conversacion.",
    ],
    examplesTitle: "Que puedes preguntarle a SAVia",
    examples: [
      "Que vinos tengo parados y cuanto capital inmovilizan?",
      "Que referencias han bajado margen por cambio de coste?",
      "Que vinos deberia impulsar esta semana?",
      "Que albaranes o tarifas necesitan revision?",
      "Que cambios de carta pueden mejorar rotacion y rentabilidad?",
      "Que esta pasando con las ventas de vino por copa?",
    ],
    securityTitle: "SAVia prepara. El equipo decide.",
    securityText:
      "SAVia puede consultar, resumir y preparar acciones. Las decisiones criticas, como aplicar cambios de precio, confirmar albaranes o ejecutar cambios de carta, quedan bajo control humano y auditado.",
    benefitsTitle: "Menos dashboard. Mas decision.",
    benefits: [
      { title: "Respuestas claras", desc: "Convierte ventas, stock, costes y margen en respuestas accionables." },
      { title: "Explicaciones trazables", desc: "Muestra por que una referencia necesita revision, impulso o reposicion." },
      { title: "Acciones preparadas", desc: "Puede dejar cambios listos para que el equipo confirme antes de ejecutar." },
      { title: "Oportunidades visibles", desc: "Detecta riesgos y oportunidades que pueden quedar ocultos en un dashboard." },
    ],
    decisionTitle: "SAVia trabaja con los datos que Winerim ya ordena",
    decisionText:
      "Carta, ventas, stock, costes, albaranes, margenes y documentos procesados por CloudRIM forman la base para responder con contexto operativo real.",
    finalTitle: "Deja de buscar respuestas en cinco pantallas distintas.",
    finalText: "Te mostramos como SAVia convierte la operativa de vino en una conversacion util para direccion, sumiller y equipo de sala.",
    finalCta: "Solicitar demo de SAVia",
    faqs: [
      { q: "SAVia sustituye al sommelier o al responsable de compras?", a: "No. SAVia no sustituye el criterio humano. Ayuda a consultar datos, ordenar senales y preparar decisiones para que el equipo actue con mas informacion." },
      { q: "Puede cambiar precios o aplicar acciones sola?", a: "Las acciones criticas no se ejecutan sin aprobacion humana. SAVia puede preparar recomendaciones, pero el equipo confirma cambios de precio, albaranes o cambios de carta." },
      { q: "De donde salen las respuestas?", a: "De los datos de Winerim: carta, ventas, stock, costes, albaranes, margenes y documentos procesados por CloudRIM." },
    ],
    related: [
      { to: "/producto/cloudrim", label: "CloudRIM: nube documental de Winerim", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinamica", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core: motor analitico", type: "solution" },
      { to: "/decision-center", label: "Decision Center", type: "decision-center" },
    ],
  },
  en: {
    seoTitle: "SAVia | AI agent for restaurant wine list management",
    seoDesc:
      "SAVia is Winerim's conversational agent. Ask about sales, stock, margin, costs, wine list and opportunities to decide what to buy, review or push.",
    breadcrumbProduct: "Product",
    breadcrumbCurrent: "SAVia",
    badge: "SAVIA",
    h1: "Ask your cellar. SAVia answers with Winerim data.",
    subtitle:
      "SAVia is Winerim's conversational agent. It understands your wine list, sales, stock, delivery notes, costs and margins so you can make better decisions without getting lost in dashboards.",
    primaryCta: "See SAVia in a demo",
    secondaryCta: "Meet CloudRIM",
    heroNote: "It consults, summarizes and prepares actions. Critical decisions remain under human approval.",
    inputDesc: "List, sales, stock, costs and margin",
    problemKicker: "Decision layer",
    problemTitle: "The information exists, but turning it into a decision is not always easy",
    problemParagraphs: [
      "You may have sales, stock, margins, lists and costs up to date. But if nobody has time to cross them, decisions still depend on intuition: what to restock, remove, reprice or push this week.",
      "SAVia turns those data points into a conversation.",
    ],
    examplesTitle: "What you can ask SAVia",
    examples: [
      "Which wines are stuck and how much capital do they tie up?",
      "Which references lost margin after a cost change?",
      "Which wines should I push this week?",
      "Which delivery notes or tariffs need review?",
      "Which list changes could improve rotation and profitability?",
      "What is happening with wine-by-the-glass sales?",
    ],
    securityTitle: "SAVia prepares. The team decides.",
    securityText: "SAVia can consult, summarize and prepare actions. Critical decisions such as applying price changes, confirming delivery notes or changing the list stay under human and auditable control.",
    benefitsTitle: "Less dashboard. More decision.",
    benefits: [
      { title: "Clear answers", desc: "Turns sales, stock, costs and margin into actionable answers." },
      { title: "Traceable reasoning", desc: "Explains why a reference needs review, push or restocking." },
      { title: "Prepared actions", desc: "Can leave changes ready for team approval." },
      { title: "Visible opportunities", desc: "Finds risks and opportunities that dashboards can hide." },
    ],
    decisionTitle: "SAVia works with the data Winerim already organizes",
    decisionText: "Wine list, sales, stock, costs, delivery notes, margins and CloudRIM-processed documents become the basis for answers with real operating context.",
    finalTitle: "Stop looking for answers across five screens.",
    finalText: "We will show you how SAVia turns wine operations into a useful conversation for owners, sommeliers and floor teams.",
    finalCta: "Request SAVia demo",
    faqs: [
      { q: "Does SAVia replace the sommelier or purchasing lead?", a: "No. SAVia helps consult data, organize signals and prepare decisions; human judgement remains in charge." },
      { q: "Can it change prices or execute actions alone?", a: "Critical actions are not executed without human approval. SAVia can prepare recommendations, but the team confirms changes." },
      { q: "Where do answers come from?", a: "From Winerim data: list, sales, stock, costs, delivery notes, margins and CloudRIM-processed documents." },
    ],
    related: [
      { to: "/producto/cloudrim", label: "CloudRIM document cloud", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamic Intelligence", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/decision-center", label: "Decision Center", type: "decision-center" },
    ],
  },
  it: {
    seoTitle: "SAVia | Agente IA per gestire la carta vini",
    seoDesc: "SAVia e l'agente conversazionale di Winerim per interrogare vendite, stock, costi, margini, carta e opportunita.",
    breadcrumbProduct: "Prodotto",
    breadcrumbCurrent: "SAVia",
    badge: "SAVIA",
    h1: "Fai domande alla tua cantina. SAVia risponde con i dati Winerim.",
    subtitle: "SAVia capisce carta, vendite, stock, documenti, costi e margini per aiutarti a decidere senza perderti nei dashboard.",
    primaryCta: "Vedere SAVia in demo",
    secondaryCta: "Conoscere CloudRIM",
    heroNote: "Consulta, riassume e prepara azioni. Le decisioni critiche restano sotto approvazione umana.",
    inputDesc: "Carta, vendite, stock, costi e margine",
    problemKicker: "Decision layer",
    problemTitle: "Le informazioni esistono, ma trasformarle in decisione non e sempre facile",
    problemParagraphs: ["Vendite, stock, margini e costi possono essere aggiornati, ma se nessuno li incrocia si decide ancora per intuizione.", "SAVia trasforma questi dati in conversazione."],
    examplesTitle: "Cosa puoi chiedere a SAVia",
    examples: ["Quali vini sono fermi e quanto capitale immobilizzano?", "Quali referenze hanno perso margine?", "Quali vini dovrei spingere questa settimana?", "Quali documenti o tariffe vanno rivisti?", "Quali cambi di carta migliorano rotazione e redditivita?", "Cosa succede con le vendite al calice?"],
    securityTitle: "SAVia prepara. Il team decide.",
    securityText: "SAVia consulta, riassume e prepara azioni. Cambi prezzi, conferme documenti e modifiche carta restano sotto controllo umano.",
    benefitsTitle: "Meno dashboard. Piu decisione.",
    benefits: [
      { title: "Risposte chiare", desc: "Trasforma dati operativi in risposte utilizzabili." },
      { title: "Ragionamento tracciabile", desc: "Spiega perche una referenza va rivista, spinta o riordinata." },
      { title: "Azioni preparate", desc: "Lascia cambi pronti per l'approvazione." },
      { title: "Opportunita visibili", desc: "Rende visibili rischi e opportunita nascosti." },
    ],
    decisionTitle: "SAVia lavora sui dati che Winerim ordina",
    decisionText: "Carta, vendite, stock, costi, documenti, margini e dati CloudRIM diventano la base per risposte operative.",
    finalTitle: "Smetti di cercare risposte in cinque schermate.",
    finalText: "Ti mostriamo come SAVia trasforma l'operativita del vino in una conversazione utile.",
    finalCta: "Richiedi demo SAVia",
    faqs: [
      { q: "SAVia sostituisce sommelier o acquisti?", a: "No. Aiuta a consultare dati e preparare decisioni, ma il criterio umano resta centrale." },
      { q: "Puo cambiare prezzi da sola?", a: "No. Le azioni critiche richiedono approvazione umana." },
      { q: "Da dove arrivano le risposte?", a: "Dai dati Winerim e dai documenti processati da CloudRIM." },
    ],
    related: [
      { to: "/producto/cloudrim", label: "CloudRIM", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Intelligenza Dinamica", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/decision-center", label: "Decision Center", type: "decision-center" },
    ],
  },
  fr: {
    seoTitle: "SAVia | Agent IA pour gerer la carte des vins",
    seoDesc: "SAVia est l'agent conversationnel de Winerim pour interroger ventes, stock, couts, marges, carte et opportunites.",
    breadcrumbProduct: "Produit",
    breadcrumbCurrent: "SAVia",
    badge: "SAVIA",
    h1: "Interrogez votre cave. SAVia repond avec les donnees Winerim.",
    subtitle: "SAVia comprend carte, ventes, stock, bons, couts et marges pour aider a decider sans se perdre dans les dashboards.",
    primaryCta: "Voir SAVia en demo",
    secondaryCta: "Decouvrir CloudRIM",
    heroNote: "Elle consulte, resume et prepare des actions. Les decisions critiques restent sous approbation humaine.",
    inputDesc: "Carte, ventes, stock, couts et marge",
    problemKicker: "Decision layer",
    problemTitle: "L'information existe, mais la transformer en decision n'est pas toujours simple",
    problemParagraphs: ["Ventes, stock, marges et couts peuvent etre a jour, mais sans croisement les decisions restent intuitives.", "SAVia transforme ces donnees en conversation."],
    examplesTitle: "Ce que vous pouvez demander a SAVia",
    examples: ["Quels vins dorment et combien de capital immobilisent-ils ?", "Quelles references ont perdu de la marge ?", "Quels vins pousser cette semaine ?", "Quels bons ou tarifs doivent etre revus ?", "Quels changements de carte ameliorent rotation et rentabilite ?", "Que se passe-t-il avec les ventes au verre ?"],
    securityTitle: "SAVia prepare. L'equipe decide.",
    securityText: "SAVia peut consulter, resumer et preparer. Prix, bons et changements de carte restent sous controle humain et auditable.",
    benefitsTitle: "Moins de dashboard. Plus de decision.",
    benefits: [
      { title: "Reponses claires", desc: "Transforme les donnees en reponses actionnables." },
      { title: "Raisonnement tracable", desc: "Explique pourquoi une reference doit etre revue ou poussee." },
      { title: "Actions preparees", desc: "Prepare les changements avant validation." },
      { title: "Opportunites visibles", desc: "Revele risques et opportunites caches." },
    ],
    decisionTitle: "SAVia travaille avec les donnees deja organisees par Winerim",
    decisionText: "Carte, ventes, stock, couts, bons, marges et documents CloudRIM alimentent ses reponses.",
    finalTitle: "Ne cherchez plus les reponses dans cinq ecrans.",
    finalText: "Nous vous montrons comment SAVia transforme l'operation vin en conversation utile.",
    finalCta: "Demander une demo SAVia",
    faqs: [
      { q: "SAVia remplace-t-elle le sommelier ou les achats ?", a: "Non. Elle aide a consulter les donnees et preparer les decisions; le jugement humain reste central." },
      { q: "Peut-elle changer les prix seule ?", a: "Non. Les actions critiques demandent une approbation humaine." },
      { q: "D'ou viennent les reponses ?", a: "Des donnees Winerim et des documents traites par CloudRIM." },
    ],
    related: [
      { to: "/producto/cloudrim", label: "CloudRIM", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Intelligence Dynamique", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/decision-center", label: "Decision Center", type: "decision-center" },
    ],
  },
  de: {
    seoTitle: "SAVia | KI-Agent fur Restaurant-Weinkarten",
    seoDesc: "SAVia ist der Konversationsagent von Winerim fur Verkauf, Bestand, Kosten, Margen, Karte und Chancen.",
    breadcrumbProduct: "Produkt",
    breadcrumbCurrent: "SAVia",
    badge: "SAVIA",
    h1: "Fragen Sie Ihren Keller. SAVia antwortet mit Winerim-Daten.",
    subtitle: "SAVia versteht Weinkarte, Verkauf, Bestand, Lieferscheine, Kosten und Margen, damit Entscheidungen ohne Dashboard-Suche klarer werden.",
    primaryCta: "SAVia in einer Demo sehen",
    secondaryCta: "CloudRIM kennenlernen",
    heroNote: "SAVia fragt ab, fasst zusammen und bereitet Aktionen vor. Kritische Entscheidungen bleiben menschlich.",
    inputDesc: "Karte, Verkauf, Bestand, Kosten und Marge",
    problemKicker: "Decision layer",
    problemTitle: "Information ist vorhanden, aber sie wird nicht immer zur Entscheidung",
    problemParagraphs: ["Verkauf, Bestand, Margen und Kosten koennen aktuell sein. Ohne Verknuepfung bleibt vieles Intuition.", "SAVia macht daraus ein Gespraech."],
    examplesTitle: "Was Sie SAVia fragen koennen",
    examples: ["Welche Weine stehen still und wie viel Kapital binden sie?", "Welche Referenzen verlieren Marge?", "Welche Weine sollten diese Woche gepusht werden?", "Welche Lieferscheine oder Tarife brauchen Pruefung?", "Welche Kartenanpassungen verbessern Rotation und Rentabilitaet?", "Was passiert beim offenen Ausschank?"],
    securityTitle: "SAVia bereitet vor. Das Team entscheidet.",
    securityText: "SAVia kann abfragen, zusammenfassen und vorbereiten. Preis-, Lieferschein- und Kartenentscheidungen bleiben menschlich kontrolliert.",
    benefitsTitle: "Weniger Dashboard. Mehr Entscheidung.",
    benefits: [
      { title: "Klare Antworten", desc: "Macht operative Daten zu nutzbaren Antworten." },
      { title: "Nachvollziehbare Logik", desc: "Erklaert, warum eine Referenz geprueft werden sollte." },
      { title: "Vorbereitete Aktionen", desc: "Bereitet Aenderungen zur Freigabe vor." },
      { title: "Sichtbare Chancen", desc: "Zeigt Risiken und Chancen, die im Dashboard untergehen." },
    ],
    decisionTitle: "SAVia nutzt die Daten, die Winerim bereits ordnet",
    decisionText: "Karte, Verkauf, Bestand, Kosten, Lieferscheine, Margen und CloudRIM-Dokumente bilden die Antwortbasis.",
    finalTitle: "Suchen Sie Antworten nicht mehr in funf Ansichten.",
    finalText: "Wir zeigen, wie SAVia Weinoperationen in ein nutzliches Gespraech verwandelt.",
    finalCta: "SAVia-Demo anfragen",
    faqs: [
      { q: "Ersetzt SAVia Sommelier oder Einkauf?", a: "Nein. SAVia bereitet Informationen auf; menschliches Urteil bleibt entscheidend." },
      { q: "Kann SAVia allein Preise aendern?", a: "Nein. Kritische Aktionen brauchen menschliche Freigabe." },
      { q: "Woher kommen die Antworten?", a: "Aus Winerim-Daten und von CloudRIM verarbeiteten Dokumenten." },
    ],
    related: [
      { to: "/producto/cloudrim", label: "CloudRIM", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamische Intelligenz", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/decision-center", label: "Decision Center", type: "decision-center" },
    ],
  },
  pt: {
    seoTitle: "SAVia | Agente IA para gerir cartas de vinho",
    seoDesc: "SAVia e o agente conversacional da Winerim para perguntar sobre vendas, stock, custos, margens, carta e oportunidades.",
    breadcrumbProduct: "Produto",
    breadcrumbCurrent: "SAVia",
    badge: "SAVIA",
    h1: "Pergunte a sua garrafeira. SAVia responde com dados Winerim.",
    subtitle: "SAVia entende carta, vendas, stock, guias, custos e margens para ajudar a decidir sem se perder em dashboards.",
    primaryCta: "Ver SAVia numa demo",
    secondaryCta: "Conhecer CloudRIM",
    heroNote: "Consulta, resume e prepara ações. As decisões críticas continuam sob aprovação humana.",
    inputDesc: "Carta, vendas, stock, custos e margem",
    problemKicker: "Decision layer",
    problemTitle: "A informação existe, mas nem sempre se transforma facilmente em decisão",
    problemParagraphs: ["Vendas, stock, margens e custos podem estar atualizados. Sem cruzamento, a decisão continua por intuição.", "SAVia transforma esses dados em conversa."],
    examplesTitle: "O que pode perguntar a SAVia",
    examples: ["Que vinhos estao parados e quanto capital imobilizam?", "Que referências perderam margem?", "Que vinhos devo impulsionar esta semana?", "Que guias ou tabelas precisam de revisão?", "Que mudanças na carta melhoram rotação e rentabilidade?", "O que está a acontecer com vinho a copo?"],
    securityTitle: "SAVia prepara. A equipa decide.",
    securityText: "SAVia consulta, resume e prepara ações. Preços, guias e mudanças de carta ficam sob controlo humano e auditável.",
    benefitsTitle: "Menos dashboard. Mais decisão.",
    benefits: [
      { title: "Respostas claras", desc: "Transforma dados operacionais em respostas úteis." },
      { title: "Raciocínio rastreável", desc: "Explica por que uma referência precisa de revisão." },
      { title: "Ações preparadas", desc: "Deixa mudanças prontas para aprovação." },
      { title: "Oportunidades visíveis", desc: "Mostra riscos e oportunidades escondidos." },
    ],
    decisionTitle: "SAVia trabalha com os dados que a Winerim já organiza",
    decisionText: "Carta, vendas, stock, custos, guias, margens e documentos CloudRIM formam a base das respostas.",
    finalTitle: "Deixe de procurar respostas em cinco ecrãs.",
    finalText: "Mostramos como SAVia transforma a operação de vinho numa conversa útil.",
    finalCta: "Pedir demo SAVia",
    faqs: [
      { q: "SAVia substitui o sommelier ou compras?", a: "Não. Ajuda a consultar dados e preparar decisões; o critério humano continua central." },
      { q: "Pode alterar preços sozinha?", a: "Não. Ações críticas exigem aprovação humana." },
      { q: "De onde vêm as respostas?", a: "Dos dados Winerim e documentos processados por CloudRIM." },
    ],
    related: [
      { to: "/producto/cloudrim", label: "CloudRIM", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligência Dinâmica", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/decision-center", label: "Decision Center", type: "decision-center" },
    ],
  },
};

const exampleIcons = [TrendingUp, DollarSign, Sparkles, FileSearch, ClipboardCheck, BarChart3];

const SAVia = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(copy, lang);
  const canonicalPath = localePath("/producto/savia");
  const canonical = `${CANONICAL_DOMAIN}${canonicalPath}`;

  return (
    <>
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={canonical}
        hreflang={allLangPaths("/producto/savia")}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SAVia",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: t.seoDesc,
          url: canonical,
          provider: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN },
          isPartOf: { "@type": "SoftwareApplication", name: "Winerim" },
        }}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-wine/8 via-transparent to-background pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <Breadcrumbs
              items={[
                { label: t.breadcrumbProduct, href: localePath("/software-carta-de-vinos") },
                { label: t.breadcrumbCurrent },
              ]}
            />
            <div className="grid lg:grid-cols-[1fr_0.95fr] gap-12 items-center">
              <ScrollReveal>
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-3 py-1">
                  {t.badge}
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                  {t.h1}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  {t.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link
                    to={localePath("/demo")}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                  >
                    {t.primaryCta} <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={localePath("/producto/cloudrim")}
                    className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                  >
                    {t.secondaryCta}
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground/70 max-w-xl leading-relaxed">{t.heroNote}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="relative rounded-2xl border border-border bg-card/80 p-6 md:p-8 shadow-xl shadow-black/5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-wine" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center">
                      <MessageSquare size={24} className="text-wine" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-wine/70 font-semibold">SAVia</p>
                      <p className="text-sm text-muted-foreground">{t.inputDesc}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {t.examples.slice(0, 4).map((question) => (
                      <div key={question} className="rounded-xl border border-border bg-background/70 p-4">
                        <p className="text-sm text-foreground leading-relaxed">"{question}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemKicker}</p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">{t.problemTitle}</h2>
                </div>
                <div className="space-y-5">
                  {t.problemParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground text-lg leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">{t.examplesTitle}</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.examples.map((question, index) => {
                const Icon = exampleIcons[index] || MessageSquare;
                return (
                  <ScrollReveal key={question} delay={index * 0.04}>
                    <div className="h-full rounded-xl border border-border bg-gradient-card p-6">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{question}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
              <ScrollReveal>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-wine/10 mb-5">
                  <ShieldCheck size={24} className="text-wine" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">{t.securityTitle}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{t.securityText}</p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.benefits.map((benefit, index) => (
                  <ScrollReveal key={benefit.title} delay={index * 0.05}>
                    <div className="h-full rounded-xl border border-border bg-card/70 p-5">
                      <CheckCircle2 size={18} className="text-wine mb-3" />
                      <h3 className="font-heading text-base font-bold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-wine/10 mb-6">
                <Sparkles size={28} className="text-wine" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">{t.decisionTitle}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">{t.decisionText}</p>
            </ScrollReveal>
          </div>
        </section>

        <FAQSection faqs={t.faqs} schemaId="savia" />

        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="rounded-2xl border border-wine/15 bg-gradient-to-br from-card via-card/95 to-wine/5 p-10 md:p-14 text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.finalTitle}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">{t.finalText}</p>
                <Link
                  to={localePath("/demo")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  {t.finalCta} <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <InternalLinks links={t.related.map((item) => ({ ...item, to: localePath(item.to) }))} />
      <Footer />
    </>
  );
};

export default SAVia;
