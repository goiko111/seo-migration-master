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

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cards: { title: string; desc: string; more: string; href: string }[];
};

const i18n: I18nMap<Copy> = {
  es: {
    eyebrow: "Sistema operativo del vino",
    title: "Seis capacidades, una sola operacion",
    subtitle: "Winerim conecta carta, bodega, documentos, rentabilidad, compras y decisiones sin obligar al equipo a trabajar en sistemas separados.",
    ctaPrimary: "Ver funcionalidades",
    ctaSecondary: "Solicitar demo",
    cards: [
      { title: "Winerim Core", desc: "Carta, stock, Wine Cellar y Wine Lockers en una fuente de verdad.", more: "Ver Core", href: "/producto/winerim-core" },
      { title: "CloudRIM", desc: "Recibe y clasifica cartas, albaranes, facturas, ventas y tarifas.", more: "Ver CloudRIM", href: "/producto/cloudrim" },
      { title: "Margins", desc: "Explica margen real, erosion, rotacion y capital inmovilizado.", more: "Ver margenes", href: "/producto/winerim-core#core-margins" },
      { title: "Supply", desc: "Compara tarifas y prepara reposicion, negociacion y compra.", more: "Ver Supply", href: "/producto/winerim-supply" },
      { title: "RIMs™", desc: "Motores especializados convierten senales operativas en propuestas.", more: "Ver RIMs", href: "/producto/inteligencia-dinamica" },
      { title: "SAVia", desc: "Permite preguntar, comparar y preparar decisiones con evidencia.", more: "Ver SAVia", href: "/producto/savia" },
    ],
  },
  en: {
    eyebrow: "Wine operating system",
    title: "Six capabilities, one operation",
    subtitle: "Winerim connects the wine list, cellar, documents, profitability, purchasing and decisions without forcing teams into separate systems.",
    ctaPrimary: "See features",
    ctaSecondary: "Request a demo",
    cards: [
      { title: "Winerim Core", desc: "List, stock, Wine Cellar and Wine Lockers in one source of truth.", more: "See Core", href: "/producto/winerim-core" },
      { title: "CloudRIM", desc: "Receives and classifies lists, delivery notes, invoices, sales and catalogues.", more: "See CloudRIM", href: "/producto/cloudrim" },
      { title: "Margins", desc: "Explains true margin, erosion, rotation and tied-up capital.", more: "See margins", href: "/producto/winerim-core#core-margins" },
      { title: "Supply", desc: "Compares catalogues and prepares replenishment, negotiation and purchasing.", more: "See Supply", href: "/producto/winerim-supply" },
      { title: "RIMs™", desc: "Specialist engines turn operating signals into proposals.", more: "See RIMs", href: "/producto/inteligencia-dinamica" },
      { title: "SAVia", desc: "Lets teams ask, compare and prepare decisions with evidence.", more: "See SAVia", href: "/producto/savia" },
    ],
  },
  fr: {
    eyebrow: "Systeme d'exploitation du vin",
    title: "Six capacites, une seule operation",
    subtitle: "Winerim relie la carte, la cave, les documents, la rentabilite, les achats et les decisions sans multiplier les systemes.",
    ctaPrimary: "Voir les fonctionnalites",
    ctaSecondary: "Demander une demo",
    cards: [
      { title: "Winerim Core", desc: "Carte, stock, Wine Cellar et Wine Lockers dans une source unique.", more: "Voir Core", href: "/producto/winerim-core" },
      { title: "CloudRIM", desc: "Recoit et classe cartes, bons, factures, ventes et tarifs.", more: "Voir CloudRIM", href: "/producto/cloudrim" },
      { title: "Margins", desc: "Explique marge reelle, erosion, rotation et capital immobilise.", more: "Voir les marges", href: "/producto/winerim-core#core-margins" },
      { title: "Supply", desc: "Compare les tarifs et prepare reassort, negociation et achat.", more: "Voir Supply", href: "/producto/winerim-supply" },
      { title: "RIMs™", desc: "Des moteurs specialises transforment les signaux en propositions.", more: "Voir RIMs", href: "/producto/inteligencia-dinamica" },
      { title: "SAVia", desc: "Permet d'interroger, comparer et preparer des decisions etayees.", more: "Voir SAVia", href: "/producto/savia" },
    ],
  },
  it: {
    eyebrow: "Sistema operativo del vino",
    title: "Sei capacita, un'unica operazione",
    subtitle: "Winerim collega carta, cantina, documenti, redditivita, acquisti e decisioni senza imporre sistemi separati.",
    ctaPrimary: "Vedi le funzionalita",
    ctaSecondary: "Richiedi una demo",
    cards: [
      { title: "Winerim Core", desc: "Carta, stock, Wine Cellar e Wine Lockers in un'unica fonte.", more: "Vedi Core", href: "/producto/winerim-core" },
      { title: "CloudRIM", desc: "Riceve e classifica carte, bolle, fatture, vendite e listini.", more: "Vedi CloudRIM", href: "/producto/cloudrim" },
      { title: "Margins", desc: "Spiega margine reale, erosione, rotazione e capitale immobilizzato.", more: "Vedi i margini", href: "/producto/winerim-core#core-margins" },
      { title: "Supply", desc: "Confronta listini e prepara riordino, negoziazione e acquisto.", more: "Vedi Supply", href: "/producto/winerim-supply" },
      { title: "RIMs™", desc: "Motori specializzati trasformano segnali operativi in proposte.", more: "Vedi RIMs", href: "/producto/inteligencia-dinamica" },
      { title: "SAVia", desc: "Permette di chiedere, confrontare e preparare decisioni con evidenze.", more: "Vedi SAVia", href: "/producto/savia" },
    ],
  },
  de: {
    eyebrow: "Betriebssystem fur Wein",
    title: "Sechs Fahigkeiten, ein Betrieb",
    subtitle: "Winerim verbindet Karte, Keller, Dokumente, Rentabilitat, Einkauf und Entscheidungen, ohne getrennte Systeme zu erzwingen.",
    ctaPrimary: "Funktionen ansehen",
    ctaSecondary: "Demo anfragen",
    cards: [
      { title: "Winerim Core", desc: "Karte, Bestand, Wine Cellar und Wine Lockers in einer Datenbasis.", more: "Core ansehen", href: "/producto/winerim-core" },
      { title: "CloudRIM", desc: "Empfangt und klassifiziert Karten, Belege, Rechnungen, Verkauf und Preise.", more: "CloudRIM ansehen", href: "/producto/cloudrim" },
      { title: "Margins", desc: "Erklart echte Marge, Erosion, Rotation und gebundenes Kapital.", more: "Margen ansehen", href: "/producto/winerim-core#core-margins" },
      { title: "Supply", desc: "Vergleicht Preise und bereitet Nachkauf, Verhandlung und Einkauf vor.", more: "Supply ansehen", href: "/producto/winerim-supply" },
      { title: "RIMs™", desc: "Spezialisierte Engines verwandeln Betriebssignale in Vorschlage.", more: "RIMs ansehen", href: "/producto/inteligencia-dinamica" },
      { title: "SAVia", desc: "Ermoglicht Fragen, Vergleiche und belegte Entscheidungsvorbereitung.", more: "SAVia ansehen", href: "/producto/savia" },
    ],
  },
  pt: {
    eyebrow: "Sistema operativo do vinho",
    title: "Seis capacidades, uma unica operacao",
    subtitle: "A Winerim liga carta, garrafeira, documentos, rentabilidade, compras e decisoes sem obrigar a equipa a usar sistemas separados.",
    ctaPrimary: "Ver funcionalidades",
    ctaSecondary: "Pedir demo",
    cards: [
      { title: "Winerim Core", desc: "Carta, stock, Wine Cellar e Wine Lockers numa fonte de verdade.", more: "Ver Core", href: "/producto/winerim-core" },
      { title: "CloudRIM", desc: "Recebe e classifica cartas, guias, faturas, vendas e tabelas.", more: "Ver CloudRIM", href: "/producto/cloudrim" },
      { title: "Margins", desc: "Explica margem real, erosao, rotacao e capital imobilizado.", more: "Ver margens", href: "/producto/winerim-core#core-margins" },
      { title: "Supply", desc: "Compara tabelas e prepara reposicao, negociacao e compra.", more: "Ver Supply", href: "/producto/winerim-supply" },
      { title: "RIMs™", desc: "Motores especializados transformam sinais operacionais em propostas.", more: "Ver RIMs", href: "/producto/inteligencia-dinamica" },
      { title: "SAVia", desc: "Permite perguntar, comparar e preparar decisoes com evidencia.", more: "Ver SAVia", href: "/producto/savia" },
    ],
  },
};

const icons = [Wine, Cloud, BarChart3, ShoppingCart, BrainCircuit, MessageSquareText];

const OperationalCapabilitiesTeaser = () => {
  const { lang, localePath } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  return (
    <section className="border-y border-border bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <ScrollReveal>
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">{t.title}</h2>
            <p className="text-base text-muted-foreground md:text-lg">{t.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <ScrollReveal key={card.title} delay={index * 60}>
                <Link
                  to={localePath(card.href)}
                  className="group flex h-full min-h-[190px] flex-col border border-border bg-card p-5 transition hover:border-primary"
                >
                  <Icon className="text-primary" size={21} />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    {card.more} <ArrowRight size={14} />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to={localePath("/funcionalidades")} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            {t.ctaPrimary} <ArrowRight size={16} />
          </Link>
          <Link to={localePath("/demo")} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary">
            {t.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OperationalCapabilitiesTeaser;
