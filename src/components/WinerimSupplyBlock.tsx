import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const i18n: Record<string, {
  label: string; title: string; subtitle: string; desc: string;
  bullets: string[]; cta: string;
}> = {
  es: {
    label: "Inteligencia de compras",
    title: "Winerim Supply",
    subtitle: "Inteligencia de compras para restaurantes y grupos",
    desc: "Winerim ayuda a decidir qué merece la pena seguir comprando, qué renegociar, qué retirar y qué referencias conviene reponer según rotación, stock, margen y precio de compra.",
    bullets: [
      "Comparativa de precios de compra",
      "Alertas de sobreprecio",
      "Recomendación de reposición",
      "Oportunidades por distribuidor",
      "Lista de compra inteligente",
    ],
    cta: "Ver Winerim Supply",
  },
  en: {
    label: "Purchasing intelligence",
    title: "Winerim Supply",
    subtitle: "Purchasing intelligence for restaurants and groups",
    desc: "Winerim helps you decide what's worth buying, what to renegotiate, what to remove and what to restock based on rotation, stock, margin and purchase price.",
    bullets: [
      "Purchase price comparison",
      "Overpricing alerts",
      "Restocking recommendations",
      "Opportunities by distributor",
      "Smart purchase list",
    ],
    cta: "See Winerim Supply",
  },
  it: {
    label: "Intelligenza acquisti",
    title: "Winerim Supply",
    subtitle: "Intelligenza d'acquisto per ristoranti e gruppi",
    desc: "Winerim aiuta a decidere cosa vale la pena continuare a comprare, cosa rinegoziare, cosa ritirare e cosa rifornire in base a rotazione, stock, margine e prezzo d'acquisto.",
    bullets: [
      "Confronto prezzi d'acquisto",
      "Alert sovrapprezzi",
      "Raccomandazione di riassortimento",
      "Opportunità per distributore",
      "Lista acquisti intelligente",
    ],
    cta: "Vedi Winerim Supply",
  },
  fr: {
    label: "Intelligence d'achats",
    title: "Winerim Supply",
    subtitle: "Intelligence d'achats pour restaurants et groupes",
    desc: "Winerim aide à décider ce qui mérite d'être acheté, ce qu'il faut renégocier, retirer ou réapprovisionner selon la rotation, le stock, la marge et le prix d'achat.",
    bullets: [
      "Comparatif des prix d'achat",
      "Alertes de surcoût",
      "Recommandation de réapprovisionnement",
      "Opportunités par distributeur",
      "Liste d'achats intelligente",
    ],
    cta: "Voir Winerim Supply",
  },
};

const WinerimSupplyBlock = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-emerald-500/20 p-8 md:p-10 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,hsl(152_60%_50%/0.06),transparent_60%)]" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left: text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShoppingCart size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-emerald-500/70 block">
                      {t.label}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                      {t.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-foreground/80 mb-2">
                  {t.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {t.desc}
                </p>

                <Link
                  to={localePath("/producto/winerim-supply")}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  {t.cta} <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right: bullets */}
              <ul className="space-y-3 lg:w-[280px] shrink-0">
                {t.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WinerimSupplyBlock;
