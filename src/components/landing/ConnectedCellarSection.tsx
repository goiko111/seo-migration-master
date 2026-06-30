import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  FileUp,
  ListChecks,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";

interface ConnectedCellarCopy {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
  flowTitle: string;
  flowItems: {
    title: string;
    desc: string;
  }[];
  ctaPrimary: string;
  ctaSecondary: string;
  note: string;
}

const copy: I18nMap<ConnectedCellarCopy> = {
  es: {
    eyebrow: "COMO LO HACE WINERIM",
    title: "Subes albaranes. Vendes botellas. Winerim mantiene",
    highlight: "tu bodega en orden",
    subtitle:
      "Conecta compras, TPV, stock, carta y margen para saber que tienes, que vendes y que referencias conviene mover, revisar o reponer.",
    beforeTitle: "Antes",
    beforeItems: [
      "Excel, recuentos manuales y cartas que se quedan desactualizadas.",
      "Costes de compra que cambian sin que el margen se revise a tiempo.",
      "Decisiones de reposicion basadas en intuicion o memoria.",
    ],
    afterTitle: "Con Winerim",
    afterItems: [
      "Albaranes y facturas alimentan compras, costes y referencias.",
      "Cuando conectas tu TPV, cada venta ayuda a mantener el stock alineado.",
      "La carta, la rotacion y el margen se leen desde el mismo sistema.",
    ],
    flowTitle: "Una bodega conectada de punta a punta",
    flowItems: [
      {
        title: "Compras que entran",
        desc: "Sube albaranes y facturas para controlar costes, proveedores y nuevas referencias sin perseguir hojas de calculo.",
      },
      {
        title: "Ventas que salen",
        desc: "Con la integracion TPV activa, las botellas vendidas alimentan el control de stock y la lectura de rotacion.",
      },
      {
        title: "Carta siempre alineada",
        desc: "Precios, disponibilidad, formatos y recomendaciones se gestionan desde Winerim para evitar PDFs olvidados.",
      },
      {
        title: "Margen visible",
        desc: "Cruza compra, venta, stock y rotacion para detectar vinos estrategicos, referencias dormidas y fugas de margen.",
      },
      {
        title: "Decisiones con datos",
        desc: "Repón, revisa, mueve o retira referencias con señales claras para direccion, sumiller y equipo de sala.",
      },
    ],
    ctaPrimary: "Ver Winerim en una demo",
    ctaSecondary: "Analizar mi carta",
    note: "El alcance de automatizacion depende de las integraciones activas y del flujo operativo de cada restaurante.",
  },
  en: {
    eyebrow: "HOW WINERIM WORKS",
    title: "Upload invoices. Sell bottles. Winerim keeps",
    highlight: "your cellar under control",
    subtitle:
      "Connect purchases, POS, stock, wine list and margin to know what you have, what sells and which references to move, review or restock.",
    beforeTitle: "Before",
    beforeItems: [
      "Spreadsheets, manual counts and wine lists that fall out of date.",
      "Purchase costs change while margins are reviewed too late.",
      "Restocking decisions rely on intuition or memory.",
    ],
    afterTitle: "With Winerim",
    afterItems: [
      "Delivery notes and invoices feed purchases, costs and references.",
      "When your POS is connected, every sale helps keep stock aligned.",
      "List, rotation and margin are read from the same system.",
    ],
    flowTitle: "A cellar connected end to end",
    flowItems: [
      {
        title: "Purchases come in",
        desc: "Upload delivery notes and invoices to control costs, suppliers and new references without chasing spreadsheets.",
      },
      {
        title: "Sales go out",
        desc: "With the POS integration active, bottles sold feed stock control and rotation analysis.",
      },
      {
        title: "The list stays aligned",
        desc: "Prices, availability, formats and recommendations are managed from Winerim instead of forgotten PDFs.",
      },
      {
        title: "Margin is visible",
        desc: "Cross purchase, sale, stock and rotation to spot strategic wines, sleeping references and margin leaks.",
      },
      {
        title: "Decisions use data",
        desc: "Restock, review, move or remove references with clear signals for owners, sommeliers and floor teams.",
      },
    ],
    ctaPrimary: "See Winerim in a demo",
    ctaSecondary: "Analyse my wine list",
    note: "Automation scope depends on active integrations and each restaurant's operating workflow.",
  },
  it: {
    eyebrow: "COME FUNZIONA WINERIM",
    title: "Carichi documenti d'acquisto. Vendi bottiglie. Winerim mantiene",
    highlight: "la cantina sotto controllo",
    subtitle:
      "Collega acquisti, cassa, stock, carta e margine per sapere cosa hai, cosa vendi e quali referenze muovere, rivedere o riordinare.",
    beforeTitle: "Prima",
    beforeItems: [
      "Excel, conteggi manuali e carte che restano indietro.",
      "Costi d'acquisto che cambiano senza rivedere il margine in tempo.",
      "Riordini decisi per intuizione o memoria.",
    ],
    afterTitle: "Con Winerim",
    afterItems: [
      "Documenti e fatture alimentano acquisti, costi e referenze.",
      "Quando colleghi il POS, ogni vendita aiuta ad allineare lo stock.",
      "Carta, rotazione e margine si leggono dallo stesso sistema.",
    ],
    flowTitle: "Una cantina collegata dall'acquisto alla carta",
    flowItems: [
      { title: "Entrano gli acquisti", desc: "Carica documenti e fatture per controllare costi, fornitori e nuove referenze senza inseguire fogli di calcolo." },
      { title: "Escono le vendite", desc: "Con l'integrazione POS attiva, le bottiglie vendute alimentano stock e analisi della rotazione." },
      { title: "La carta resta allineata", desc: "Prezzi, disponibilita, formati e raccomandazioni si gestiscono da Winerim, non da PDF dimenticati." },
      { title: "Il margine e visibile", desc: "Incrocia acquisto, vendita, stock e rotazione per individuare vini strategici, referenze ferme e perdite di margine." },
      { title: "Decisioni con dati", desc: "Riordina, rivedi, sposta o ritira referenze con segnali chiari per direzione, sommelier e sala." },
    ],
    ctaPrimary: "Vedere Winerim in demo",
    ctaSecondary: "Analizzare la mia carta",
    note: "Il livello di automazione dipende dalle integrazioni attive e dal flusso operativo del ristorante.",
  },
  fr: {
    eyebrow: "COMMENT WINERIM FONCTIONNE",
    title: "Vous importez vos factures. Vous vendez des bouteilles. Winerim garde",
    highlight: "votre cave sous controle",
    subtitle:
      "Connectez achats, caisse, stock, carte et marge pour savoir ce que vous avez, ce qui se vend et quelles references bouger, revoir ou recommander.",
    beforeTitle: "Avant",
    beforeItems: [
      "Excel, comptages manuels et cartes qui ne suivent plus la cave.",
      "Couts d'achat qui changent sans revision rapide des marges.",
      "Reassorts decides a l'intuition ou de memoire.",
    ],
    afterTitle: "Avec Winerim",
    afterItems: [
      "Bons de livraison et factures alimentent achats, couts et references.",
      "Quand la caisse est connectee, chaque vente aide a aligner le stock.",
      "Carte, rotation et marge se lisent dans le meme systeme.",
    ],
    flowTitle: "Une cave connectee de bout en bout",
    flowItems: [
      { title: "Les achats entrent", desc: "Importez bons et factures pour suivre couts, fournisseurs et nouvelles references sans multiplier les tableurs." },
      { title: "Les ventes sortent", desc: "Avec l'integration caisse active, les bouteilles vendues alimentent le stock et l'analyse de rotation." },
      { title: "La carte reste alignee", desc: "Prix, disponibilite, formats et recommandations se gerent dans Winerim au lieu de PDF oublies." },
      { title: "La marge devient visible", desc: "Croisez achat, vente, stock et rotation pour reperer vins strategiques, references dormantes et fuites de marge." },
      { title: "Les decisions ont des donnees", desc: "Recommandez, revoyez, mettez en avant ou retirez des references avec des signaux clairs." },
    ],
    ctaPrimary: "Voir Winerim en demo",
    ctaSecondary: "Analyser ma carte",
    note: "Le niveau d'automatisation depend des integrations actives et du fonctionnement de chaque restaurant.",
  },
  de: {
    eyebrow: "WIE WINERIM ARBEITET",
    title: "Sie laden Belege hoch. Sie verkaufen Flaschen. Winerim halt",
    highlight: "Ihren Keller im Griff",
    subtitle:
      "Verbinden Sie Einkauf, Kassensystem, Bestand, Weinkarte und Marge, um zu wissen, was da ist, was verkauft wird und welche Positionen bewegt, gepruft oder nachbestellt werden sollten.",
    beforeTitle: "Vorher",
    beforeItems: [
      "Excel, manuelle Zahlungen und Weinkarten, die nicht mehr aktuell sind.",
      "Einkaufspreise andern sich, wahrend Margen zu spat gepruft werden.",
      "Nachbestellungen basieren auf Bauchgefuhl oder Erinnerung.",
    ],
    afterTitle: "Mit Winerim",
    afterItems: [
      "Lieferscheine und Rechnungen speisen Einkauf, Kosten und Referenzen.",
      "Wenn das Kassensystem verbunden ist, hilft jeder Verkauf, den Bestand abzugleichen.",
      "Karte, Rotation und Marge werden im selben System gelesen.",
    ],
    flowTitle: "Ein Weinkeller, der vom Einkauf bis zur Karte verbunden ist",
    flowItems: [
      { title: "Einkaufe kommen rein", desc: "Laden Sie Belege und Rechnungen hoch, um Kosten, Lieferanten und neue Referenzen ohne Tabellenjagd zu steuern." },
      { title: "Verkaufe gehen raus", desc: "Mit aktiver Kassenintegration fliesen verkaufte Flaschen in Bestandskontrolle und Rotationsanalyse ein." },
      { title: "Die Karte bleibt aktuell", desc: "Preise, Verfugbarkeit, Formate und Empfehlungen werden in Winerim gepflegt statt in vergessenen PDFs." },
      { title: "Marge wird sichtbar", desc: "Kombinieren Sie Einkauf, Verkauf, Bestand und Rotation, um strategische Weine, ruhende Positionen und Margenverluste zu erkennen." },
      { title: "Entscheidungen nutzen Daten", desc: "Nachbestellen, prufen, hervorheben oder entfernen mit klaren Signalen fur Leitung, Sommelier und Service." },
    ],
    ctaPrimary: "Winerim in einer Demo sehen",
    ctaSecondary: "Meine Karte analysieren",
    note: "Der Automatisierungsgrad hangt von aktiven Integrationen und dem Betriebsablauf jedes Restaurants ab.",
  },
  pt: {
    eyebrow: "COMO A WINERIM FAZ",
    title: "Carrega faturas. Vende garrafas. A Winerim mantem",
    highlight: "a garrafeira sob controlo",
    subtitle:
      "Liga compras, POS, stock, carta e margem para saber o que tem, o que vende e que referencias deve mover, rever ou repor.",
    beforeTitle: "Antes",
    beforeItems: [
      "Excel, contagens manuais e cartas que ficam desatualizadas.",
      "Custos de compra mudam sem rever a margem a tempo.",
      "Reposicoes decididas por intuicao ou memoria.",
    ],
    afterTitle: "Com a Winerim",
    afterItems: [
      "Guias, faturas e documentos alimentam compras, custos e referencias.",
      "Quando liga o POS, cada venda ajuda a manter o stock alinhado.",
      "Carta, rotacao e margem sao lidas no mesmo sistema.",
    ],
    flowTitle: "Uma garrafeira ligada de ponta a ponta",
    flowItems: [
      { title: "As compras entram", desc: "Carregue documentos e faturas para controlar custos, fornecedores e novas referencias sem depender de folhas de calculo." },
      { title: "As vendas saem", desc: "Com a integracao POS ativa, as garrafas vendidas alimentam stock e analise de rotacao." },
      { title: "A carta fica alinhada", desc: "Precos, disponibilidade, formatos e recomendacoes sao geridos na Winerim, nao em PDFs esquecidos." },
      { title: "A margem fica visivel", desc: "Cruze compra, venda, stock e rotacao para detetar vinhos estrategicos, referencias paradas e fugas de margem." },
      { title: "Decisoes com dados", desc: "Repor, rever, mover ou retirar referencias com sinais claros para direcao, escancao e equipa de sala." },
    ],
    ctaPrimary: "Ver Winerim numa demo",
    ctaSecondary: "Analisar a minha carta",
    note: "O alcance da automacao depende das integracoes ativas e do fluxo operacional de cada restaurante.",
  },
};

const flowIcons = [FileUp, ShoppingCart, ListChecks, BarChart3, PackageCheck];

const ConnectedCellarSection = () => {
  const { lang, localePath } = useLanguage();
  const t = getI18n(copy, lang);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5 max-w-4xl mx-auto">
            {t.title} <span className="text-gradient-wine italic">{t.highlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-start">
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-7">
                <h3 className="font-heading text-xl font-bold mb-4">{t.beforeTitle}</h3>
                <ul className="space-y-3">
                  {t.beforeItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-wine/25 bg-wine/5 p-6 md:p-7">
                <h3 className="font-heading text-xl font-bold mb-4">{t.afterTitle}</h3>
                <ul className="space-y-3">
                  {t.afterItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-wine shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card/60 p-5 md:p-6">
              <h3 className="font-heading text-2xl font-bold mb-6">{t.flowTitle}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.flowItems.map((item, i) => {
                  const Icon = flowIcons[i] || PackageCheck;
                  return (
                    <div
                      key={item.title}
                      className="group rounded-xl border border-border bg-gradient-card p-5 hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10 group-hover:bg-wine/15 transition-colors">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl border border-border bg-gradient-card p-5 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {t.note}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-wine px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-all"
              >
                {t.ctaPrimary}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={localePath("/analisis-carta")}
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-wine/30 hover:bg-secondary transition-all"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ConnectedCellarSection;
