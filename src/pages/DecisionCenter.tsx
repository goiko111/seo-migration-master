import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DollarSign, Package, ShoppingCart, BarChart3, Wine, Building2,
  ArrowRight, Lock, Shield, Sparkles, Briefcase, Store, Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { InsightCard, insightLibrary } from "@/components/decision";

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

/* ── Area data ── */
type UserProfile = "direccion" | "sala" | "compras-fb" | "grupo";

const profileConfig: Record<UserProfile, { label: string; icon: typeof Briefcase }> = {
  "direccion":  { label: "Dirección",     icon: Briefcase },
  "sala":       { label: "Sala",          icon: Store },
  "compras-fb": { label: "Compras / F&B", icon: ShoppingCart },
  "grupo":      { label: "Grupo",         icon: Users },
};

interface Area {
  id: string;
  name: string;
  tagline: string;
  description: string;
  audience: string;
  profiles: UserProfile[];
  icon: React.ElementType;
  accent: string;
  bg: string;
  border: string;
  href: string;
}

const areas: Area[] = [
  {
    id: "margenes",
    name: "Márgenes y pricing",
    tagline: "Entiende la rentabilidad real de cada vino",
    description: "Qué significa cada métrica de margen, cómo interpretar desviaciones y qué palancas usar para mejorar la rentabilidad de tu carta sin tocar la experiencia del comensal.",
    audience: "Dirección, F&B managers, responsables de compras",
    profiles: ["direccion", "compras-fb"],
    icon: DollarSign,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    href: "/decision-center/margenes-pricing",
  },
  {
    id: "stock",
    name: "Stock y rotación",
    tagline: "Detecta lo que no se mueve antes de que sea tarde",
    description: "Cómo identificar vinos muertos, cuánto capital tienes inmovilizado, cuándo retirar una referencia y cómo mantener una bodega viva y rentable.",
    audience: "Jefes de sala, sumilleres, F&B managers",
    profiles: ["sala", "compras-fb", "direccion"],
    icon: Package,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    href: "/decision-center/stock-rotacion",
  },
  {
    id: "compras",
    name: "Compras y reposición",
    tagline: "Compra con datos, no con intuición",
    description: "Qué datos usar antes de comprar, cómo detectar sobrecostes, cuándo negociar condiciones y cómo conectar tus decisiones de compra con el rendimiento real de la carta.",
    audience: "Responsables de compras, dirección, propietarios",
    profiles: ["compras-fb", "direccion"],
    icon: ShoppingCart,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    href: "/decision-center/compras-reposicion",
  },
  {
    id: "carta",
    name: "Carta y equilibrio",
    tagline: "Tu carta debe contar una historia coherente",
    description: "Cómo evaluar el equilibrio de tu carta por estilos, precios, regiones y tipologías. Qué canibaliza, qué falta y cómo construir una arquitectura de carta que venda sola.",
    audience: "Sumilleres, directores de restaurante, F&B",
    profiles: ["sala", "direccion", "compras-fb"],
    icon: BarChart3,
    accent: "text-wine",
    bg: "bg-wine/10",
    border: "border-wine/20",
    href: "/decision-center/carta-equilibrio",
  },
  {
    id: "copa",
    name: "Vino por copa",
    tagline: "El programa de copa como motor de margen",
    description: "Cómo diseñar, ejecutar y controlar un programa de vino por copa rentable: selección, pricing, merma, rotación y la relación entre copa y botella.",
    audience: "Wine bars, restaurantes con copa, hoteles",
    profiles: ["sala", "direccion"],
    icon: Wine,
    accent: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    href: "/decision-center/vino-por-copa",
  },
  {
    id: "grupos",
    name: "Grupos y benchmarking",
    tagline: "Governa la categoría vino a escala",
    description: "Cómo comparar locales, detectar desviaciones, estandarizar criterios de compra y gestionar surtido de forma centralizada sin perder la identidad de cada restaurante.",
    audience: "Directores de operaciones, F&B corporativo",
    profiles: ["grupo", "direccion"],
    icon: Building2,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    href: "/decision-center/grupos-benchmarking",
  },
];

/* ── Password Gate UI ── */
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-wine" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Winerim Decision Center
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zona exclusiva para clientes. Introduce tu clave de acceso para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Clave de acceso"
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 transition-all ${
                error
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-border focus:ring-wine/30 focus:border-wine/50"
              }`}
              autoFocus
            />
            <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive font-medium"
            >
              Clave incorrecta. Revisa tu email de bienvenida o contacta con tu account manager.
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-wine text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
          >
            Acceder
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground/50 mt-6">
          ¿No tienes acceso?{" "}
          <Link to="/demo" className="text-wine hover:text-wine-light transition-colors">
            Solicita una demo
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

/* ── Hub page ── */
const DecisionCenter = () => {
  const { granted, unlock } = useGate();

  if (!granted) return <PasswordGate onUnlock={unlock} />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Winerim Decision Center | Zona de clientes"
        description="Interpreta tus métricas, entiende tus datos y actúa con criterio. La capa de conocimiento estratégico de Winerim."
        url="https://winerim.wine/decision-center"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-wine/4 rounded-full blur-[160px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
            >
              <Sparkles size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine">
                Zona de clientes
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Decision Center
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4"
            >
              Entiende tus métricas, interpreta los insights y actúa con criterio.
              Cada área te explica qué significan los datos, por qué importan,
              qué hacer ahora y qué errores evitar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-5 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-wine" />
                Software + Contexto + Acción
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {areas.length} áreas estratégicas
              </span>
            </motion.div>
          </div>
        </section>

        {/* Area cards grid */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={area.id} delay={i * 0.06}>
                  <Link
                    to={area.href}
                    className={`group relative flex flex-col h-full rounded-xl border ${area.border} bg-card/70 backdrop-blur-sm p-6 md:p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`}
                  >
                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl ${area.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon size={20} className={area.accent} />
                      </div>
                      <div>
                        <h2 className="font-heading text-base font-bold text-foreground leading-tight group-hover:text-wine transition-colors">
                          {area.name}
                        </h2>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className={`text-xs font-semibold tracking-wider uppercase ${area.accent} mb-3`}>
                      {area.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {area.description}
                    </p>

                    {/* Audience — profile badges */}
                    <div className="border-t border-border pt-3 mb-4">
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/50 mb-1.5">
                        Relevante para
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.profiles.map((p) => {
                          const cfg = profileConfig[p];
                          const PIcon = cfg.icon;
                          return (
                            <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-muted/50 text-muted-foreground">
                              <PIcon size={10} />
                              {cfg.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-wine/70 group-hover:text-wine transition-colors">
                      Entrar <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Contextual insights preview */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Contexto integrado en el producto
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Cuando Winerim detecta una alerta o un insight, te explica qué significa, por qué importa y qué hacer. Sin salir de tu flujo de trabajo.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["margen-bajo", "stock-muerto", "copa-poco-rentable", "baja-rotacion"] as const).map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.06}>
                <InsightCard insight={insightLibrary[key]} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Contextual note */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
                El Decision Center es una extensión estratégica de Winerim.
                No es documentación: es contexto para actuar mejor.
                Cada sección conecta con tus datos reales dentro de la plataforma.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DecisionCenter;
