import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  restaurant: string;
  initials: string;
};

const testimonialsByLang: Record<string, Testimonial[]> = {
  es: [
    {
      quote: "Con Winerim no hay que imprimir, permite tener la carta actualizada siempre, me ayuda a gestionar los stocks, compras y ventas, y es muy visual y atractiva, lo que repercute en la experiencia del cliente y en las ventas.",
      name: "Álex Pardo",
      role: "Mejor Sommelier de España 2023",
      restaurant: "Restaurante Coque",
      initials: "ÁP",
    },
    {
      quote: "Winerim me ayuda muchísimo en el día a día. Lo que antes eran 10/15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos. Me resulta imprescindible para poder llegar a todas las mesas.",
      name: "Nacho Otamendi",
      role: "Propietario/Sommelier",
      restaurant: "Travieso Bar",
      initials: "NO",
    },
    {
      quote: "Gestiono mi carta de manera más eficiente y los clientes quedan sorprendidos visualmente con Winerim, les permite tener más información al instante de los vinos.",
      name: "Jason Tong",
      role: "Chef y Propietario",
      restaurant: "Singapore Garden",
      initials: "JT",
    },
  ],
  en: [
    {
      quote: "With Winerim there's no need to print — the wine list is always up to date. It helps me manage stock, purchases and sales, and it's very visual and attractive, which improves the customer experience and sales.",
      name: "Álex Pardo",
      role: "Best Sommelier of Spain 2023",
      restaurant: "Restaurante Coque",
      initials: "ÁP",
    },
    {
      quote: "Winerim helps me enormously day to day. What used to take 10–15 minutes to explain the wine list, now with Winerim in 3 minutes they already have a full picture. It's essential for me to reach every table.",
      name: "Nacho Otamendi",
      role: "Owner / Sommelier",
      restaurant: "Travieso Bar",
      initials: "NO",
    },
    {
      quote: "I manage my wine list more efficiently and customers are visually impressed by Winerim — it gives them instant access to detailed wine information.",
      name: "Jason Tong",
      role: "Chef & Owner",
      restaurant: "Singapore Garden",
      initials: "JT",
    },
  ],
  it: [
    {
      quote: "Con Winerim non serve stampare: la carta è sempre aggiornata. Mi aiuta a gestire stock, acquisti e vendite, ed è molto visiva e attraente, il che migliora l'esperienza del cliente e le vendite.",
      name: "Álex Pardo",
      role: "Miglior Sommelier di Spagna 2023",
      restaurant: "Restaurante Coque",
      initials: "ÁP",
    },
    {
      quote: "Winerim mi aiuta moltissimo ogni giorno. Quello che prima richiedeva 10–15 minuti per spiegare la carta, ora con Winerim in 3 minuti i clienti hanno già una visione completa. È essenziale per riuscire a raggiungere tutti i tavoli.",
      name: "Nacho Otamendi",
      role: "Proprietario/Sommelier",
      restaurant: "Travieso Bar",
      initials: "NO",
    },
    {
      quote: "Gestisco la mia carta in modo più efficiente e i clienti rimangono colpiti visivamente da Winerim: dà loro accesso immediato a informazioni dettagliate sui vini.",
      name: "Jason Tong",
      role: "Chef e Proprietario",
      restaurant: "Singapore Garden",
      initials: "JT",
    },
  ],
  fr: [
    {
      quote: "Avec Winerim, plus besoin d'imprimer : la carte est toujours à jour. Cela m'aide à gérer les stocks, les achats et les ventes, et c'est très visuel et attrayant, ce qui améliore l'expérience client et les ventes.",
      name: "Álex Pardo",
      role: "Meilleur Sommelier d'Espagne 2023",
      restaurant: "Restaurante Coque",
      initials: "ÁP",
    },
    {
      quote: "Winerim m'aide énormément au quotidien. Ce qui prenait 10–15 minutes pour expliquer la carte, maintenant avec Winerim en 3 minutes les clients ont déjà une vision globale. C'est essentiel pour pouvoir aller à toutes les tables.",
      name: "Nacho Otamendi",
      role: "Propriétaire / Sommelier",
      restaurant: "Travieso Bar",
      initials: "NO",
    },
    {
      quote: "Je gère ma carte plus efficacement et les clients sont visuellement bluffés par Winerim : ils ont accès instantanément à des informations détaillées sur les vins.",
      name: "Jason Tong",
      role: "Chef et Propriétaire",
      restaurant: "Singapore Garden",
      initials: "JT",
    },
  ],
  de: [
    {
      quote: "Mit Winerim muss nichts gedruckt werden — die Weinkarte ist immer aktuell. Es hilft mir, Bestand, Einkauf und Verkauf zu verwalten, und ist sehr visuell und attraktiv, was das Kundenerlebnis und den Umsatz verbessert.",
      name: "Álex Pardo",
      role: "Bester Sommelier Spaniens 2023",
      restaurant: "Restaurante Coque",
      initials: "ÁP",
    },
    {
      quote: "Winerim hilft mir im Alltag enorm. Wofür ich früher 10–15 Minuten brauchte, um die Karte zu erklären, haben die Gäste mit Winerim in 3 Minuten bereits einen vollständigen Überblick. Es ist unverzichtbar, um an jeden Tisch zu kommen.",
      name: "Nacho Otamendi",
      role: "Inhaber / Sommelier",
      restaurant: "Travieso Bar",
      initials: "NO",
    },
    {
      quote: "Ich verwalte meine Weinkarte effizienter und die Gäste sind visuell beeindruckt von Winerim — sie haben sofort Zugriff auf detaillierte Weininformationen.",
      name: "Jason Tong",
      role: "Chef & Inhaber",
      restaurant: "Singapore Garden",
      initials: "JT",
    },
  ],
  pt: [
    {
      quote: "Com a Winerim não é preciso imprimir — a carta está sempre atualizada. Ajuda-me a gerir stocks, compras e vendas, e é muito visual e atrativa, o que melhora a experiência do cliente e as vendas.",
      name: "Álex Pardo",
      role: "Melhor Sommelier de Espanha 2023",
      restaurant: "Restaurante Coque",
      initials: "ÁP",
    },
    {
      quote: "A Winerim ajuda-me imenso no dia a dia. O que antes eram 10–15 minutos para explicar a carta, agora com a Winerim em 3 minutos já têm uma visão global. É essencial para conseguir chegar a todas as mesas.",
      name: "Nacho Otamendi",
      role: "Proprietário / Sommelier",
      restaurant: "Travieso Bar",
      initials: "NO",
    },
    {
      quote: "Giro a minha carta de forma mais eficiente e os clientes ficam visualmente surpreendidos com a Winerim — dá-lhes acesso instantâneo a informação detalhada sobre os vinhos.",
      name: "Jason Tong",
      role: "Chef e Proprietário",
      restaurant: "Singapore Garden",
      initials: "JT",
    },
  ],
};

const labels: Record<string, { badge: string; title: string; titleHighlight: string; cta: string }> = {
  es: { badge: "Testimonios", title: "Lo que dicen nuestros", titleHighlight: "clientes", cta: "Ver todos los casos de éxito" },
  en: { badge: "Testimonials", title: "What our", titleHighlight: "clients say", cta: "See all case studies" },
  it: { badge: "Testimonianze", title: "Cosa dicono i nostri", titleHighlight: "clienti", cta: "Vedi tutti i casi di successo" },
  fr: { badge: "Témoignages", title: "Ce que disent nos", titleHighlight: "clients", cta: "Voir tous les cas clients" },
  de: { badge: "Testimonials", title: "Was unsere", titleHighlight: "Kunden sagen", cta: "Alle Erfolgsgeschichten ansehen" },
  pt: { badge: "Testemunhos", title: "O que dizem os nossos", titleHighlight: "clientes", cta: "Ver todos os casos de sucesso" },
};

const TestimonialsSection = () => {
  const { lang, localePath } = useLanguage();
  const l = labels[lang] || labels.es;
  const testimonials = testimonialsByLang[lang] || testimonialsByLang.es;

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{l.badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {l.title} <span className="text-gradient-wine italic">{l.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine to-wine-light opacity-40 group-hover:opacity-100 transition-opacity" />
                <Quote size={24} className="text-wine/30 mb-4 shrink-0" />
                <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-6">{t.quote}</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-wine font-medium">{t.restaurant}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Link
            to={localePath("/casos-exito")}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-wine hover:text-wine-light transition-colors group"
          >
            {l.cta}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
