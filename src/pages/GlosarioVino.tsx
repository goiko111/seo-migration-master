import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";

interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  link?: { label: string; href: string };
}

const glossary: GlossaryTerm[] = [
  { term: "Acidez", definition: "Componente esencial del vino que aporta frescura y viveza. Los vinos con buena acidez resultan equilibrados y gastronómicos, mientras que la falta de acidez produce vinos planos.", example: "Un Riesling del Mosel tiene acidez muy alta; un Garnacha de zona cálida, acidez moderada." },
  { term: "Aireación", definition: "Proceso de exponer el vino al oxígeno para que desarrolle aromas y suavice taninos. Se consigue decantando o simplemente agitando la copa.", example: "Un Ribera del Duero Reserva joven suele beneficiarse de 30-60 minutos de aireación." },
  { term: "Assemblage", definition: "Término francés para la mezcla de diferentes vinos base para crear el cuvée final. Habitual en Champagne y Burdeos.", link: { label: "Ver espumosos", href: "/biblioteca-vino/estilos/vino-espumoso" } },
  { term: "Barrica", definition: "Recipiente de madera (generalmente roble francés, americano o húngaro) usado para la crianza del vino. Aporta aromas de vainilla, tostado, especias y contribuye a la microoxigenación.", example: "Roble francés aporta notas más sutiles; roble americano, más vainilla y coco." },
  { term: "Bouquet", definition: "Conjunto de aromas terciarios que desarrolla un vino con el envejecimiento en botella. Se distingue del aroma primario (fruta, floral) y secundario (fermentación).", example: "Un Rioja Gran Reserva puede desarrollar bouquet de cuero, tabaco, especias dulces." },
  { term: "Botrytis", definition: "Hongo (Botrytis cinerea) que en condiciones controladas produce la 'podredumbre noble', concentrando azúcares y aromas en las uvas. Base de grandes vinos dulces.", link: { label: "Ver dulces naturales", href: "/biblioteca-vino/estilos/vino-dulce-natural" } },
  { term: "Clarificación", definition: "Proceso para eliminar partículas en suspensión del vino, haciéndolo más transparente. Se usan agentes como bentonita, clara de huevo o caseína." },
  { term: "Crianza", definition: "Periodo de envejecimiento del vino en barrica y/o botella. En España, la categoría 'Crianza' implica mínimo 24 meses, de los cuales al menos 6 en barrica para tintos." },
  { term: "Crianza biológica", definition: "Envejecimiento bajo velo de flor (capa de levaduras) que protege al vino de la oxidación. Típica de los Finos y Manzanillas de Jerez.", link: { label: "Ver generosos", href: "/biblioteca-vino/estilos/vino-generoso-fortificado" } },
  { term: "Crianza oxidativa", definition: "Envejecimiento con exposición controlada al oxígeno. Produce vinos de color ámbar con aromas de frutos secos y especias. Típica de Olorosos y Amontillados." },
  { term: "Cuerpo", definition: "Sensación de peso y densidad del vino en boca. Determinado por el alcohol, los extractos y los azúcares residuales. Va de ligero a muy alto.", example: "Un Muscadet tiene cuerpo ligero; un Amarone, cuerpo muy alto." },
  { term: "Cuvée", definition: "En Champagne, el mosto de primera prensada (el mejor). También se usa para designar una mezcla especial o la producción top de una bodega." },
  { term: "Decantación", definition: "Trasiego del vino de la botella a un decantador para separar sedimentos y/o airear el vino. Especialmente útil en tintos con crianza prolongada." },
  { term: "Degüelle", definition: "En el método tradicional, el proceso de eliminar las lías congeladas del cuello de la botella de espumoso tras la segunda fermentación." },
  { term: "Elaboración", definition: "Conjunto de procesos desde la vendimia hasta el embotellado: despalillado, fermentación, prensado, crianza, clarificación y filtrado." },
  { term: "Encabezado", definition: "Adición de alcohol vínico (aguardiente) al mosto o vino en fermentación para detener la fermentación y elevar la graduación. Técnica esencial en vinos generosos.", link: { label: "Ver generosos", href: "/biblioteca-vino/estilos/vino-generoso-fortificado" } },
  { term: "Estructura", definition: "Conjunto de componentes que dan esqueleto al vino: acidez, taninos, alcohol y extracto. Un vino 'bien estructurado' tiene estos elementos en equilibrio." },
  { term: "Fermentación maloláctica", definition: "Proceso biológico donde el ácido málico (agresivo) se convierte en ácido láctico (suave). Habitual en tintos; en blancos, depende del estilo buscado.", example: "Un Chardonnay con maloláctica resulta cremoso y con notas de mantequilla." },
  { term: "Filtrado", definition: "Paso final antes del embotellado para eliminar partículas y microorganismos. Algunos productores lo evitan ('sin filtrar') buscando más expresión." },
  { term: "Gran Reserva", definition: "En España, categoría de envejecimiento: mínimo 60 meses totales, de los cuales al menos 18 en barrica para tintos. Indica vinos de añadas excepcionales." },
  { term: "Lías", definition: "Residuos de levaduras muertas tras la fermentación. La crianza sobre lías aporta cremosidad, complejidad y autólisis (aromas de pan tostado, brioche).", example: "Champagne y Muscadet Sur Lie son ejemplos clásicos de crianza sobre lías." },
  { term: "Maceración", definition: "Contacto del mosto con los hollejos (pieles) de la uva para extraer color, taninos y aromas. Duración variable: desde horas (rosados) hasta semanas (tintos potentes)." },
  { term: "Maceración carbónica", definition: "Técnica donde las uvas enteras fermentan en un ambiente saturado de CO₂ antes del prensado. Produce vinos jóvenes, afrutados y de color intenso.", example: "Beaujolais Nouveau y muchos tintos jóvenes de Rioja usan esta técnica." },
  { term: "Método Charmat", definition: "Método de elaboración de espumosos donde la segunda fermentación ocurre en grandes depósitos de acero inoxidable (no en botella). Más económico, preserva la frescura frutal.", example: "Prosecco se elabora por método Charmat.", link: { label: "Ver espumosos", href: "/biblioteca-vino/estilos/vino-espumoso" } },
  { term: "Método tradicional", definition: "Método de elaboración de espumosos con segunda fermentación en botella individual. Produce burbujas más finas y complejas. Obligatorio en Champagne y Cava.", link: { label: "Ver espumosos", href: "/biblioteca-vino/estilos/vino-espumoso" } },
  { term: "Mineralidad", definition: "Descriptor sensorial debatido que evoca sensaciones de piedra, tiza, sílex o salinidad. Más asociado a determinados terroirs que a la composición química real." },
  { term: "Monovarietal", definition: "Vino elaborado con una sola variedad de uva (o con un porcentaje dominante según la legislación local, generalmente 85%+).", example: "Un Albariño Rías Baixas es monovarietal; un GSM del Ródano es multivarietal." },
  { term: "Nariz", definition: "Conjunto de aromas percibidos al oler el vino. Se distinguen aromas primarios (uva), secundarios (fermentación) y terciarios (crianza/evolución)." },
  { term: "Pasificación", definition: "Deshidratación parcial de las uvas (en planta o post-cosecha) para concentrar azúcares y sabores. Base de vinos como Amarone, Passito y Vin Santo." },
  { term: "Reserva", definition: "En España, categoría de envejecimiento: mínimo 36 meses totales, de los cuales al menos 12 en barrica para tintos. Implica selección de añada." },
  { term: "Retrogusto", definition: "Sensaciones que permanecen en boca después de tragar o escupir el vino. Un retrogusto largo y agradable es signo de calidad. Se mide en 'caudales' (segundos)." },
  { term: "Roble", definition: "Madera utilizada en la crianza del vino. Francés (Allier, Tronçais, Nevers): notas sutiles, especias. Americano (Missouri): vainilla, coco. Húngaro: término medio.", example: "El tipo de roble, el tamaño de la barrica y el tostado influyen en el resultado final." },
  { term: "Sulfitos", definition: "Conservantes (dióxido de azufre / SO₂) añadidos al vino para prevenir oxidación y contaminación microbiana. Su presencia es obligatorio declararla en etiqueta.", example: "Los vinos naturales minimizan los sulfitos añadidos; los convencionales suelen estar entre 30-150 mg/L." },
  { term: "Taninos", definition: "Compuestos polifenólicos procedentes de hollejos, pepitas y madera que aportan estructura, astringencia y capacidad de envejecimiento al vino.", example: "Un Cabernet Sauvignon joven tiene taninos firmes; un Pinot Noir, taninos sedosos." },
  { term: "Terroir", definition: "Concepto francés que engloba la interacción de suelo, clima, topografía, tradición y saber hacer humano que confiere carácter único a los vinos de un lugar.", example: "El terroir calcáreo de Chablis produce Chardonnays minerales muy diferentes de los de Borgoña sur." },
  { term: "Varietales", definition: "Término que designa tanto las distintas variedades de uva como los vinos que identifican la variedad en etiqueta (práctica habitual en el Nuevo Mundo).", link: { label: "Explorar variedades", href: "/biblioteca-vino/uvas" } },
  { term: "Velo de flor", definition: "Capa natural de levaduras que se forma en la superficie del vino en barricas no rellenadas completamente. Protege de la oxidación y aporta aromas únicos. Base de Finos y Manzanillas.", link: { label: "Ver generosos", href: "/biblioteca-vino/estilos/vino-generoso-fortificado" } },
  { term: "Vendimia tardía", definition: "Recolección de uvas dejándolas madurar más allá del momento óptimo para concentrar azúcares. Produce vinos dulces de gran complejidad.", link: { label: "Ver dulces naturales", href: "/biblioteca-vino/estilos/vino-dulce-natural" } },
];

const GlosarioVino = () => {
  const { allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");

  const letters = useMemo(() => {
    const set = new Set(glossary.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return glossary;
    const q = search.toLowerCase();
    return glossary.filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
  }, [search]);

  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    filtered.forEach((t) => {
      const letter = t.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(t);
    });
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Glosario del Vino | Términos Esenciales para Hostelería"
        description="Glosario con más de 35 términos clave del mundo del vino explicados con claridad para profesionales de hostelería. De acidez a vendimia tardía."
        url="https://winerim.wine/biblioteca-vino/glosario"
        hreflang={allLangPaths("/biblioteca-vino/glosario")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Glosario" },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6">
            <BookOpen size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Referencia</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6">
            Glosario del <span className="text-gradient-wine italic">vino</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
            Más de 35 términos esenciales del mundo del vino, explicados con claridad para profesionales de hostelería.
          </motion.p>

          {/* SEARCH */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="max-w-md">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar término..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/30 border-border"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* LETTER NAV */}
      <section className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-3">
          <div className="flex flex-wrap gap-1">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#glosario-${letter}`}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold transition-all
                  ${grouped[letter] ? "text-wine hover:bg-wine/10" : "text-muted-foreground/30 pointer-events-none"}`}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {Object.keys(grouped).sort().map((letter) => (
            <div key={letter} id={`glosario-${letter}`} className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-wine mb-6 border-b border-border pb-2">{letter}</h2>
              <div className="space-y-6">
                {grouped[letter].map((t) => (
                  <ScrollReveal key={t.term}>
                    <div className="bg-gradient-card border border-border rounded-xl p-6">
                      <h3 className="font-heading text-lg font-semibold mb-2">{t.term}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{t.definition}</p>
                      {t.example && (
                        <p className="text-sm text-foreground/70 italic">💡 {t.example}</p>
                      )}
                      {t.link && (
                        <Link to={t.link.href} className="inline-flex items-center gap-1 text-wine text-sm mt-2 hover:underline">
                          {t.link.label} <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No se encontraron términos para "{search}"</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  ¿Quieres que tu equipo domine este <span className="text-gradient-wine italic">vocabulario</span>?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  Winerim integra el conocimiento del vino directamente en la carta digital, haciendo que cada referencia sea autoexplicativa.
                </p>
                <Link to="/demo"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  Solicitar demo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GlosarioVino;
