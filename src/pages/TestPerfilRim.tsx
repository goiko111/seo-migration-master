import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle, ClipboardList, Compass, Target, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";

type AnswerKey = "listSize" | "stock" | "pos" | "margin" | "team" | "goal";

type Option = {
  value: string;
  label: string;
  helper: string;
  score: number;
};

const questions: { key: AnswerKey; title: string; options: Option[] }[] = [
  {
    key: "listSize",
    title: "Tamaño y profundidad de carta",
    options: [
      { value: "short", label: "Menos de 60 referencias", helper: "Carta compacta o todavía en construcción.", score: 1 },
      { value: "medium", label: "60 a 180 referencias", helper: "Surtido con margen para ordenar mejor.", score: 2 },
      { value: "large", label: "Más de 180 referencias", helper: "Carta amplia con riesgo de capital inmovilizado.", score: 3 },
    ],
  },
  {
    key: "stock",
    title: "Control de stock y bodega",
    options: [
      { value: "manual", label: "Manual o irregular", helper: "El stock se revisa cuando aparece un problema.", score: 0 },
      { value: "partial", label: "Hoja o revisión semanal", helper: "Hay control, pero no siempre conectado a ventas.", score: 1 },
      { value: "connected", label: "Conectado a carta y ventas", helper: "El equipo ve rotación, cobertura y stock real.", score: 3 },
    ],
  },
  {
    key: "pos",
    title: "Ventas y TPV",
    options: [
      { value: "none", label: "No cruzamos ventas de vino", helper: "Se decide por intuición o memoria del equipo.", score: 0 },
      { value: "periodic", label: "Miramos informes puntuales", helper: "Se revisa el TPV, pero no con la carta viva.", score: 1 },
      { value: "live", label: "TPV conectado o analítica continua", helper: "Las decisiones salen de datos reales.", score: 3 },
    ],
  },
  {
    key: "margin",
    title: "Márgenes, PVP y coste",
    options: [
      { value: "rare", label: "Solo al crear la carta", helper: "Después apenas se revisa el coste real.", score: 0 },
      { value: "some", label: "Revisión mensual o trimestral", helper: "Se detectan fugas, pero tarde.", score: 2 },
      { value: "active", label: "Alertas y señales por referencia", helper: "No reponer, liquidar, crítico y capital inmovilizado.", score: 3 },
    ],
  },
  {
    key: "team",
    title: "Equipo de sala",
    options: [
      { value: "low", label: "Depende de una persona", helper: "Si falta el sumiller, la carta pierde fuerza.", score: 0 },
      { value: "medium", label: "Equipo con guías básicas", helper: "Hay discurso, pero no siempre consistente.", score: 1 },
      { value: "high", label: "Equipo guiado por carta digital", helper: "Maridajes, estilos y venta asistida en servicio.", score: 3 },
    ],
  },
  {
    key: "goal",
    title: "Objetivo principal de la carta",
    options: [
      { value: "survive", label: "Ordenar el caos operativo", helper: "Stock, compras, costes y referencias duplicadas.", score: 0 },
      { value: "sell", label: "Vender más y subir ticket", helper: "Rotación, copa, recomendación y margen.", score: 2 },
      { value: "identity", label: "Crear identidad gastronómica", helper: "Profundidad, relato, premios y experiencia.", score: 3 },
    ],
  },
];

const initialAnswers: Record<AnswerKey, string> = {
  listSize: "medium",
  stock: "partial",
  pos: "periodic",
  margin: "some",
  team: "medium",
  goal: "sell",
};

const profileData = {
  estrategico: {
    label: "Perfil RIM estratégico",
    tone: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    summary: "Tu carta ya puede funcionar como sistema de decisión: ventas, stock, margen y equipo empiezan a hablar el mismo idioma.",
    priority: "Convertir los datos en rutinas: revisión semanal de compras, alertas de margen y ruta de recomendación para sala.",
    actions: ["Activar alertas por referencia crítica", "Comparar PVP frente a categorías equivalentes", "Crear un cuadro mensual de rotación, margen y ticket"],
  },
  gourmet: {
    label: "Perfil RIM gastronómico",
    tone: "bg-wine/10 text-wine border-wine/30",
    summary: "La carta tiene potencial de identidad, profundidad y relato. El riesgo es que el valor gastronómico no siempre se traduzca en venta medible.",
    priority: "Separar vinos de imagen, vinos de rotación y vinos lastre sin empobrecer la experiencia.",
    actions: ["Marcar vinos protegidos por identidad", "Medir cobertura de cada familia gastronómica", "Formar sala con maridajes y alternativas por ticket"],
  },
  coleccionista: {
    label: "Perfil RIM coleccionista",
    tone: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    summary: "Hay profundidad y ambición, pero probablemente también capital inmovilizado y referencias que nadie empuja.",
    priority: "Detectar stock muerto, duplicidades por estilo y referencias que ocupan carta sin aportar venta ni margen.",
    actions: ["Aplicar Pareto 80/20 por facturación y margen", "Etiquetar no reponer y liquidar", "Reducir solapes de DO, añada y precio"],
  },
  turistico: {
    label: "Perfil RIM turístico",
    tone: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    summary: "La carta debe vender rápido, explicar bien y evitar decisiones complejas en servicio. La oportunidad está en ticket medio y vinos por copa.",
    priority: "Simplificar elección, reforzar estilos comprensibles y controlar el margen en referencias de alta salida.",
    actions: ["Crear rutas de recomendación por idioma y ticket", "Revisar copa, espumosos y blancos de rotación", "Medir ticket vino por mesa y mix turístico/local"],
  },
  pasivo: {
    label: "Perfil RIM pasivo",
    tone: "bg-slate-500/10 text-slate-700 border-slate-500/30",
    summary: "La carta existe, pero no trabaja todavía como palanca comercial. Falta ritmo de revisión y conexión con datos.",
    priority: "Empezar por cuatro señales: PVP, coste, stock y ventas por referencia.",
    actions: ["Conectar carta con stock básico", "Revisar 20 referencias de mayor impacto", "Crear una rutina mensual de compras y no reponer"],
  },
  superviviente: {
    label: "Perfil RIM superviviente",
    tone: "bg-red-500/10 text-red-700 border-red-500/30",
    summary: "La gestión de vino está absorbiendo tiempo y probablemente escondiendo fugas de margen, stock y compras.",
    priority: "Recuperar control operativo antes de ampliar carta: inventario, costes reales, PVP y distribuidores.",
    actions: ["Auditar albaranes y facturas", "Cerrar un inventario inicial", "Eliminar referencias duplicadas o sin función clara"],
  },
};

const TestPerfilRim = () => {
  const { localePath } = useLanguage();
  const [answers, setAnswers] = useState(initialAnswers);

  const result = useMemo(() => {
    const answerScore = (key: AnswerKey) => questions.find((q) => q.key === key)?.options.find((o) => o.value === answers[key])?.score ?? 0;
    const operational = answerScore("stock") + answerScore("pos") + answerScore("margin") + answerScore("team");
    const listSize = answers.listSize;
    const goal = answers.goal;

    let profile: keyof typeof profileData = "pasivo";
    if (operational <= 2 || goal === "survive") profile = "superviviente";
    else if (goal === "identity" && operational >= 8) profile = "gourmet";
    else if (listSize === "large" && operational <= 8) profile = "coleccionista";
    else if (goal === "sell" && operational >= 9) profile = "estrategico";
    else if (listSize === "short" && goal === "sell") profile = "turistico";

    const maturity = Math.round(((operational + answerScore("listSize") + answerScore("goal")) / 18) * 100);
    return { profile, maturity: Math.min(100, Math.max(0, maturity)), operational };
  }, [answers]);

  const data = profileData[result.profile];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title="Test Perfil RIM para restaurantes"
        description="Descubre qué perfil RIM tiene tu restaurante: estratégico, gastronómico, coleccionista, turístico, pasivo o superviviente."
        url={`${CANONICAL_DOMAIN}/herramientas/test-perfil-rim`}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Test Perfil RIM" }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              Demo · Perfil RIM
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              Test Perfil RIM de tu restaurante
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Responde seis preguntas y detecta si tu carta de vinos está funcionando como palanca comercial, como carta de identidad o como una fuente silenciosa de coste.
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Compass size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">Diagnóstico rápido</h2>
                  <p className="text-sm text-muted-foreground">Pensado para restaurantes, hoteles y wine bars.</p>
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.key}>
                    <h3 className="font-semibold mb-3">{question.title}</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {question.options.map((option) => {
                        const selected = answers[question.key] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setAnswers((current) => ({ ...current, [question.key]: option.value }))}
                            className={`text-left rounded-lg border p-4 min-h-28 transition-all active:scale-[0.98] ${
                              selected ? "border-wine bg-wine/10" : "border-border bg-background/60 hover:border-wine/40"
                            }`}
                          >
                            <span className="block text-sm font-semibold">{option.label}</span>
                            <span className="block text-xs text-muted-foreground mt-2 leading-relaxed">{option.helper}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6 sticky top-24">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Resultado</p>
                  <h2 className="font-heading text-2xl font-semibold">{data.label}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${data.tone}`}>
                  <CheckCircle size={14} />
                  {result.maturity}/100
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{data.summary}</p>

              <div className="rounded-lg border border-border bg-background/70 p-5 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-wine" />
                  <h3 className="font-heading text-xl font-semibold">Prioridad ahora</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.priority}</p>
              </div>

              <div className="space-y-3 mb-6">
                {data.actions.map((action) => (
                  <div key={action} className="flex gap-3 rounded-lg bg-background/70 p-3">
                    <CheckCircle size={16} className="text-wine mt-0.5 shrink-0" />
                    <p className="text-sm">{action}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Madurez RIM</p>
                  <p className="text-2xl font-semibold mt-1">{result.maturity}%</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Control operativo</p>
                  <p className="text-2xl font-semibold mt-1">{result.operational}/12</p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "test-perfil-rim")}
              >
                <Link to={localePath("/demo")}>
                  Ver cómo lo automatiza Winerim
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Wine, title: "Carta", text: "Evalúa si la carta tiene una función comercial clara o solo acumula referencias." },
              { icon: BarChart3, title: "Datos", text: "Relaciona stock, TPV, coste, margen y equipo para encontrar el primer cuello de botella." },
              { icon: ClipboardList, title: "Ruta", text: "Convierte el perfil en una lista corta de acciones para empezar esta semana." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">Diagnóstico completo</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">El test te da el perfil. Winerim te da las señales vivas.</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              Con Winerim puedes cruzar carta, ventas, stock, costes, distribuidores y equipo para saber qué comprar, qué no reponer y qué empujar en sala.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/perfil-rim-restaurante")}>Descargar plantilla Perfil RIM</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/producto/winerim-core")}>Ver Winerim Core</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="test-perfil-rim"
          faqs={[
            {
              q: "¿Qué significa RIM en este contexto?",
              a: "Lo usamos como marco de madurez para entender cómo un restaurante gestiona carta, stock, ventas, margen, compras y equipo alrededor del vino.",
            },
            {
              q: "¿El perfil es definitivo?",
              a: "No. Es un diagnóstico rápido. El perfil real cambia cuando se conectan datos de carta, stock, TPV, costes y distribuidores.",
            },
            {
              q: "¿Para qué sirve saber el perfil?",
              a: "Sirve para priorizar. Un restaurante superviviente necesita control; uno coleccionista necesita limpieza de stock; uno gastronómico necesita proteger identidad sin perder margen.",
            },
          ]}
        />

        <InternalLinks
          title="Herramientas relacionadas"
          links={[
            { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
            { to: "/herramientas/simulador-senal-margenes", label: "Simulador de señal de Márgenes", type: "tool" },
            { to: "/recursos/perfil-rim-restaurante", label: "Plantilla Perfil RIM", type: "resource" },
            { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TestPerfilRim;
