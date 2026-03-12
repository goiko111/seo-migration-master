import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const testimonials = [
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
];

const labels: Record<string, { badge: string; title: string; titleHighlight: string; cta: string }> = {
  es: { badge: "Testimonios", title: "Lo que dicen nuestros", titleHighlight: "clientes", cta: "Ver todos los casos de éxito" },
  en: { badge: "Testimonials", title: "What our", titleHighlight: "clients say", cta: "See all case studies" },
  it: { badge: "Testimonianze", title: "Cosa dicono i nostri", titleHighlight: "clienti", cta: "Vedi tutti i casi di successo" },
  fr: { badge: "Témoignages", title: "Ce que disent nos", titleHighlight: "clients", cta: "Voir tous les cas clients" },
};

const TestimonialsSection = () => {
  const { lang, localePath } = useLanguage();
  const l = labels[lang] || labels.es;

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
