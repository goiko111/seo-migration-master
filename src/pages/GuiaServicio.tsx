import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wine, ArrowRight, Thermometer, GlassWater, Droplets } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const serviceData = [
  { style: "Tinto", ml: 150, cups: 5, temp: "14–18 °C", glass: "Burdeos (amplia) o Borgoña (abombada)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
  { style: "Blanco", ml: 150, cups: 5, temp: "8–12 °C", glass: "Copa blanca estándar (estrecha)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
  { style: "Rosado", ml: 150, cups: 5, temp: "8–10 °C", glass: "Copa blanca o tulipa abierta", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
  { style: "Espumoso", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flauta o tulipa (evitar coupe)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
  { style: "Postre / Dulce", ml: 90, cups: 8, temp: "6–10 °C", glass: "Copa pequeña de postre", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
  { style: "Fortificado", ml: 75, cups: 10, temp: "6–18 °C (según tipo)", glass: "Catavino de Jerez o copa pequeña tulipa", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
];

const GuiaServicio = () => {
  const { allLangPaths } = useLanguage();
  return (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title="Guía de Servicio del Vino | Estándar Winerim (WSET)"
      description="Medidas de servicio por estilo de vino: ml por copa, copas por botella, temperatura y copa recomendada. Referencia WSET para hostelería."
      url="https://winerim.wine/biblioteca-vino/guia-servicio"
        hreflang={allLangPaths("/biblioteca-vino/guia-servicio")}
    />
    <Navbar />

    {/* HERO */}
    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
          { label: "Guía de Servicio" },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6">
          <GlassWater size={14} className="text-wine" />
          <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Referencia</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6">
          Guía de <span className="text-gradient-wine italic">servicio</span> del vino
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Medidas estándar de servicio según WSET: ml por copa, copas por botella, temperatura y copa recomendada para cada estilo de vino.
        </motion.p>
      </div>
    </section>

    {/* TABLE */}
    <section className="section-padding">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="rounded-xl border border-border overflow-hidden bg-gradient-card">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-wine font-heading font-semibold">Estilo</TableHead>
                  <TableHead className="text-wine font-heading font-semibold text-center">ml/copa</TableHead>
                  <TableHead className="text-wine font-heading font-semibold text-center">Copas/botella</TableHead>
                  <TableHead className="text-wine font-heading font-semibold">Temperatura</TableHead>
                  <TableHead className="text-wine font-heading font-semibold">Copa recomendada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceData.map((row) => (
                  <TableRow key={row.style} className="border-b border-border/50 hover:bg-wine/5 transition-colors">
                    <TableCell>
                      <Link to={row.link} className="flex items-center gap-2 font-medium hover:text-wine transition-colors">
                        <span>{row.emoji}</span>
                        <span>{row.style}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center font-mono font-semibold">{row.ml} ml</TableCell>
                    <TableCell className="text-center font-mono font-semibold">{row.cups}</TableCell>
                    <TableCell className="text-muted-foreground">{row.temp}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{row.glass}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* VISUAL CARDS */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Resumen visual</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.map((row, i) => (
            <ScrollReveal key={row.style} delay={i * 0.06}>
              <Link to={row.link} className="block bg-gradient-card border border-border rounded-xl p-6 hover:border-wine/30 transition-all group h-full">
                <div className="text-3xl mb-3">{row.emoji}</div>
                <h3 className="font-heading text-lg font-semibold mb-4 group-hover:text-wine transition-colors">{row.style}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets size={14} className="text-wine shrink-0" />
                    <span className="text-muted-foreground">{row.ml} ml → {row.cups} copas/botella</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer size={14} className="text-wine shrink-0" />
                    <span className="text-muted-foreground">{row.temp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GlassWater size={14} className="text-wine shrink-0" />
                    <span className="text-muted-foreground">{row.glass}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* NOTE */}
    <section className="section-padding">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="bg-wine/5 border border-wine/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Wine size={20} className="text-wine shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-base font-semibold mb-2">Nota importante</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Estas son las medidas estándar Winerim (WSET). Si tu local usa medidas diferentes
                  (ej: 6 copas × 125 ml para tintos), la calculadora Winerim respeta tus datos.
                  Lo importante es la consistencia: define tus medidas y mantenlas.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
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
                ¿Quieres calcular tus <span className="text-gradient-wine italic">márgenes por copa</span>?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                La calculadora Winerim aplica estas medidas a tus precios reales y te dice exactamente cuánto ganas por copa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/herramientas/calculadora-precio-vino-por-copa"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  Calculadora por copa <ArrowRight size={16} />
                </Link>
                <Link to="/biblioteca-vino"
                  className="px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all">
                  Volver a la Biblioteca
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
);
}

export default GuiaServicio;
