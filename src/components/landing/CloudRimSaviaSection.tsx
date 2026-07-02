import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Cloud, MessageSquare } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";

type SectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string[];
  bullets: string[];
  primaryCta: string;
  secondaryCta: string;
  cards: {
    title: string;
    desc: string;
    href: string;
    cta: string;
    kind: "cloud" | "chat";
  }[];
};

const copy: I18nMap<SectionCopy> = {
  es: {
    eyebrow: "CloudRIM + SAVia",
    title: "CloudRIM y SAVia: menos trabajo manual, mas decisiones con datos reales",
    subtitle: [
      "Winerim no solo digitaliza tu carta. Tambien recoge documentos, ventas, stock, albaranes y tarifas de distribuidores, los interpreta con IA y los convierte en acciones dentro de la plataforma.",
      "CloudRIM actua como la nube operativa del restaurante: subes o conectas la informacion una vez y Winerim la lleva al lugar correcto.",
      "SAVia es el agente conversacional de Winerim: puedes preguntarle que esta pasando con tu carta, que vinos no rotan, que costes han cambiado o que deberias revisar antes de comprar.",
    ],
    bullets: [
      "Sube cartas, albaranes, ventas, stock y tarifas de distribuidores.",
      "Conecta TPV, email, carpetas compartidas o FTP/SFTP.",
      "Detecta cambios de coste, rotacion, stock y margen.",
      "Pregunta a SAVia y recibe respuestas accionables sobre tu bodega.",
    ],
    primaryCta: "Ver Winerim con mis datos reales",
    secondaryCta: "Conocer CloudRIM y SAVia",
    cards: [
      {
        title: "CloudRIM",
        desc: "La nube operativa que recoge documentos y datos dispersos para llevarlos al flujo correcto dentro de Winerim.",
        href: "/producto/cloudrim",
        cta: "Ver CloudRIM",
        kind: "cloud",
      },
      {
        title: "SAVia",
        desc: "El agente conversacional para preguntar por carta, ventas, stock, costes, margen y oportunidades.",
        href: "/producto/savia",
        cta: "Ver SAVia",
        kind: "chat",
      },
    ],
  },
  en: {
    eyebrow: "CloudRIM + SAVia",
    title: "CloudRIM and SAVia: less manual work, more decisions with real data",
    subtitle: [
      "Winerim does not just digitize your wine list. It also collects documents, sales, stock, delivery notes and distributor tariffs, interprets them with AI and turns them into platform actions.",
      "CloudRIM acts as the restaurant's operating cloud: upload or connect information once and Winerim takes it to the right place.",
      "SAVia is Winerim's conversational agent: ask what is happening with your list, which wines do not rotate, which costs changed or what to review before buying.",
    ],
    bullets: ["Upload lists, delivery notes, sales, stock and tariffs.", "Connect POS, email, shared folders or FTP/SFTP.", "Detect cost, rotation, stock and margin changes.", "Ask SAVia and get actionable cellar answers."],
    primaryCta: "See Winerim with my real data",
    secondaryCta: "Meet CloudRIM and SAVia",
    cards: [
      { title: "CloudRIM", desc: "The operating cloud that collects scattered documents and data and routes them inside Winerim.", href: "/producto/cloudrim", cta: "See CloudRIM", kind: "cloud" },
      { title: "SAVia", desc: "The conversational agent for questions about list, sales, stock, costs, margin and opportunities.", href: "/producto/savia", cta: "See SAVia", kind: "chat" },
    ],
  },
  it: {
    eyebrow: "CloudRIM + SAVia",
    title: "CloudRIM e SAVia: meno lavoro manuale, piu decisioni con dati reali",
    subtitle: [
      "Winerim non digitalizza solo la carta. Raccoglie documenti, vendite, stock, documenti d'acquisto e tariffe, li interpreta con IA e li converte in azioni.",
      "CloudRIM e la nube operativa del ristorante: carichi o colleghi le informazioni e Winerim le porta nel punto giusto.",
      "SAVia e l'agente conversazionale di Winerim per chiedere cosa succede alla carta, quali vini non ruotano o quali costi sono cambiati.",
    ],
    bullets: ["Carica carte, documenti, vendite, stock e tariffe.", "Collega POS, email, cartelle o FTP/SFTP.", "Rileva cambi di costo, rotazione, stock e margine.", "Chiedi a SAVia e ricevi risposte operative."],
    primaryCta: "Vedere Winerim con i miei dati",
    secondaryCta: "Conoscere CloudRIM e SAVia",
    cards: [
      { title: "CloudRIM", desc: "La nube operativa che raccoglie documenti e dati dispersi e li porta nel flusso corretto.", href: "/producto/cloudrim", cta: "Vedi CloudRIM", kind: "cloud" },
      { title: "SAVia", desc: "L'agente conversazionale per domande su carta, vendite, stock, costi, margini e opportunita.", href: "/producto/savia", cta: "Vedi SAVia", kind: "chat" },
    ],
  },
  fr: {
    eyebrow: "CloudRIM + SAVia",
    title: "CloudRIM et SAVia : moins de travail manuel, plus de decisions avec des donnees reelles",
    subtitle: [
      "Winerim ne digitalise pas seulement la carte. Il collecte documents, ventes, stock, bons et tarifs, les interprete avec l'IA et les transforme en actions.",
      "CloudRIM agit comme le cloud operationnel du restaurant : vous importez ou connectez l'information et Winerim l'achemine au bon endroit.",
      "SAVia est l'agent conversationnel de Winerim pour demander ce qui se passe dans la carte, quels vins ne tournent pas ou quels couts ont change.",
    ],
    bullets: ["Importez cartes, bons, ventes, stock et tarifs.", "Connectez caisse, email, dossiers ou FTP/SFTP.", "Detectez cout, rotation, stock et marge.", "Demandez a SAVia des reponses actionnables."],
    primaryCta: "Voir Winerim avec mes donnees",
    secondaryCta: "Decouvrir CloudRIM et SAVia",
    cards: [
      { title: "CloudRIM", desc: "Le cloud operationnel qui collecte documents et donnees dispersees pour les router dans Winerim.", href: "/producto/cloudrim", cta: "Voir CloudRIM", kind: "cloud" },
      { title: "SAVia", desc: "L'agent conversationnel pour interroger carte, ventes, stock, couts, marges et opportunites.", href: "/producto/savia", cta: "Voir SAVia", kind: "chat" },
    ],
  },
  de: {
    eyebrow: "CloudRIM + SAVia",
    title: "CloudRIM und SAVia: weniger manuelle Arbeit, mehr Entscheidungen mit echten Daten",
    subtitle: [
      "Winerim digitalisiert nicht nur die Karte. Es sammelt Dokumente, Verkauf, Bestand, Lieferscheine und Tarife, interpretiert sie mit KI und macht daraus Aktionen.",
      "CloudRIM ist die operative Cloud des Restaurants: Informationen werden einmal hochgeladen oder verbunden und Winerim bringt sie an den richtigen Ort.",
      "SAVia ist der Konversationsagent von Winerim fur Fragen zu Karte, Rotation, Kosten und Einkaufspruefung.",
    ],
    bullets: ["Karten, Belege, Verkauf, Bestand und Tarife hochladen.", "POS, E-Mail, Ordner oder FTP/SFTP verbinden.", "Kosten-, Rotations-, Bestands- und Margenaenderungen erkennen.", "SAVia fragen und nutzbare Antworten erhalten."],
    primaryCta: "Winerim mit meinen Daten sehen",
    secondaryCta: "CloudRIM und SAVia kennenlernen",
    cards: [
      { title: "CloudRIM", desc: "Die operative Cloud, die verstreute Dokumente und Daten sammelt und in Winerim routet.", href: "/producto/cloudrim", cta: "CloudRIM ansehen", kind: "cloud" },
      { title: "SAVia", desc: "Der Konversationsagent fur Fragen zu Karte, Verkauf, Bestand, Kosten, Marge und Chancen.", href: "/producto/savia", cta: "SAVia ansehen", kind: "chat" },
    ],
  },
  pt: {
    eyebrow: "CloudRIM + SAVia",
    title: "CloudRIM e SAVia: menos trabalho manual, mais decisões com dados reais",
    subtitle: [
      "Winerim nao digitaliza apenas a carta. Tambem recolhe documentos, vendas, stock, guias e tabelas, interpreta com IA e transforma em ações.",
      "CloudRIM atua como a nuvem operacional do restaurante: carrega ou liga a informacao uma vez e a Winerim leva-a ao lugar certo.",
      "SAVia e o agente conversacional da Winerim para perguntar o que acontece com a carta, que vinhos nao rodam ou que custos mudaram.",
    ],
    bullets: ["Carregue cartas, guias, vendas, stock e tabelas.", "Ligue POS, email, pastas ou FTP/SFTP.", "Detete mudanças de custo, rotação, stock e margem.", "Pergunte a SAVia e receba respostas acionáveis."],
    primaryCta: "Ver Winerim com os meus dados",
    secondaryCta: "Conhecer CloudRIM e SAVia",
    cards: [
      { title: "CloudRIM", desc: "A nuvem operacional que recolhe documentos e dados dispersos e encaminha-os dentro da Winerim.", href: "/producto/cloudrim", cta: "Ver CloudRIM", kind: "cloud" },
      { title: "SAVia", desc: "O agente conversacional para perguntas sobre carta, vendas, stock, custos, margem e oportunidades.", href: "/producto/savia", cta: "Ver SAVia", kind: "chat" },
    ],
  },
};

const CloudRimSaviaSection = () => {
  const { lang, localePath } = useLanguage();
  const t = getI18n(copy, lang);

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_0.95fr] gap-12 items-start">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-4">
              <span className="w-1 h-1 rounded-full bg-wine/50" />
              {t.eyebrow}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              {t.title}
            </h2>
            <div className="space-y-4 mb-8">
              {t.subtitle.map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {t.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-wine shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
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
          </ScrollReveal>

          <div className="grid gap-5">
            {t.cards.map((card, index) => {
              const Icon = card.kind === "cloud" ? Cloud : MessageSquare;
              return (
                <ScrollReveal key={card.title} delay={index * 0.08}>
                  <Link
                    to={localePath(card.href)}
                    className="group block rounded-xl border border-border bg-card/70 p-6 hover:border-wine/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-wine">
                          {card.cta} <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudRimSaviaSection;
