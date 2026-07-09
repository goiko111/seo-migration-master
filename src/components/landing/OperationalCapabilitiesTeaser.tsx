import { Link } from "react-router-dom";
import { Cloud, MessageSquare, MapPinned, LockKeyhole, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cards: { title: string; desc: string; more: string }[];
};

const i18n: I18nMap<Copy> = {
  es: {
    eyebrow: "Capacidades operativas",
    title: "Una plataforma para carta, stock, compras y bodega",
    subtitle: "CloudRIM recoge datos, SAVia los convierte en respuestas y los módulos de bodega mantienen ubicaciones físicas y lockers privados bajo control.",
    ctaPrimary: "Ver funcionalidades",
    ctaSecondary: "Solicitar demo",
    cards: [
      { title: "CloudRIM", desc: "Cartas, ventas, albaranes, facturas, stock y tarifas entran por los canales que ya usa el restaurante.", more: "Descubrir CloudRIM" },
      { title: "SAVia", desc: "Pregunta por carta, ventas, stock, costes, márgenes y oportunidades sin perderte en dashboards.", more: "Descubrir SAVia" },
      { title: "Wine Cellar", desc: "Ubicación física de botellas por zonas, botelleros, estanterías y posiciones conectadas al stock.", more: "Ver Wine Cellar" },
      { title: "Wine Lockers", desc: "Gestión de vinos privados para clientes, socios, clubes y experiencias premium.", more: "Ver Wine Lockers" },
    ],
  },
  en: {
    eyebrow: "Operational capabilities",
    title: "One platform for wine list, stock, purchasing and cellar",
    subtitle: "CloudRIM gathers the data, SAVia turns it into answers, and the cellar modules keep physical locations and private lockers under control.",
    ctaPrimary: "See features",
    ctaSecondary: "Request a demo",
    cards: [
      { title: "CloudRIM", desc: "Wine lists, sales, delivery notes, invoices, stock and price lists come in through the channels the restaurant already uses.", more: "Discover CloudRIM" },
      { title: "SAVia", desc: "Ask about wine list, sales, stock, costs, margins and opportunities without getting lost in dashboards.", more: "Discover SAVia" },
      { title: "Wine Cellar", desc: "Physical bottle location by zones, racks, shelves and positions connected to real stock.", more: "See Wine Cellar" },
      { title: "Wine Lockers", desc: "Private wine management for guests, members, clubs and premium experiences.", more: "See Wine Lockers" },
    ],
  },
  it: {
    eyebrow: "Capacità operative",
    title: "Una piattaforma per carta, stock, acquisti e cantina",
    subtitle: "CloudRIM raccoglie i dati, SAVia li trasforma in risposte e i moduli di cantina mantengono sotto controllo posizioni fisiche e locker privati.",
    ctaPrimary: "Vedi le funzionalità",
    ctaSecondary: "Richiedi una demo",
    cards: [
      { title: "CloudRIM", desc: "Carte, vendite, bolle, fatture, stock e listini entrano dai canali già usati dal ristorante.", more: "Scopri CloudRIM" },
      { title: "SAVia", desc: "Chiedi di carta, vendite, stock, costi, margini e opportunità senza perderti nei dashboard.", more: "Scopri SAVia" },
      { title: "Wine Cellar", desc: "Posizione fisica delle bottiglie per zone, scaffali, ripiani e posizioni collegate allo stock reale.", more: "Vedi Wine Cellar" },
      { title: "Wine Lockers", desc: "Gestione di vini privati per clienti, soci, club ed esperienze premium.", more: "Vedi Wine Lockers" },
    ],
  },
  fr: {
    eyebrow: "Capacités opérationnelles",
    title: "Une plateforme pour la carte, le stock, les achats et la cave",
    subtitle: "CloudRIM collecte les données, SAVia les transforme en réponses et les modules de cave gardent sous contrôle les emplacements physiques et les lockers privés.",
    ctaPrimary: "Voir les fonctionnalités",
    ctaSecondary: "Demander une démo",
    cards: [
      { title: "CloudRIM", desc: "Cartes, ventes, bons de livraison, factures, stock et tarifs arrivent par les canaux déjà utilisés par le restaurant.", more: "Découvrir CloudRIM" },
      { title: "SAVia", desc: "Posez des questions sur la carte, les ventes, le stock, les coûts, les marges et les opportunités sans vous perdre dans les tableaux de bord.", more: "Découvrir SAVia" },
      { title: "Wine Cellar", desc: "Emplacement physique des bouteilles par zones, casiers, étagères et positions connectés au stock réel.", more: "Voir Wine Cellar" },
      { title: "Wine Lockers", desc: "Gestion de vins privés pour clients, membres, clubs et expériences premium.", more: "Voir Wine Lockers" },
    ],
  },
  de: {
    eyebrow: "Operative Fähigkeiten",
    title: "Eine Plattform für Weinkarte, Bestand, Einkauf und Keller",
    subtitle: "CloudRIM sammelt die Daten, SAVia macht daraus Antworten, und die Kellermodule halten physische Standorte und private Lockers unter Kontrolle.",
    ctaPrimary: "Funktionen ansehen",
    ctaSecondary: "Demo anfragen",
    cards: [
      { title: "CloudRIM", desc: "Weinkarten, Verkäufe, Lieferscheine, Rechnungen, Bestand und Preislisten kommen über die Kanäle, die das Restaurant bereits nutzt.", more: "CloudRIM entdecken" },
      { title: "SAVia", desc: "Fragen zu Weinkarte, Verkäufen, Bestand, Kosten, Margen und Chancen stellen, ohne sich in Dashboards zu verlieren.", more: "SAVia entdecken" },
      { title: "Wine Cellar", desc: "Physische Flaschenposition nach Zonen, Regalen, Fächern und Positionen, verbunden mit dem realen Bestand.", more: "Wine Cellar ansehen" },
      { title: "Wine Lockers", desc: "Verwaltung privater Weine für Gäste, Mitglieder, Clubs und Premium-Erlebnisse.", more: "Wine Lockers ansehen" },
    ],
  },
  pt: {
    eyebrow: "Capacidades operacionais",
    title: "Uma plataforma para carta, stock, compras e garrafeira",
    subtitle: "O CloudRIM recolhe os dados, o SAVia transforma-os em respostas e os módulos de garrafeira mantêm sob controlo localizações físicas e lockers privados.",
    ctaPrimary: "Ver funcionalidades",
    ctaSecondary: "Pedir demo",
    cards: [
      { title: "CloudRIM", desc: "Cartas, vendas, guias, faturas, stock e tabelas entram pelos canais que o restaurante já usa.", more: "Descobrir CloudRIM" },
      { title: "SAVia", desc: "Pergunte por carta, vendas, stock, custos, margens e oportunidades sem se perder em dashboards.", more: "Descobrir SAVia" },
      { title: "Wine Cellar", desc: "Localização física das garrafas por zonas, garrafeiras, prateleiras e posições ligadas ao stock real.", more: "Ver Wine Cellar" },
      { title: "Wine Lockers", desc: "Gestão de vinhos privados para clientes, sócios, clubes e experiências premium.", more: "Ver Wine Lockers" },
    ],
  },
};

const ICONS = [Cloud, MessageSquare, MapPinned, LockKeyhole];
const HREFS = [
  "/producto/cloudrim",
  "/producto/savia",
  "/funcionalidades#feat-3",
  "/funcionalidades#feat-4",
];

const OperationalCapabilitiesTeaser = () => {
  const { lang, localePath } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{t.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">{t.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {t.cards.map((card, i) => {
            const Icon = ICONS[i];
            const to = localePath(HREFS[i]);
            return (
              <ScrollReveal key={card.title} delay={i * 80}>
                <Link
                  to={to}
                  className="group block h-full rounded-xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1.5">{card.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{card.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        {card.more} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={localePath("/funcionalidades")}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            {t.ctaPrimary} <ArrowRight size={16} />
          </Link>
          <Link
            to={localePath("/demo")}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary transition"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OperationalCapabilitiesTeaser;