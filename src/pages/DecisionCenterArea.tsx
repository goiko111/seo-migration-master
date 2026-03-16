import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, Package, ShoppingCart, BarChart3, Wine, Building2,
  ArrowLeft, Lock, Shield, Info, Target, Lightbulb, AlertTriangle,
  FileText, Clock, ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import margenesPricingContent, { type DeepAreaContent, type SubTopic } from "@/data/decisionCenter/margenesPricing";
import stockRotacionContent from "@/data/decisionCenter/stockRotacion";

/* ── Password gate ── */
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

/* ── Simple areas (non-deep) ── */
type Priority = "inmediato" | "esta semana" | "este mes" | "seguimiento";

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  "inmediato":    { label: "Inmediato",    color: "text-destructive",  bg: "bg-destructive/10" },
  "esta semana":  { label: "Esta semana",  color: "text-amber-500",    bg: "bg-amber-500/10" },
  "este mes":     { label: "Este mes",     color: "text-blue-500",     bg: "bg-blue-500/10" },
  "seguimiento":  { label: "Seguimiento",  color: "text-muted-foreground", bg: "bg-muted" },
};

interface SimpleAreaContent {
  name: string;
  tagline: string;
  icon: React.ElementType;
  accent: string;
  bg: string;
  priority: Priority;
  queSignifica: string[];
  porQueImporta: string[];
  queHacerAhora: string[];
  erroresComunes: { mistake: string; consequence: string }[];
  aprenderMas: { label: string; href: string }[];
}

const simpleAreas: Record<string, SimpleAreaContent> = {
  "stock-rotacion": {
    name: "Stock y rotación",
    tagline: "Detecta lo que no se mueve antes de que sea tarde",
    icon: Package, accent: "text-emerald-500", bg: "bg-emerald-500/10", priority: "esta semana",
    queSignifica: [
      "La rotación mide cuántas veces vendes tu stock medio en un periodo. Si un vino rota menos de 1 vez al mes, probablemente tienes un problema.",
      "El stock muerto es dinero parado. Cada botella sin venta ocupa espacio, inmoviliza capital y genera coste de oportunidad.",
      "No todo el stock lento es malo: un reserva puede justificar 3 meses de espera. Pero necesitas saber cuál es estratégico y cuál es simplemente olvidado.",
    ],
    porQueImporta: [
      "Un restaurante medio tiene entre el 10% y el 25% de su carta sin venta real en los últimos 60 días.",
      "Ese capital inmovilizado podría invertirse en referencias que sí rotan y generan margen.",
      "Un stock desordenado genera errores de pedido, merma y una carta que no refleja lo que realmente vendes.",
      "La rotación es el indicador más directo de si tu carta está alineada con lo que pide tu cliente.",
    ],
    queHacerAhora: [
      "Identifica todas las referencias sin venta en los últimos 60 días.",
      "Calcula el capital inmovilizado total en vinos sin rotación.",
      "Clasifica cada referencia sin venta: ¿promocionar, reubicar en carta, retirar o liquidar?",
      "Establece una revisión mensual de stock como rutina operativa.",
    ],
    erroresComunes: [
      { mistake: "Esperar a que el vino se degrade para actuar", consequence: "Pierdes el valor del producto y la oportunidad de venderlo con margen." },
      { mistake: "No diferenciar entre stock estratégico y stock muerto", consequence: "Retiras vinos que deberían quedarse o mantienes los que deberían irse." },
      { mistake: "Comprar por inercia sin revisar datos de rotación", consequence: "Acumulas más de lo que no vendes y repites errores cada mes." },
      { mistake: "Mantener referencias 'por si alguien las pide'", consequence: "Tu carta crece sin control y diluye la atención del comensal." },
    ],
    aprenderMas: [
      { label: "Checklist detección de vinos muertos", href: "/recursos/checklist-deteccion-vinos-muertos" },
      { label: "Calculadora de stock muerto", href: "/herramientas/calculadora-stock-muerto" },
      { label: "Guía: Mejorar la rotación de vinos", href: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
    ],
  },
  "compras-reposicion": {
    name: "Compras y reposición", tagline: "Compra con datos, no con intuición",
    icon: ShoppingCart, accent: "text-blue-500", bg: "bg-blue-500/10", priority: "este mes",
    queSignifica: [
      "Comprar bien no es comprar barato. Es comprar lo que se va a vender, al precio adecuado, en la cantidad correcta y en el momento justo.",
      "La reposición debe estar guiada por datos de venta y rotación, no por la agenda del comercial.",
      "Cada decisión de compra impacta directamente en tu margen, tu stock y la coherencia de tu carta.",
    ],
    porQueImporta: [
      "Si un proveedor sube precios y no lo ajustas en carta, tu margen baja sin que lo notes.",
      "Comprar volumen por descuento sin demanda real genera stock muerto y cash-flow negativo.",
      "La concentración en pocos proveedores te deja sin poder de negociación.",
      "Conectar compras con rendimiento es la diferencia entre gestión reactiva y estratégica.",
    ],
    queHacerAhora: [
      "Revisa si algún proveedor ha subido precios sin que hayas ajustado tu carta.",
      "Cruza rotación con coste: ¿estás comprando mucho de lo que no vendes?",
      "Evalúa si puedes consolidar proveedores para mejorar condiciones.",
      "Crea un calendario de revisión de compras mensual vinculado a datos de venta.",
    ],
    erroresComunes: [
      { mistake: "Comprar sin consultar datos de venta y rotación", consequence: "Repones lo que no se vende y te quedas sin lo que sí se pide." },
      { mistake: "No negociar condiciones por fidelidad al proveedor", consequence: "Pagas más de lo necesario sin obtener mejor servicio." },
      { mistake: "Acumular stock por ofertas de volumen sin demanda real", consequence: "Inmovilizas capital y aumentas el riesgo de merma." },
      { mistake: "No tener visibilidad del coste real de cada referencia", consequence: "Tomas decisiones de pricing sobre datos incorrectos." },
    ],
    aprenderMas: [
      { label: "Calculadora de compra inteligente", href: "/herramientas/calculadora-compra-inteligente" },
      { label: "Guía: Usar datos para decidir qué vinos comprar", href: "/guias/como-usar-datos-para-decidir-que-vinos-comprar" },
      { label: "Winerim Supply", href: "/producto/winerim-supply" },
    ],
  },
  "carta-equilibrio": {
    name: "Carta y equilibrio", tagline: "Tu carta debe contar una historia coherente",
    icon: BarChart3, accent: "text-wine", bg: "bg-wine/10", priority: "este mes",
    queSignifica: [
      "El equilibrio de una carta no es tener 'un poco de todo'. Es que cada referencia tenga un rol claro.",
      "La canibalización ocurre cuando dos o más vinos compiten por el mismo cliente en la misma franja.",
      "Una carta equilibrada no es la más grande, sino la más coherente con tu concepto.",
    ],
    porQueImporta: [
      "Una carta inflada ralentiza al comensal, reduce la conversión y aumenta el stock muerto.",
      "Un desequilibrio por tipo puede estar ignorando lo que realmente pide tu cliente.",
      "La arquitectura de carta define tu posicionamiento, tu margen medio y tu experiencia de mesa.",
      "Cada referencia que añades sin quitar otra diluye la atención.",
    ],
    queHacerAhora: [
      "Mapea tu carta por franjas de precio y detecta huecos o saturaciones.",
      "Identifica pares de referencias que compiten entre sí.",
      "Evalúa si la distribución por tipos refleja lo que realmente pide tu clientela.",
      "Revisa si tu carta cuenta una historia coherente con tu concepto gastronómico.",
    ],
    erroresComunes: [
      { mistake: "Añadir referencias sin retirar otras", consequence: "La carta crece por inercia y se convierte en un catálogo inmanejable." },
      { mistake: "No tener criterio de arquitectura", consequence: "Cada cambio es reactivo y la carta pierde coherencia." },
      { mistake: "Sobrerepresentar una región o estilo por gustos personales", consequence: "Tu carta habla de ti, no de tu cliente." },
      { mistake: "No adaptar el equilibrio al perfil real del cliente", consequence: "Ofreces lo que no se pide y no ofreces lo que sí se vendería." },
    ],
    aprenderMas: [
      { label: "Plantilla de equilibrio de carta", href: "/recursos/plantilla-equilibrio-carta" },
      { label: "Plantilla wine mapping", href: "/recursos/plantilla-wine-mapping-restaurante" },
      { label: "Guía: Detectar canibalización", href: "/guias/como-detectar-canibalizacion-vinos-carta" },
    ],
  },
  "vino-por-copa": {
    name: "Vino por copa", tagline: "El programa de copa como motor de margen",
    icon: Wine, accent: "text-purple-500", bg: "bg-purple-500/10", priority: "esta semana",
    queSignifica: [
      "El vino por copa no es solo servir copas sueltas. Es un programa con lógica propia.",
      "Bien ejecutado, es tu mayor palanca de margen. Mal ejecutado, tu mayor fuente de pérdida invisible.",
      "El ratio copa/botella es un indicador clave de comportamiento de consumo.",
    ],
    porQueImporta: [
      "La copa permite al comensal explorar sin comprometerse. Eso aumenta la conversión y el ticket medio.",
      "El margen por copa puede ser 2-3× superior al de la botella si se calcula bien.",
      "La merma no contabilizada es el mayor enemigo silencioso de la rentabilidad por copa.",
      "Un programa bien diseñado posiciona tu restaurante como accesible y experto a la vez.",
    ],
    queHacerAhora: [
      "Revisa si tu pricing por copa cubre merma + margen objetivo.",
      "Analiza qué copas venden bien y cuáles generan merma recurrente.",
      "Evalúa si tu selección de copas refleja los estilos que más pide tu clientela.",
      "Forma a tu equipo de sala para recomendar copa con criterio.",
    ],
    erroresComunes: [
      { mistake: "Calcular el precio de la copa dividiendo la botella entre 5", consequence: "No cubres merma, servicio ni margen real." },
      { mistake: "No contabilizar la merma como coste real", consequence: "Tu margen teórico no refleja lo que realmente ganas." },
      { mistake: "Ofrecer demasiadas copas sin capacidad de rotarlas", consequence: "Abres botellas que no terminas y multiplicas la pérdida." },
      { mistake: "No formar al equipo de sala para recomendar copas", consequence: "El comensal no sabe qué elegir y pide 'el más barato' o nada." },
    ],
    aprenderMas: [
      { label: "Calculadora precio por copa", href: "/herramientas/calculadora-precio-vino-por-copa" },
      { label: "Estrategia de vinos por copa", href: "/recursos/plantilla-estrategia-vinos-por-copa" },
      { label: "Guía: Vino por copa sin perder margen", href: "/guias/como-implantar-vino-por-copa-sin-perder-margen" },
    ],
  },
  "grupos-benchmarking": {
    name: "Grupos y benchmarking", tagline: "Governa la categoría vino a escala",
    icon: Building2, accent: "text-rose-500", bg: "bg-rose-500/10", priority: "este mes",
    queSignifica: [
      "Gestionar la categoría vino en un grupo no es replicar la misma carta en todos los locales.",
      "El benchmarking interno permite detectar desviaciones antes de que impacten en resultados.",
      "Sin datos comparativos, cada local opera como una isla.",
    ],
    porQueImporta: [
      "Una desviación de pricing del 15% entre locales destruye la coherencia de marca.",
      "Sin benchmarking, los problemas no se detectan hasta el cierre trimestral.",
      "Centralizar compras sin visibilidad de rendimiento es comprar a ciegas.",
      "El control de la categoría vino a escala es una ventaja competitiva real.",
    ],
    queHacerAhora: [
      "Compara el top 10 de cada local: ¿venden lo mismo o hay divergencias?",
      "Detecta locales con márgenes por debajo de la media del grupo.",
      "Evalúa si la política de compras se ejecuta con coherencia en cada punto de venta.",
      "Establece un scorecard mensual comparativo entre locales.",
    ],
    erroresComunes: [
      { mistake: "Imponer la misma carta en todos los locales sin adaptar", consequence: "Pierdes relevancia local y generas stock muerto." },
      { mistake: "No tener benchmarking interno", consequence: "Cada local toma decisiones aisladas." },
      { mistake: "Centralizar compras sin datos de rendimiento por local", consequence: "Compras para el grupo sin saber si cada local vende lo que recibe." },
      { mistake: "No detectar desviaciones de pricing a tiempo", consequence: "Un local vende 3 € más barato y no lo sabes hasta la queja." },
    ],
    aprenderMas: [
      { label: "Control para grupos", href: "/recursos/plantilla-control-grupo-restauracion" },
      { label: "Guía: Gestionar carta en grupos", href: "/guias/como-gestionar-carta-vinos-grupos-restauracion" },
      { label: "Solución para grupos de restauración", href: "/soluciones/grupos-restauracion" },
    ],
  },
};

/* ── Gate UI ── */
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

/* ── Section block config ── */
const blockConfig = {
  queSignifica:    { title: "Qué significa",      icon: Info,           style: "bg-muted/50 text-muted-foreground" },
  porQueImporta:   { title: "Por qué importa",    icon: Target,         style: "bg-wine/10 text-wine" },
  queHacerAhora:   { title: "Qué hacer ahora",    icon: Lightbulb,      style: "bg-emerald-500/10 text-emerald-500" },
  erroresComunes:  { title: "Errores comunes",     icon: AlertTriangle,  style: "bg-destructive/10 text-destructive" },
  aprenderMas:     { title: "Aprender más",        icon: FileText,       style: "bg-blue-500/10 text-blue-400" },
};

/* ── Reusable content block ── */
const ContentBlock = ({ blockKey, children }: { blockKey: keyof typeof blockConfig; children: React.ReactNode }) => {
  const config = blockConfig[blockKey];
  const BlockIcon = config.icon;
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-lg ${config.style} flex items-center justify-center`}>
          <BlockIcon size={18} />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground">{config.title}</h3>
      </div>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   DEEP AREA VIEW — used for "margenes-pricing"
   ══════════════════════════════════════════════════════ */

const SubTopicAccordion = ({ subtopic, index }: { subtopic: SubTopic; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.04}>
      <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-muted/20 transition-colors group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 text-sm font-bold shrink-0">
            {index + 1}
          </span>
          <h3 className="font-heading text-base font-bold text-foreground flex-1 group-hover:text-wine transition-colors">
            {subtopic.title}
          </h3>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-muted-foreground/50" />
          </motion.div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6 space-y-6 border-t border-border pt-6">
                {/* Qué significa */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-muted/50 flex items-center justify-center">
                      <Info size={13} className="text-muted-foreground" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">Qué significa</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.queSignifica}</p>
                </div>

                {/* Por qué importa */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-wine/10 flex items-center justify-center">
                      <Target size={13} className="text-wine" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">Por qué importa</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.porQueImporta}</p>
                </div>

                {/* Qué hacer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                      <Lightbulb size={13} className="text-emerald-500" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">Qué hacer</h4>
                  </div>
                  <ol className="space-y-2.5">
                    {subtopic.queHacer.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Errores frecuentes */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle size={13} className="text-destructive" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">Errores frecuentes</h4>
                  </div>
                  <div className="space-y-3">
                    {subtopic.errores.map((err, i) => (
                      <div key={i} className="flex items-start gap-2.5 pb-3 border-b border-border last:border-0 last:pb-0">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold shrink-0 mt-0.5">
                          ✕
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{err.mistake}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{err.consequence}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
};

const DeepAreaView = ({ content }: { content: DeepAreaContent }) => {
  const Icon = content.icon;

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

            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl ${content.bg} flex items-center justify-center shrink-0`}>
                <Icon size={24} className={content.accent} />
              </div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {content.name}
                </motion.h1>
                <p className={`text-sm font-semibold tracking-wider ${content.accent} mt-1`}>{content.tagline}</p>
              </div>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-sm text-muted-foreground leading-relaxed max-w-3xl mt-4">
              {content.intro}
            </motion.p>
          </div>
        </section>

        {/* Table of contents */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card/50 p-5 md:p-6">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50 mb-3">
                En esta sección
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {content.subtopics.map((st, i) => (
                  <span key={st.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {st.title}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Subtopics */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <div className="space-y-4">
            {content.subtopics.map((st, i) => (
              <SubTopicAccordion key={st.id} subtopic={st} index={i} />
            ))}
          </div>
        </section>

        {/* Related resources */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FileText size={18} className="text-blue-400" />
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">Recursos y herramientas</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {content.links.map((link) => (
                  <Link key={link.href} to={link.href}
                    className="flex flex-col gap-1 rounded-lg border border-border p-4 hover:border-wine/30 hover:bg-wine/5 transition-all group">
                    <p className="text-sm font-semibold text-foreground group-hover:text-wine transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Back */}
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

/* ══════════════════════════════════════════════════════
   SIMPLE AREA VIEW — used for other 5 areas
   ══════════════════════════════════════════════════════ */

const SimpleAreaView = ({ area }: { area: SimpleAreaContent }) => {
  const Icon = area.icon;
  const prio = priorityConfig[area.priority];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-wine/4 rounded-full blur-[140px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 md:px-12">
            <Link to="/decision-center" className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-wine transition-colors mb-6">
              <ArrowLeft size={12} /> Decision Center
            </Link>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl ${area.bg} flex items-center justify-center shrink-0`}>
                <Icon size={24} className={area.accent} />
              </div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {area.name}
                </motion.h1>
                <p className={`text-sm font-semibold tracking-wider ${area.accent} mt-1`}>{area.tagline}</p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${prio.bg} mt-2`}>
              <Clock size={12} className={prio.color} />
              <span className={`text-xs font-semibold tracking-wider uppercase ${prio.color}`}>Prioridad: {prio.label}</span>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <div className="space-y-8">
            <ScrollReveal><ContentBlock blockKey="queSignifica">
              <ul className="space-y-4">
                {area.queSignifica.map((t, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.06}><ContentBlock blockKey="porQueImporta">
              <ul className="space-y-4">
                {area.porQueImporta.map((t, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Target size={14} className="text-wine/40 mt-0.5 shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.12}><ContentBlock blockKey="queHacerAhora">
              <ol className="space-y-4">
                {area.queHacerAhora.map((t, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>{t}
                  </li>
                ))}
              </ol>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.18}><ContentBlock blockKey="erroresComunes">
              <div className="space-y-4">
                {area.erroresComunes.map((err, j) => (
                  <div key={j} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{err.mistake}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{err.consequence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.24}><ContentBlock blockKey="aprenderMas">
              <div className="space-y-3">
                {area.aprenderMas.map((link, j) => (
                  <Link key={j} to={link.href} className="flex items-center gap-3 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
                    <FileText size={14} className="shrink-0" />
                    <span className="group-hover:underline">{link.label}</span>
                  </Link>
                ))}
              </div>
            </ContentBlock></ScrollReveal>
          </div>
        </section>

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

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT — routes to deep or simple view
   ══════════════════════════════════════════════════════ */

const DecisionCenterArea = () => {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const { granted, unlock } = useGate();

  if (!granted) return <PasswordGate onUnlock={unlock} />;

  // Deep area: Márgenes y pricing
  if (areaSlug === "margenes-pricing") {
    return <DeepAreaView content={margenesPricingContent} />;
  }

  // Simple areas
  const area = areaSlug ? simpleAreas[areaSlug] : undefined;
  if (!area) return <Navigate to="/decision-center" replace />;

  return <SimpleAreaView area={area} />;
};

export default DecisionCenterArea;
