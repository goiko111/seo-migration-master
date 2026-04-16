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
import { getI18n, type I18nMap } from "@/i18n/types";

type ServiceRow = {
  style: string;
  ml: number;
  cups: number;
  temp: string;
  glass: string;
  emoji: string;
  link: string;
};

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbLibrary: string;
  breadcrumbCurrent: string;
  heroBadge: string;
  heroTitlePart1: string;
  heroTitleItalic: string;
  heroTitlePart2: string;
  heroDescription: string;
  tableStyle: string;
  tableMlPerGlass: string;
  tableCupsPerBottle: string;
  tableTemperature: string;
  tableRecommendedGlass: string;
  summaryTitle: string;
  noteTitle: string;
  noteText: string;
  ctaTitlePart1: string;
  ctaTitleItalic: string;
  ctaTitlePart2: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  serviceData: ServiceRow[];
};

const content: I18nMap<PageContent> = {
  es: {
    metaTitle: "Guía de Servicio del Vino | Estándar Winerim (WSET)",
    metaDescription:
      "Medidas de servicio por estilo de vino: ml por copa, copas por botella, temperatura y copa recomendada. Referencia WSET para hostelería.",
    breadcrumbLibrary: "Biblioteca del Vino",
    breadcrumbCurrent: "Guía de Servicio",
    heroBadge: "Referencia",
    heroTitlePart1: "Guía de ",
    heroTitleItalic: "servicio",
    heroTitlePart2: " del vino",
    heroDescription:
      "Medidas estándar de servicio según WSET: ml por copa, copas por botella, temperatura y copa recomendada para cada estilo de vino.",
    tableStyle: "Estilo",
    tableMlPerGlass: "ml/copa",
    tableCupsPerBottle: "Copas/botella",
    tableTemperature: "Temperatura",
    tableRecommendedGlass: "Copa recomendada",
    summaryTitle: "Resumen visual",
    noteTitle: "Nota importante",
    noteText:
      "Estas son las medidas estándar Winerim (WSET). Si tu local usa medidas diferentes (ej: 6 copas × 125 ml para tintos), la calculadora Winerim respeta tus datos. Lo importante es la consistencia: define tus medidas y mantenlas.",
    ctaTitlePart1: "¿Quieres calcular tus ",
    ctaTitleItalic: "márgenes por copa",
    ctaTitlePart2: "?",
    ctaDescription:
      "La calculadora Winerim aplica estas medidas a tus precios reales y te dice exactamente cuánto ganas por copa.",
    ctaPrimary: "Calculadora por copa",
    ctaSecondary: "Volver a la Biblioteca",
    serviceData: [
      { style: "Tinto", ml: 150, cups: 5, temp: "14–18 °C", glass: "Burdeos (amplia) o Borgoña (abombada)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
      { style: "Blanco", ml: 150, cups: 5, temp: "8–12 °C", glass: "Copa blanca estándar (estrecha)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
      { style: "Rosado", ml: 150, cups: 5, temp: "8–10 °C", glass: "Copa blanca o tulipa abierta", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
      { style: "Espumoso", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flauta o tulipa (evitar coupe)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
      { style: "Postre / Dulce", ml: 90, cups: 8, temp: "6–10 °C", glass: "Copa pequeña de postre", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
      { style: "Fortificado", ml: 75, cups: 10, temp: "6–18 °C (según tipo)", glass: "Catavino de Jerez o copa pequeña tulipa", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
    ],
  },
  en: {
    metaTitle: "Wine Service Guide | Winerim Standard (WSET)",
    metaDescription:
      "Wine service measurements by style: ml per glass, glasses per bottle, temperature and recommended glassware. WSET reference for hospitality.",
    breadcrumbLibrary: "Wine Library",
    breadcrumbCurrent: "Service Guide",
    heroBadge: "Reference",
    heroTitlePart1: "Wine ",
    heroTitleItalic: "service",
    heroTitlePart2: " guide",
    heroDescription:
      "WSET-standard wine service measurements: ml per glass, glasses per bottle, temperature and recommended glassware for every wine style.",
    tableStyle: "Style",
    tableMlPerGlass: "ml/glass",
    tableCupsPerBottle: "Glasses/bottle",
    tableTemperature: "Temperature",
    tableRecommendedGlass: "Recommended glass",
    summaryTitle: "Visual summary",
    noteTitle: "Important note",
    noteText:
      "These are Winerim standard measurements (WSET). If your venue uses different pours (e.g. 6 glasses × 125 ml for reds), the Winerim calculator respects your data. Consistency is what matters: define your pours and stick to them.",
    ctaTitlePart1: "Want to calculate your ",
    ctaTitleItalic: "margins per glass",
    ctaTitlePart2: "?",
    ctaDescription:
      "The Winerim calculator applies these measurements to your real prices and tells you exactly how much you make per glass.",
    ctaPrimary: "Per-glass calculator",
    ctaSecondary: "Back to Library",
    serviceData: [
      { style: "Red", ml: 150, cups: 5, temp: "14–18 °C", glass: "Bordeaux (tall) or Burgundy (bowl-shaped)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
      { style: "White", ml: 150, cups: 5, temp: "8–12 °C", glass: "Standard white wine glass (narrow)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
      { style: "Rosé", ml: 150, cups: 5, temp: "8–10 °C", glass: "White wine or open tulip glass", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
      { style: "Sparkling", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flute or tulip (avoid coupe)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
      { style: "Dessert / Sweet", ml: 90, cups: 8, temp: "6–10 °C", glass: "Small dessert glass", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
      { style: "Fortified", ml: 75, cups: 10, temp: "6–18 °C (by type)", glass: "Sherry copita or small tulip glass", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
    ],
  },
  it: {
    metaTitle: "Guida al Servizio del Vino | Standard Winerim (WSET)",
    metaDescription:
      "Misure di servizio per stile di vino: ml per calice, calici per bottiglia, temperatura e bicchiere consigliato. Riferimento WSET per la ristorazione.",
    breadcrumbLibrary: "Biblioteca del Vino",
    breadcrumbCurrent: "Guida al Servizio",
    heroBadge: "Riferimento",
    heroTitlePart1: "Guida al ",
    heroTitleItalic: "servizio",
    heroTitlePart2: " del vino",
    heroDescription:
      "Misure di servizio standard WSET: ml per calice, calici per bottiglia, temperatura e bicchiere consigliato per ogni stile di vino.",
    tableStyle: "Stile",
    tableMlPerGlass: "ml/calice",
    tableCupsPerBottle: "Calici/bottiglia",
    tableTemperature: "Temperatura",
    tableRecommendedGlass: "Bicchiere consigliato",
    summaryTitle: "Riepilogo visivo",
    noteTitle: "Nota importante",
    noteText:
      "Queste sono le misure standard Winerim (WSET). Se il tuo locale usa misure diverse (es.: 6 calici × 125 ml per i rossi), il calcolatore Winerim rispetta i tuoi dati. L'importante è la coerenza: definisci le tue misure e mantienile.",
    ctaTitlePart1: "Vuoi calcolare i tuoi ",
    ctaTitleItalic: "margini al calice",
    ctaTitlePart2: "?",
    ctaDescription:
      "Il calcolatore Winerim applica queste misure ai tuoi prezzi reali e ti dice esattamente quanto guadagni per calice.",
    ctaPrimary: "Calcolatore al calice",
    ctaSecondary: "Torna alla Biblioteca",
    serviceData: [
      { style: "Rosso", ml: 150, cups: 5, temp: "14–18 °C", glass: "Bordolese (ampia) o Borgogna (a palloncino)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
      { style: "Bianco", ml: 150, cups: 5, temp: "8–12 °C", glass: "Calice standard da bianco (stretto)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
      { style: "Rosato", ml: 150, cups: 5, temp: "8–10 °C", glass: "Calice da bianco o tulipano aperto", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
      { style: "Spumante", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flûte o tulipano (evitare coppa)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
      { style: "Dessert / Dolce", ml: 90, cups: 8, temp: "6–10 °C", glass: "Calice piccolo da dessert", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
      { style: "Fortificato", ml: 75, cups: 10, temp: "6–18 °C (per tipo)", glass: "Catavino di Jerez o piccolo tulipano", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
    ],
  },
  fr: {
    metaTitle: "Guide de Service du Vin | Standard Winerim (WSET)",
    metaDescription:
      "Mesures de service par style de vin : ml par verre, verres par bouteille, température et verre recommandé. Référence WSET pour la restauration.",
    breadcrumbLibrary: "Bibliothèque du Vin",
    breadcrumbCurrent: "Guide de Service",
    heroBadge: "Référence",
    heroTitlePart1: "Guide de ",
    heroTitleItalic: "service",
    heroTitlePart2: " du vin",
    heroDescription:
      "Mesures de service standard WSET : ml par verre, verres par bouteille, température et verre recommandé pour chaque style de vin.",
    tableStyle: "Style",
    tableMlPerGlass: "ml/verre",
    tableCupsPerBottle: "Verres/bouteille",
    tableTemperature: "Température",
    tableRecommendedGlass: "Verre recommandé",
    summaryTitle: "Résumé visuel",
    noteTitle: "Note importante",
    noteText:
      "Ce sont les mesures standard Winerim (WSET). Si votre établissement utilise des mesures différentes (ex. : 6 verres × 125 ml pour les rouges), le calculateur Winerim respecte vos données. La cohérence est l'essentiel : définissez vos mesures et tenez-les.",
    ctaTitlePart1: "Envie de calculer vos ",
    ctaTitleItalic: "marges au verre",
    ctaTitlePart2: " ?",
    ctaDescription:
      "Le calculateur Winerim applique ces mesures à vos prix réels et vous dit exactement combien vous gagnez par verre.",
    ctaPrimary: "Calculateur au verre",
    ctaSecondary: "Retour à la Bibliothèque",
    serviceData: [
      { style: "Rouge", ml: 150, cups: 5, temp: "14–18 °C", glass: "Bordeaux (large) ou Bourgogne (ballon)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
      { style: "Blanc", ml: 150, cups: 5, temp: "8–12 °C", glass: "Verre à blanc standard (étroit)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
      { style: "Rosé", ml: 150, cups: 5, temp: "8–10 °C", glass: "Verre à blanc ou tulipe ouverte", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
      { style: "Effervescent", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flûte ou tulipe (éviter la coupe)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
      { style: "Dessert / Doux", ml: 90, cups: 8, temp: "6–10 °C", glass: "Petit verre à dessert", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
      { style: "Fortifié", ml: 75, cups: 10, temp: "6–18 °C (selon type)", glass: "Copita de Xérès ou petite tulipe", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
    ],
  },
  de: {
    metaTitle: "Weinservice-Leitfaden | Winerim Standard (WSET)",
    metaDescription:
      "Servicemaße nach Weinstil: ml pro Glas, Gläser pro Flasche, Serviertemperatur und empfohlenes Glas. WSET-Referenz für die Gastronomie.",
    breadcrumbLibrary: "Wein-Bibliothek",
    breadcrumbCurrent: "Servicemaße",
    heroBadge: "Referenz",
    heroTitlePart1: "Leitfaden zum ",
    heroTitleItalic: "Weinservice",
    heroTitlePart2: "",
    heroDescription:
      "WSET-Standardmaße für den Weinservice: ml pro Glas, Gläser pro Flasche, Serviertemperatur und empfohlenes Glas für jeden Weinstil.",
    tableStyle: "Stil",
    tableMlPerGlass: "ml/Glas",
    tableCupsPerBottle: "Gläser/Flasche",
    tableTemperature: "Temperatur",
    tableRecommendedGlass: "Empfohlenes Glas",
    summaryTitle: "Visuelle Übersicht",
    noteTitle: "Wichtiger Hinweis",
    noteText:
      "Dies sind die Winerim-Standardmaße (WSET). Wenn Ihr Betrieb andere Maße verwendet (z. B. 6 Gläser × 125 ml bei Rotwein), respektiert der Winerim-Rechner Ihre Daten. Entscheidend ist die Konsistenz: Legen Sie Ihre Maße fest und halten Sie sie ein.",
    ctaTitlePart1: "Möchten Sie Ihre ",
    ctaTitleItalic: "Margen pro Glas",
    ctaTitlePart2: " berechnen?",
    ctaDescription:
      "Der Winerim-Rechner wendet diese Maße auf Ihre tatsächlichen Preise an und zeigt Ihnen genau, wie viel Sie pro Glas verdienen.",
    ctaPrimary: "Glaswein-Rechner",
    ctaSecondary: "Zurück zur Bibliothek",
    serviceData: [
      { style: "Rotwein", ml: 150, cups: 5, temp: "14–18 °C", glass: "Bordeaux- (hoch) oder Burgunderglas (bauchig)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
      { style: "Weißwein", ml: 150, cups: 5, temp: "8–12 °C", glass: "Standard-Weißweinglas (schmal)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
      { style: "Roséwein", ml: 150, cups: 5, temp: "8–10 °C", glass: "Weißweinglas oder offene Tulpe", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
      { style: "Schaumwein", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flöte oder Tulpe (Coupe vermeiden)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
      { style: "Dessertwein / Süßwein", ml: 90, cups: 8, temp: "6–10 °C", glass: "Kleines Dessertglas", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
      { style: "Likörwein", ml: 75, cups: 10, temp: "6–18 °C (je nach Typ)", glass: "Sherry-Copita oder kleine Tulpe", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
    ],
  },
  pt: {
    metaTitle: "Guia de Serviço do Vinho | Padrão Winerim (WSET)",
    metaDescription:
      "Medidas de serviço por estilo de vinho: ml por copo, copos por garrafa, temperatura e copo recomendado. Referência WSET para restauração.",
    breadcrumbLibrary: "Biblioteca do Vinho",
    breadcrumbCurrent: "Guia de Serviço",
    heroBadge: "Referência",
    heroTitlePart1: "Guia de ",
    heroTitleItalic: "serviço",
    heroTitlePart2: " do vinho",
    heroDescription:
      "Medidas de serviço padrão WSET: ml por copo, copos por garrafa, temperatura e copo recomendado para cada estilo de vinho.",
    tableStyle: "Estilo",
    tableMlPerGlass: "ml/copo",
    tableCupsPerBottle: "Copos/garrafa",
    tableTemperature: "Temperatura",
    tableRecommendedGlass: "Copo recomendado",
    summaryTitle: "Resumo visual",
    noteTitle: "Nota importante",
    noteText:
      "Estas são as medidas padrão Winerim (WSET). Se o seu estabelecimento usa medidas diferentes (ex.: 6 copos × 125 ml para tintos), a calculadora Winerim respeita os seus dados. A consistência é o que importa: defina as suas medidas e mantenha-as.",
    ctaTitlePart1: "Quer calcular as suas ",
    ctaTitleItalic: "margens a copo",
    ctaTitlePart2: "?",
    ctaDescription:
      "A calculadora Winerim aplica estas medidas aos seus preços reais e diz-lhe exatamente quanto ganha por copo.",
    ctaPrimary: "Calculadora a copo",
    ctaSecondary: "Voltar à Biblioteca",
    serviceData: [
      { style: "Tinto", ml: 150, cups: 5, temp: "14–18 °C", glass: "Bordéus (ampla) ou Borgonha (abaulada)", emoji: "🍷", link: "/biblioteca-vino/estilos/vino-tinto" },
      { style: "Branco", ml: 150, cups: 5, temp: "8–12 °C", glass: "Copo de branco padrão (estreito)", emoji: "🥂", link: "/biblioteca-vino/estilos/vino-blanco" },
      { style: "Rosé", ml: 150, cups: 5, temp: "8–10 °C", glass: "Copo de branco ou tulipa aberta", emoji: "🌸", link: "/biblioteca-vino/estilos/vino-rosado" },
      { style: "Espumante", ml: 107, cups: 7, temp: "6–8 °C", glass: "Flute ou tulipa (evitar taça coupe)", emoji: "🫧", link: "/biblioteca-vino/estilos/vino-espumoso" },
      { style: "Sobremesa / Doce", ml: 90, cups: 8, temp: "6–10 °C", glass: "Copo pequeno de sobremesa", emoji: "🍯", link: "/biblioteca-vino/estilos/vino-dulce-natural" },
      { style: "Generoso", ml: 75, cups: 10, temp: "6–18 °C (conforme o tipo)", glass: "Copo catavino de Jerez ou pequena tulipa", emoji: "🏺", link: "/biblioteca-vino/estilos/vino-generoso-fortificado" },
    ],
  },
};

const GuiaServicio = () => {
  const { allLangPaths, lang } = useLanguage();
  const c = getI18n(content, lang);
  return (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={c.metaTitle}
      description={c.metaDescription}
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
          { label: c.breadcrumbLibrary, href: "/biblioteca-vino" },
          { label: c.breadcrumbCurrent },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6">
          <GlassWater size={14} className="text-wine" />
          <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{c.heroBadge}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6">
          {c.heroTitlePart1}<span className="text-gradient-wine italic">{c.heroTitleItalic}</span>{c.heroTitlePart2}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {c.heroDescription}
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
                  <TableHead className="text-wine font-heading font-semibold">{c.tableStyle}</TableHead>
                  <TableHead className="text-wine font-heading font-semibold text-center">{c.tableMlPerGlass}</TableHead>
                  <TableHead className="text-wine font-heading font-semibold text-center">{c.tableCupsPerBottle}</TableHead>
                  <TableHead className="text-wine font-heading font-semibold">{c.tableTemperature}</TableHead>
                  <TableHead className="text-wine font-heading font-semibold">{c.tableRecommendedGlass}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {c.serviceData.map((row) => (
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{c.summaryTitle}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.serviceData.map((row, i) => (
            <ScrollReveal key={row.style} delay={i * 0.06}>
              <Link to={row.link} className="block bg-gradient-card border border-border rounded-xl p-6 hover:border-wine/30 transition-all group h-full">
                <div className="text-3xl mb-3">{row.emoji}</div>
                <h3 className="font-heading text-lg font-semibold mb-4 group-hover:text-wine transition-colors">{row.style}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets size={14} className="text-wine shrink-0" />
                    <span className="text-muted-foreground">{row.ml} ml → {row.cups} {c.tableCupsPerBottle.toLowerCase()}</span>
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
                <h3 className="font-heading text-base font-semibold mb-2">{c.noteTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.noteText}
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
                {c.ctaTitlePart1}<span className="text-gradient-wine italic">{c.ctaTitleItalic}</span>{c.ctaTitlePart2}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                {c.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/herramientas/calculadora-precio-vino-por-copa"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {c.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to="/biblioteca-vino"
                  className="px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all">
                  {c.ctaSecondary}
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
