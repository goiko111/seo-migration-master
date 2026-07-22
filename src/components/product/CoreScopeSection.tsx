import { ArrowRight, ChartNoAxesCombined, LockKeyhole, MapPinned, Wine } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";

type CoreScopeCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  listTitle: string;
  listDescription: string;
  listItems: string[];
  cellarTitle: string;
  cellarDescription: string;
  cellarItems: { title: string; description: string }[];
  decisionTitle: string;
  decisionDescription: string;
  decisionFlow: string[];
};

const copy: I18nMap<CoreScopeCopy> = {
  es: {
    eyebrow: "El alcance de Winerim Core",
    title: "Una referencia. Dos superficies operativas.",
    subtitle: "Core mantiene sincronizado lo que el cliente ve con lo que el equipo gestiona físicamente en la bodega.",
    listTitle: "Core Carta",
    listDescription: "La fuente de verdad comercial de cada referencia, formato y disponibilidad.",
    listItems: ["Carta digital y perfiles de vino", "Precios, formatos y venta por copa", "Filtros, maridajes y recomendaciones", "Disponibilidad conectada al stock"],
    cellarTitle: "Core Bodega",
    cellarDescription: "La representación operativa del inventario real y de su ubicación física.",
    cellarItems: [
      { title: "Wine Cellar", description: "Mapas de zonas, botelleros, estantes y posiciones para localizar cada botella." },
      { title: "Wine Lockers", description: "Custodia y trazabilidad del vino privado de clientes, socios y clubes." },
    ],
    decisionTitle: "La misma referencia alimenta la decisión",
    decisionDescription: "Core conecta carta y bodega con coste, margen y rotación. Los RIMs detectan oportunidades y SAVia explica alternativas antes de cualquier aprobación crítica.",
    decisionFlow: ["Carta y bodega", "Márgenes", "RIMs™", "SAVia", "Aprobación humana"],
  },
  en: {
    eyebrow: "The scope of Winerim Core", title: "One reference. Two operating surfaces.", subtitle: "Core keeps what guests see synchronized with what the team physically manages in the cellar.",
    listTitle: "Core List", listDescription: "The commercial source of truth for every reference, format and availability.", listItems: ["Digital list and wine profiles", "Prices, formats and by-the-glass service", "Filters, pairings and recommendations", "Availability connected to stock"],
    cellarTitle: "Core Cellar", cellarDescription: "The operating representation of real inventory and its physical location.", cellarItems: [
      { title: "Wine Cellar", description: "Maps of zones, racks, shelves and positions to locate every bottle." },
      { title: "Wine Lockers", description: "Custody and traceability for private wines belonging to guests, members and clubs." },
    ],
    decisionTitle: "The same reference powers every decision", decisionDescription: "Core connects list and cellar with cost, margin and rotation. RIMs detect opportunities and SAVia explains alternatives before any critical approval.", decisionFlow: ["List and cellar", "Margins", "RIMs™", "SAVia", "Human approval"],
  },
  fr: {
    eyebrow: "Le périmètre de Winerim Core", title: "Une référence. Deux surfaces opérationnelles.", subtitle: "Core synchronise ce que voit le client avec ce que l'équipe gère physiquement dans la cave.",
    listTitle: "Core Carte", listDescription: "La source de vérité commerciale pour chaque référence, format et disponibilité.", listItems: ["Carte digitale et profils de vin", "Prix, formats et service au verre", "Filtres, accords et recommandations", "Disponibilité reliée au stock"],
    cellarTitle: "Core Cave", cellarDescription: "La représentation opérationnelle de l'inventaire réel et de son emplacement physique.", cellarItems: [
      { title: "Wine Cellar", description: "Plans des zones, casiers, étagères et positions pour localiser chaque bouteille." },
      { title: "Wine Lockers", description: "Garde et traçabilité des vins privés des clients, membres et clubs." },
    ],
    decisionTitle: "La même référence alimente la décision", decisionDescription: "Core relie carte et cave au coût, à la marge et à la rotation. Les RIMs détectent les opportunités et SAVia explique les alternatives avant toute validation critique.", decisionFlow: ["Carte et cave", "Marges", "RIMs™", "SAVia", "Validation humaine"],
  },
  it: {
    eyebrow: "Il perimetro di Winerim Core", title: "Una referenza. Due superfici operative.", subtitle: "Core sincronizza ciò che vede il cliente con ciò che il team gestisce fisicamente in cantina.",
    listTitle: "Core Carta", listDescription: "La fonte commerciale unica per ogni referenza, formato e disponibilità.", listItems: ["Carta digitale e profili vino", "Prezzi, formati e servizio al calice", "Filtri, abbinamenti e raccomandazioni", "Disponibilità collegata allo stock"],
    cellarTitle: "Core Cantina", cellarDescription: "La rappresentazione operativa dell'inventario reale e della sua posizione fisica.", cellarItems: [
      { title: "Wine Cellar", description: "Mappe di zone, scaffali, ripiani e posizioni per trovare ogni bottiglia." },
      { title: "Wine Lockers", description: "Custodia e tracciabilità dei vini privati di clienti, soci e club." },
    ],
    decisionTitle: "La stessa referenza alimenta la decisione", decisionDescription: "Core collega carta e cantina a costo, margine e rotazione. I RIMs rilevano opportunità e SAVia spiega le alternative prima di ogni approvazione critica.", decisionFlow: ["Carta e cantina", "Margini", "RIMs™", "SAVia", "Approvazione umana"],
  },
  de: {
    eyebrow: "Der Umfang von Winerim Core", title: "Eine Referenz. Zwei operative Oberflächen.", subtitle: "Core synchronisiert, was Gäste sehen, mit dem, was das Team physisch im Keller verwaltet.",
    listTitle: "Core Karte", listDescription: "Die kommerzielle Datenbasis für jede Referenz, jedes Format und jede Verfügbarkeit.", listItems: ["Digitale Karte und Weinprofile", "Preise, Formate und glasweiser Verkauf", "Filter, Pairings und Empfehlungen", "Mit Bestand verbundene Verfügbarkeit"],
    cellarTitle: "Core Keller", cellarDescription: "Die operative Abbildung des realen Bestands und seines physischen Standorts.", cellarItems: [
      { title: "Wine Cellar", description: "Pläne von Zonen, Regalen, Fächern und Positionen zum Auffinden jeder Flasche." },
      { title: "Wine Lockers", description: "Verwahrung und Nachverfolgung privater Weine von Gästen, Mitgliedern und Clubs." },
    ],
    decisionTitle: "Dieselbe Referenz speist die Entscheidung", decisionDescription: "Core verbindet Karte und Keller mit Kosten, Marge und Rotation. RIMs erkennen Chancen und SAVia erklärt Alternativen vor jeder kritischen Freigabe.", decisionFlow: ["Karte und Keller", "Margen", "RIMs™", "SAVia", "Menschliche Freigabe"],
  },
  pt: {
    eyebrow: "O âmbito do Winerim Core", title: "Uma referência. Duas superfícies operacionais.", subtitle: "O Core sincroniza o que o cliente vê com o que a equipa gere fisicamente na garrafeira.",
    listTitle: "Core Carta", listDescription: "A fonte de verdade comercial de cada referência, formato e disponibilidade.", listItems: ["Carta digital e perfis de vinho", "Preços, formatos e serviço a copo", "Filtros, harmonizações e recomendações", "Disponibilidade ligada ao stock"],
    cellarTitle: "Core Garrafeira", cellarDescription: "A representação operacional do inventário real e da sua localização física.", cellarItems: [
      { title: "Wine Cellar", description: "Mapas de zonas, garrafeiras, prateleiras e posições para localizar cada garrafa." },
      { title: "Wine Lockers", description: "Custódia e rastreabilidade dos vinhos privados de clientes, sócios e clubes." },
    ],
    decisionTitle: "A mesma referência alimenta a decisão", decisionDescription: "O Core liga carta e garrafeira a custo, margem e rotação. Os RIMs detetam oportunidades e o SAVia explica alternativas antes de qualquer aprovação crítica.", decisionFlow: ["Carta e garrafeira", "Margens", "RIMs™", "SAVia", "Aprovação humana"],
  },
};

const CoreScopeSection = () => {
  const { lang } = useLanguage();
  const t = getI18n(copy, lang) || copy.es;

  return (
    <section id="core-scope" className="border-y border-border bg-gradient-dark py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-wine-light">{t.eyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">{t.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{t.subtitle}</p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <article className="h-full border border-wine/25 bg-card p-7 md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-wine/10 text-wine"><Wine size={23} /></div>
              <h3 className="mt-5 font-heading text-2xl font-bold">{t.listTitle}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t.listDescription}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.listItems.map((item) => <li key={item} className="border-l-2 border-wine/45 pl-3 text-sm leading-relaxed text-foreground/75">{item}</li>)}
              </ul>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <article id="core-bodega" className="h-full border border-sky-500/25 bg-card p-7 md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400"><MapPinned size={23} /></div>
              <h3 className="mt-5 font-heading text-2xl font-bold">{t.cellarTitle}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t.cellarDescription}</p>
              <div className="mt-6 space-y-5">
                {t.cellarItems.map((item, index) => {
                  const Icon = index === 0 ? MapPinned : LockKeyhole;
                  return <div key={item.title} className="flex gap-3 border-t border-border pt-4"><Icon className="mt-0.5 shrink-0 text-sky-400" size={18} /><div><h4 className="font-semibold">{item.title}</h4><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p></div></div>;
                })}
              </div>
            </article>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.12}>
          <div id="core-margins" className="mt-8 border border-emerald-500/25 bg-emerald-500/[0.05] p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3"><ChartNoAxesCombined className="text-emerald-400" size={22} /><h3 className="font-heading text-xl font-bold">{t.decisionTitle}</h3></div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{t.decisionDescription}</p>
              </div>
              <div className="flex max-w-xl flex-wrap items-center gap-2 text-xs font-semibold uppercase text-foreground/75">
                {t.decisionFlow.map((step, index) => <div key={step} className="flex items-center gap-2"><span>{step}</span>{index < t.decisionFlow.length - 1 && <ArrowRight className="text-wine" size={13} />}</div>)}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CoreScopeSection;
