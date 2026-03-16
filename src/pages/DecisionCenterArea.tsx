import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DollarSign, Package, ShoppingCart, BarChart3, Wine, Building2,
  ArrowLeft, Lock, Shield, BookOpen, AlertTriangle, Lightbulb, FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

/* ── Password gate (shared logic) ── */
const GATE_KEY = "wdc_access";
const GATE_PASSWORD = "winerim2026";

const useGate = () => {
  const [granted, setGranted] = useState(() => sessionStorage.getItem(GATE_KEY) === "true");
  const unlock = (pwd: string) => {
    if (pwd === GATE_PASSWORD) {
      sessionStorage.setItem(GATE_KEY, "true");
      setGranted(true);
      return true;
    }
    return false;
  };
  return { granted, unlock };
};

/* ── Area content ── */
interface AreaContent {
  name: string;
  tagline: string;
  icon: React.ElementType;
  accent: string;
  bg: string;
  sections: {
    title: string;
    icon: React.ElementType;
    items: string[];
  }[];
}

const areaContent: Record<string, AreaContent> = {
  "margenes-pricing": {
    name: "Márgenes y pricing",
    tagline: "Entiende la rentabilidad real de cada vino",
    icon: DollarSign,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    sections: [
      { title: "Qué métricas importan", icon: BarChart3, items: [
        "Margen bruto vs. contribución por referencia",
        "Multiplicador real vs. multiplicador declarado",
        "Margen ponderado por ventas (no solo por referencia)",
        "Distribución de precios por franja",
      ]},
      { title: "Qué hacer ahora", icon: Lightbulb, items: [
        "Revisa las 5 referencias con mayor volumen de venta y menor margen",
        "Compara tu multiplicador medio con el benchmark del sector (×2.5–3.5)",
        "Identifica oportunidades de repricing sin impacto en la percepción del cliente",
        "Ajusta precios en las franjas con menor competencia interna",
      ]},
      { title: "Errores frecuentes", icon: AlertTriangle, items: [
        "Aplicar un multiplicador único a toda la carta",
        "No revisar los márgenes tras cambios de coste del proveedor",
        "Confundir margen porcentual con contribución absoluta",
        "Ignorar el efecto del vino por copa en la rentabilidad global",
      ]},
      { title: "Recursos relacionados", icon: FileText, items: [
        "→ Calculadora de márgenes (/calculadora-margen-vino)",
        "→ Plantilla de análisis de márgenes (/recursos/plantilla-analisis-margenes)",
        "→ Guía: Cómo poner precio al vino (/precio-vino-restaurante)",
      ]},
    ],
  },
  "stock-rotacion": {
    name: "Stock y rotación",
    tagline: "Detecta lo que no se mueve antes de que sea tarde",
    icon: Package,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    sections: [
      { title: "Qué métricas importan", icon: BarChart3, items: [
        "Ratio de rotación por referencia (ventas / stock medio)",
        "Días de inventario por referencia",
        "Capital inmovilizado en referencias sin venta",
        "% de carta con rotación < 1 vez/mes",
      ]},
      { title: "Qué hacer ahora", icon: Lightbulb, items: [
        "Identifica todas las referencias sin venta en los últimos 60 días",
        "Calcula el capital inmovilizado total en vinos sin rotación",
        "Decide: ¿promocionar, reubicar, retirar o liquidar?",
        "Establece un proceso mensual de revisión de stock",
      ]},
      { title: "Errores frecuentes", icon: AlertTriangle, items: [
        "Esperar a que el vino se degrade para tomar acción",
        "No diferenciar entre stock estratégico y stock muerto",
        "Comprar por inercia sin revisar datos de rotación",
        "Mantener referencias 'por si alguien las pide'",
      ]},
      { title: "Recursos relacionados", icon: FileText, items: [
        "→ Checklist detección de vinos muertos (/recursos/checklist-deteccion-vinos-muertos)",
        "→ Calculadora de stock muerto (/herramientas/calculadora-stock-muerto)",
        "→ Guía: Mejorar la rotación de vinos (/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante)",
      ]},
    ],
  },
  "compras-reposicion": {
    name: "Compras y reposición",
    tagline: "Compra con datos, no con intuición",
    icon: ShoppingCart,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    sections: [
      { title: "Qué métricas importan", icon: BarChart3, items: [
        "Coste medio de compra por referencia vs. precio de venta",
        "Variación de coste por proveedor a lo largo del tiempo",
        "Frecuencia de reposición por referencia",
        "% del presupuesto concentrado en pocos proveedores",
      ]},
      { title: "Qué hacer ahora", icon: Lightbulb, items: [
        "Revisa si algún proveedor ha subido precios sin que lo hayas ajustado en carta",
        "Cruza rotación con coste: ¿estás comprando mucho de lo que no vendes?",
        "Evalúa si puedes consolidar proveedores para mejorar condiciones",
        "Crea un calendario de revisión de compras mensual",
      ]},
      { title: "Errores frecuentes", icon: AlertTriangle, items: [
        "Comprar sin consultar datos de venta y rotación",
        "No negociar condiciones por fidelidad al proveedor",
        "Acumular stock por ofertas de volumen sin demanda real",
        "No tener visibilidad del coste real de cada referencia",
      ]},
      { title: "Recursos relacionados", icon: FileText, items: [
        "→ Calculadora de compra inteligente (/herramientas/calculadora-compra-inteligente)",
        "→ Guía: Usar datos para decidir qué vinos comprar (/guias/como-usar-datos-para-decidir-que-vinos-comprar)",
        "→ Winerim Supply (/producto/winerim-supply)",
      ]},
    ],
  },
  "carta-equilibrio": {
    name: "Carta y equilibrio",
    tagline: "Tu carta debe contar una historia coherente",
    icon: BarChart3,
    accent: "text-wine",
    bg: "bg-wine/10",
    sections: [
      { title: "Qué métricas importan", icon: BarChart3, items: [
        "Distribución por tipo de vino (tinto, blanco, rosado, espumoso)",
        "Distribución por franja de precio",
        "Concentración por región o denominación",
        "Ratio de canibalización entre referencias similares",
      ]},
      { title: "Qué hacer ahora", icon: Lightbulb, items: [
        "Mapea tu carta por franjas de precio y detecta huecos o saturaciones",
        "Identifica pares de referencias que compiten entre sí",
        "Evalúa si la distribución por tipos refleja lo que pide tu cliente",
        "Revisa si tu carta cuenta una historia coherente con tu concepto gastronómico",
      ]},
      { title: "Errores frecuentes", icon: AlertTriangle, items: [
        "Añadir referencias sin retirar otras (carta inflada)",
        "No tener criterio de arquitectura: la carta crece por inercia",
        "Sobrerepresentar una región o estilo por gustos personales",
        "No adaptar el equilibrio al perfil real del cliente",
      ]},
      { title: "Recursos relacionados", icon: FileText, items: [
        "→ Plantilla de equilibrio de carta (/recursos/plantilla-equilibrio-carta)",
        "→ Plantilla wine mapping (/recursos/plantilla-wine-mapping-restaurante)",
        "→ Guía: Detectar canibalización (/guias/como-detectar-canibalizacion-vinos-carta)",
      ]},
    ],
  },
  "vino-por-copa": {
    name: "Vino por copa",
    tagline: "El programa de copa como motor de margen",
    icon: Wine,
    accent: "text-purple-500",
    bg: "bg-purple-500/10",
    sections: [
      { title: "Qué métricas importan", icon: BarChart3, items: [
        "Ratio copa/botella en ventas",
        "Margen por copa vs. margen por botella",
        "Merma real por referencia (ml desperdiciados)",
        "Rotación por copa (¿se termina la botella antes de que pierda calidad?)",
      ]},
      { title: "Qué hacer ahora", icon: Lightbulb, items: [
        "Revisa si tu pricing por copa cubre merma + margen objetivo",
        "Analiza qué copas venden bien y cuáles generan merma",
        "Evalúa si tu selección de copas refleja los estilos que más piden",
        "Prueba formatos intermedios (medias botellas, catavinos)",
      ]},
      { title: "Errores frecuentes", icon: AlertTriangle, items: [
        "Calcular el precio de la copa dividiendo el precio de la botella entre 5",
        "No contabilizar la merma como coste real",
        "Ofrecer demasiadas copas sin capacidad de rotarlas",
        "No formar al equipo de sala para recomendar copas",
      ]},
      { title: "Recursos relacionados", icon: FileText, items: [
        "→ Calculadora precio por copa (/herramientas/calculadora-precio-vino-por-copa)",
        "→ Estrategia de vinos por copa (/recursos/plantilla-estrategia-vinos-por-copa)",
        "→ Guía: Vino por copa sin perder margen (/guias/como-implantar-vino-por-copa-sin-perder-margen)",
      ]},
    ],
  },
  "grupos-benchmarking": {
    name: "Grupos y benchmarking",
    tagline: "Governa la categoría vino a escala",
    icon: Building2,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    sections: [
      { title: "Qué métricas importan", icon: BarChart3, items: [
        "Desviación de pricing entre locales del mismo grupo",
        "Diferencias de margen medio por local",
        "Nivel de solapamiento de surtido entre establecimientos",
        "Rendimiento comparado por categoría (tinto, blanco, copa, etc.)",
      ]},
      { title: "Qué hacer ahora", icon: Lightbulb, items: [
        "Compara el top 10 de cada local: ¿venden lo mismo o hay divergencias?",
        "Detecta locales con márgenes significativamente por debajo de la media",
        "Evalúa si la política de compras centralizada se ejecuta con coherencia",
        "Establece un scorecard mensual comparativo entre locales",
      ]},
      { title: "Errores frecuentes", icon: AlertTriangle, items: [
        "Imponer la misma carta en todos los locales sin adaptar al contexto",
        "No tener benchmarking interno: cada local opera como isla",
        "Centralizar las compras sin visibilidad del rendimiento por local",
        "No detectar desviaciones de pricing hasta que impactan en la cuenta de resultados",
      ]},
      { title: "Recursos relacionados", icon: FileText, items: [
        "→ Control para grupos (/recursos/plantilla-control-grupo-restauracion)",
        "→ Guía: Gestionar carta en grupos (/guias/como-gestionar-carta-vinos-grupos-restauracion)",
        "→ Solución para grupos (/soluciones/grupos-restauracion)",
      ]},
    ],
  },
};

/* ── Gate UI (reused) ── */
const PasswordGate = ({ onUnlock }: { onUnlock: (pwd: string) => boolean }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUnlock(value.trim())) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-wine" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Decision Center</h1>
          <p className="text-sm text-muted-foreground">Introduce tu clave de acceso para continuar.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input type="password" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Clave de acceso"
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 transition-all ${error ? "border-destructive focus:ring-destructive/30" : "border-border focus:ring-wine/30 focus:border-wine/50"}`}
              autoFocus />
            <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
          </div>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive font-medium">Clave incorrecta.</motion.p>}
          <button type="submit" className="w-full bg-gradient-wine text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">Acceder</button>
        </form>
      </motion.div>
    </div>
  );
};

/* ── Section icons mapping ── */
const sectionIconStyles: Record<string, string> = {
  "Qué métricas importan": "bg-amber-500/10 text-amber-500",
  "Qué hacer ahora": "bg-emerald-500/10 text-emerald-500",
  "Errores frecuentes": "bg-destructive/10 text-destructive",
  "Recursos relacionados": "bg-blue-500/10 text-blue-400",
};

/* ── Area detail page ── */
const DecisionCenterArea = () => {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const { granted, unlock } = useGate();

  if (!granted) return <PasswordGate onUnlock={unlock} />;

  const area = areaSlug ? areaContent[areaSlug] : undefined;
  if (!area) return <Navigate to="/decision-center" replace />;

  const Icon = area.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-wine/4 rounded-full blur-[140px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 md:px-12">
            <Link to="/decision-center" className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-wine transition-colors mb-6">
              <ArrowLeft size={12} /> Decision Center
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl ${area.bg} flex items-center justify-center`}>
                <Icon size={24} className={area.accent} />
              </div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {area.name}
                </motion.h1>
                <p className={`text-sm font-semibold tracking-wider ${area.accent}`}>{area.tagline}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <div className="space-y-8">
            {area.sections.map((section, i) => {
              const SectionIcon = section.icon;
              const iconStyle = sectionIconStyles[section.title] || "bg-muted text-muted-foreground";
              return (
                <ScrollReveal key={section.title} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-lg ${iconStyle} flex items-center justify-center`}>
                        <SectionIcon size={18} />
                      </div>
                      <h2 className="font-heading text-lg font-bold text-foreground">{section.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, j) => {
                        const isLink = item.startsWith("→");
                        if (isLink) {
                          const match = item.match(/→ (.+?) \((.+?)\)/);
                          if (match) {
                            return (
                              <li key={j}>
                                <Link to={match[2]} className="flex items-start gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
                                  <BookOpen size={14} className="mt-0.5 shrink-0" />
                                  <span className="group-hover:underline">{match[1]}</span>
                                </Link>
                              </li>
                            );
                          }
                        }
                        return (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Back link */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20 text-center">
          <Link to="/decision-center" className="inline-flex items-center gap-2 text-sm font-medium text-wine hover:text-wine-light transition-colors">
            <ArrowLeft size={14} /> Volver al Decision Center
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DecisionCenterArea;
