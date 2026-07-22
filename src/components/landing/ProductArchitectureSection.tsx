import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  MessageSquareText,
  ShoppingCart,
  Wine,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";

type ArchitectureCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  flow: string[];
  layers: { name: string; verb: string; description: string; detail: string; href: string }[];
};

const copy: I18nMap<ArchitectureCopy> = {
  es: {
    eyebrow: "Arquitectura Winerim",
    title: "De un documento disperso a una decisión aprobada",
    subtitle: "Cada capacidad tiene un trabajo concreto. Juntas forman un sistema operativo para carta, bodega física, rentabilidad, compras y decisión.",
    flow: ["Datos", "Operación", "Rentabilidad", "Decisión", "Aprobación"],
    layers: [
      { name: "Winerim Core", verb: "Opera", description: "Una fuente de verdad para carta y bodega física.", detail: "Core Carta · stock · Wine Cellar · Wine Lockers", href: "/producto/winerim-core" },
      { name: "CloudRIM", verb: "Recoge", description: "Recibe, clasifica y enruta documentos y datos.", detail: "Cartas · albaranes · facturas · tarifas · ventas", href: "/producto/cloudrim" },
      { name: "Márgenes", verb: "Protege", description: "Explica rentabilidad, erosión y capital inmovilizado.", detail: "Coste real · PVP · copa · rotación · simulación", href: "/producto/winerim-core#core-margins" },
      { name: "Winerim Supply", verb: "Compra", description: "Convierte demanda, stock y tarifas en criterio de compra.", detail: "Comparación · reposición · negociación · pedido", href: "/producto/winerim-supply" },
      { name: "RIMs™", verb: "Detecta", description: "Motores especializados convierten señales en propuestas.", detail: "MarginRIM™ · StockRIM™ · FocusRIM™ · SmartRIM™", href: "/producto/inteligencia-dinamica" },
      { name: "SAVia", verb: "Explica", description: "Permite preguntar, comparar y preparar decisiones.", detail: "Evidencia · impacto · alternativas · preview", href: "/producto/savia" },
    ],
  },
  en: {
    eyebrow: "Winerim architecture", title: "From scattered documents to an approved decision", subtitle: "Every capability has a specific job. Together they form an operating system for the list, physical cellar, profitability, purchasing and decisions.", flow: ["Data", "Operations", "Profitability", "Decision", "Approval"],
    layers: [
      { name: "Winerim Core", verb: "Operates", description: "One source of truth for the list and physical cellar.", detail: "Core List · stock · Wine Cellar · Wine Lockers", href: "/producto/winerim-core" },
      { name: "CloudRIM", verb: "Collects", description: "Receives, classifies and routes documents and data.", detail: "Lists · delivery notes · invoices · catalogues · sales", href: "/producto/cloudrim" },
      { name: "Margins", verb: "Protects", description: "Explains profitability, erosion and tied-up capital.", detail: "True cost · selling price · glass · rotation · simulation", href: "/producto/winerim-core#core-margins" },
      { name: "Winerim Supply", verb: "Purchases", description: "Turns demand, stock and catalogues into buying criteria.", detail: "Comparison · replenishment · negotiation · order", href: "/producto/winerim-supply" },
      { name: "RIMs™", verb: "Detects", description: "Specialist engines turn signals into proposals.", detail: "MarginRIM™ · StockRIM™ · FocusRIM™ · SmartRIM™", href: "/producto/inteligencia-dinamica" },
      { name: "SAVia", verb: "Explains", description: "Lets teams ask, compare and prepare decisions.", detail: "Evidence · impact · alternatives · preview", href: "/producto/savia" },
    ],
  },
  fr: {
    eyebrow: "Architecture Winerim", title: "Du document dispersé à la décision validée", subtitle: "Chaque capacité a un rôle précis. Ensemble, elles forment un système pour la carte, la cave physique, la rentabilité, les achats et la décision.", flow: ["Données", "Opération", "Rentabilité", "Décision", "Validation"],
    layers: [
      { name: "Winerim Core", verb: "Opère", description: "Une source de vérité pour la carte et la cave physique.", detail: "Core Carte · stock · Wine Cellar · Wine Lockers", href: "/producto/winerim-core" },
      { name: "CloudRIM", verb: "Collecte", description: "Reçoit, classe et route documents et données.", detail: "Cartes · bons · factures · tarifs · ventes", href: "/producto/cloudrim" },
      { name: "Marges", verb: "Protège", description: "Explique rentabilité, érosion et capital immobilisé.", detail: "Coût réel · prix · verre · rotation · simulation", href: "/producto/winerim-core#core-margins" },
      { name: "Winerim Supply", verb: "Achète", description: "Transforme demande, stock et tarifs en critères d'achat.", detail: "Comparaison · réassort · négociation · commande", href: "/producto/winerim-supply" },
      { name: "RIMs™", verb: "Détecte", description: "Des moteurs spécialisés transforment les signaux en propositions.", detail: "MarginRIM™ · StockRIM™ · FocusRIM™ · SmartRIM™", href: "/producto/inteligencia-dinamica" },
      { name: "SAVia", verb: "Explique", description: "Permet d'interroger, comparer et préparer les décisions.", detail: "Preuves · impact · alternatives · aperçu", href: "/producto/savia" },
    ],
  },
  it: {
    eyebrow: "Architettura Winerim", title: "Dal documento disperso alla decisione approvata", subtitle: "Ogni capacità ha un compito preciso. Insieme formano un sistema per carta, cantina fisica, redditività, acquisti e decisioni.", flow: ["Dati", "Operazione", "Redditività", "Decisione", "Approvazione"],
    layers: [
      { name: "Winerim Core", verb: "Opera", description: "Un'unica fonte per carta e cantina fisica.", detail: "Core Carta · stock · Wine Cellar · Wine Lockers", href: "/producto/winerim-core" },
      { name: "CloudRIM", verb: "Raccoglie", description: "Riceve, classifica e instrada documenti e dati.", detail: "Carte · bolle · fatture · listini · vendite", href: "/producto/cloudrim" },
      { name: "Margini", verb: "Protegge", description: "Spiega redditività, erosione e capitale immobilizzato.", detail: "Costo reale · prezzo · calice · rotazione · simulazione", href: "/producto/winerim-core#core-margins" },
      { name: "Winerim Supply", verb: "Acquista", description: "Trasforma domanda, stock e listini in criteri di acquisto.", detail: "Confronto · riordino · negoziazione · ordine", href: "/producto/winerim-supply" },
      { name: "RIMs™", verb: "Rileva", description: "Motori specializzati trasformano segnali in proposte.", detail: "MarginRIM™ · StockRIM™ · FocusRIM™ · SmartRIM™", href: "/producto/inteligencia-dinamica" },
      { name: "SAVia", verb: "Spiega", description: "Permette di chiedere, confrontare e preparare decisioni.", detail: "Evidenze · impatto · alternative · anteprima", href: "/producto/savia" },
    ],
  },
  de: {
    eyebrow: "Winerim Architektur", title: "Vom verstreuten Dokument zur freigegebenen Entscheidung", subtitle: "Jede Fähigkeit hat eine klare Aufgabe. Zusammen bilden sie ein System für Karte, physischen Keller, Rentabilität, Einkauf und Entscheidung.", flow: ["Daten", "Betrieb", "Rentabilität", "Entscheidung", "Freigabe"],
    layers: [
      { name: "Winerim Core", verb: "Betreibt", description: "Eine Datenbasis für Karte und physischen Keller.", detail: "Core Karte · Bestand · Wine Cellar · Wine Lockers", href: "/producto/winerim-core" },
      { name: "CloudRIM", verb: "Sammelt", description: "Empfängt, klassifiziert und leitet Dokumente und Daten weiter.", detail: "Karten · Belege · Rechnungen · Preislisten · Verkauf", href: "/producto/cloudrim" },
      { name: "Margen", verb: "Schützt", description: "Erklärt Rentabilität, Erosion und gebundenes Kapital.", detail: "Echte Kosten · Preis · Glas · Rotation · Simulation", href: "/producto/winerim-core#core-margins" },
      { name: "Winerim Supply", verb: "Kauft", description: "Macht aus Nachfrage, Bestand und Preisen Einkaufskriterien.", detail: "Vergleich · Nachkauf · Verhandlung · Bestellung", href: "/producto/winerim-supply" },
      { name: "RIMs™", verb: "Erkennt", description: "Spezialisierte Engines verwandeln Signale in Vorschläge.", detail: "MarginRIM™ · StockRIM™ · FocusRIM™ · SmartRIM™", href: "/producto/inteligencia-dinamica" },
      { name: "SAVia", verb: "Erklärt", description: "Ermöglicht Fragen, Vergleiche und Entscheidungsvorbereitung.", detail: "Belege · Wirkung · Alternativen · Vorschau", href: "/producto/savia" },
    ],
  },
  pt: {
    eyebrow: "Arquitetura Winerim", title: "Do documento disperso à decisão aprovada", subtitle: "Cada capacidade tem uma função concreta. Juntas formam um sistema para carta, garrafeira física, rentabilidade, compras e decisão.", flow: ["Dados", "Operação", "Rentabilidade", "Decisão", "Aprovação"],
    layers: [
      { name: "Winerim Core", verb: "Opera", description: "Uma fonte de verdade para carta e garrafeira física.", detail: "Core Carta · stock · Wine Cellar · Wine Lockers", href: "/producto/winerim-core" },
      { name: "CloudRIM", verb: "Recolhe", description: "Recebe, classifica e encaminha documentos e dados.", detail: "Cartas · guias · faturas · tabelas · vendas", href: "/producto/cloudrim" },
      { name: "Margens", verb: "Protege", description: "Explica rentabilidade, erosão e capital imobilizado.", detail: "Custo real · preço · copo · rotação · simulação", href: "/producto/winerim-core#core-margins" },
      { name: "Winerim Supply", verb: "Compra", description: "Transforma procura, stock e tabelas em critérios de compra.", detail: "Comparação · reposição · negociação · pedido", href: "/producto/winerim-supply" },
      { name: "RIMs™", verb: "Deteta", description: "Motores especializados transformam sinais em propostas.", detail: "MarginRIM™ · StockRIM™ · FocusRIM™ · SmartRIM™", href: "/producto/inteligencia-dinamica" },
      { name: "SAVia", verb: "Explica", description: "Permite perguntar, comparar e preparar decisões.", detail: "Evidência · impacto · alternativas · prévia", href: "/producto/savia" },
    ],
  },
};

const styles = [
  { icon: Wine, accent: "text-wine", bg: "bg-wine/10", border: "border-wine/25" },
  { icon: Cloud, accent: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/25" },
  { icon: BarChart3, accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
  { icon: ShoppingCart, accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" },
  { icon: BrainCircuit, accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/25" },
  { icon: MessageSquareText, accent: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25" },
];

const ProductArchitectureSection = () => {
  const { lang, localePath } = useLanguage();
  const t = getI18n(copy, lang) || copy.es;

  return (
    <section id="arquitectura-winerim" className="border-y border-border bg-gradient-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal className="mx-auto mb-12 max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wine-light">{t.eyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.subtitle}</p>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.layers.map((layer, index) => {
            const style = styles[index];
            const Icon = style.icon;
            return (
              <ScrollReveal key={layer.name} delay={index * 0.05}>
                <Link to={localePath(layer.href)} className={`group flex min-h-[230px] h-full flex-col border ${style.border} bg-card p-6 transition hover:-translate-y-0.5 hover:border-wine/45`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${style.bg}`}>
                      <Icon className={style.accent} size={21} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${style.accent}`}>{layer.verb}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold">{layer.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
                  <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-foreground/65">{layer.detail}</p>
                  <ArrowRight className="mt-auto pt-4 text-wine transition-transform group-hover:translate-x-1" size={28} />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {t.flow.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span>{step}</span>
              {index < t.flow.length - 1 && <ArrowRight size={13} className="text-wine/55" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductArchitectureSection;
