import { Users, Briefcase, ShoppingCart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const data: Record<string, {
  badge: string;
  title: string;
  titleHighlight: string;
  roles: { icon: typeof Users; title: string; benefits: string[] }[];
}> = {
  es: {
    badge: "Para cada rol",
    title: "Cómo ayuda Winerim a ",
    titleHighlight: "cada equipo",
    roles: [
      {
        icon: Users,
        title: "Equipo de sala",
        benefits: [
          "Recomienda vino con confianza, sin ser sommelier",
          "Maridajes automáticos para cada plato",
          "Responde preguntas del comensal al instante",
          "Sugiere vinos de mayor valor sin ser intrusivo",
        ],
      },
      {
        icon: Briefcase,
        title: "Dirección / Gerencia",
        benefits: [
          "Visibilidad sobre ventas de vino en tiempo real",
          "KPIs claros: ticket medio, rotación, margen",
          "Detección de vinos muertos que ocupan bodega",
          "Control de costes y optimización de precios",
        ],
      },
      {
        icon: ShoppingCart,
        title: "Compras / Bodega",
        benefits: [
          "Alertas de stock bajo antes de que se agote",
          "Datos de rotación para decidir qué reponer",
          "Análisis de margen por referencia y proveedor",
          "Reducción del stock muerto y obsolescencia",
        ],
      },
    ],
  },
  en: {
    badge: "For every role",
    title: "How Winerim helps ",
    titleHighlight: "each team",
    roles: [
      {
        icon: Users,
        title: "Floor staff",
        benefits: [
          "Recommend wine with confidence, no sommelier needed",
          "Automatic pairings for every dish",
          "Answer guest questions instantly",
          "Suggest higher-value wines without being pushy",
        ],
      },
      {
        icon: Briefcase,
        title: "Management",
        benefits: [
          "Real-time visibility into wine sales",
          "Clear KPIs: average ticket, rotation, margin",
          "Detection of dead stock wines",
          "Cost control and price optimization",
        ],
      },
      {
        icon: ShoppingCart,
        title: "Purchasing / Cellar",
        benefits: [
          "Low stock alerts before running out",
          "Rotation data to decide what to reorder",
          "Margin analysis by reference and supplier",
          "Reduced dead stock and obsolescence",
        ],
      },
    ],
  },
  it: {
    badge: "Per ogni ruolo",
    title: "Come Winerim aiuta ",
    titleHighlight: "ogni team",
    roles: [
      {
        icon: Users,
        title: "Personale di sala",
        benefits: [
          "Consiglia vini con sicurezza, senza essere sommelier",
          "Abbinamenti automatici per ogni piatto",
          "Risponde alle domande del cliente al momento",
          "Suggerisce vini di maggior valore senza insistere",
        ],
      },
      {
        icon: Briefcase,
        title: "Direzione",
        benefits: [
          "Visibilità sulle vendite di vino in tempo reale",
          "KPI chiari: scontrino medio, rotazione, margine",
          "Rilevamento di vini morti in cantina",
          "Controllo costi e ottimizzazione prezzi",
        ],
      },
      {
        icon: ShoppingCart,
        title: "Acquisti / Cantina",
        benefits: [
          "Avvisi stock basso prima dell'esaurimento",
          "Dati di rotazione per decidere cosa riordinare",
          "Analisi margine per referenza e fornitore",
          "Riduzione stock morto e obsolescenza",
        ],
      },
    ],
  },
  fr: {
    badge: "Pour chaque rôle",
    title: "Comment Winerim aide ",
    titleHighlight: "chaque équipe",
    roles: [
      {
        icon: Users,
        title: "Équipe de salle",
        benefits: [
          "Recommande le vin en confiance, sans être sommelier",
          "Accords automatiques pour chaque plat",
          "Répond aux questions des clients instantanément",
          "Suggère des vins de plus grande valeur sans insister",
        ],
      },
      {
        icon: Briefcase,
        title: "Direction",
        benefits: [
          "Visibilité sur les ventes de vin en temps réel",
          "KPIs clairs : ticket moyen, rotation, marge",
          "Détection des vins morts en cave",
          "Contrôle des coûts et optimisation des prix",
        ],
      },
      {
        icon: ShoppingCart,
        title: "Achats / Cave",
        benefits: [
          "Alertes stock bas avant rupture",
          "Données de rotation pour décider quoi réapprovisionner",
          "Analyse de marge par référence et fournisseur",
          "Réduction du stock mort et obsolescence",
        ],
      },
    ],
  },
};

const WhoItHelpsSection = () => {
  const { lang } = useLanguage();
  const d = data[lang] || data.es;

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{d.badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {d.title}<span className="text-gradient-wine italic">{d.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {d.roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-4">{role.title}</h3>
                  <ul className="space-y-2.5">
                    {role.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-wine mt-0.5 shrink-0">•</span>
                        <span>{b}</span>
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
  );
};

export default WhoItHelpsSection;
