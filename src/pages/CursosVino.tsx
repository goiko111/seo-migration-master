import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, BookOpen, Clock, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import coursesLibrary from "@/data/coursesLibrary";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationDict } from "@/i18n/types";

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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="flex justify-center mb-6">
            <Lock size={32} className="text-wine" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Academia Winerim</h1>
          <p className="text-muted-foreground text-center text-sm mb-6">
            Accede al programa de formación en vino para tu equipo.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-wine/50"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-wine text-white font-semibold hover:bg-wine/90 transition"
            >
              Acceder
            </button>
            {error && (
              <p className="text-red-500 text-xs text-center">Contraseña incorrecta</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default function CursosVino() {
  const { granted, unlock } = useGate();
  const { t } = useLanguage();

  if (!granted) {
    return <PasswordGate onUnlock={unlock} />;
  }

  return (
    <>
      <SEOHead
        title="Academia Winerim - Cursos de Vino para Equipos"
        description="Programa de formación completo en vino para camareros, jefes de sala y directores de F&B. Desde fundamentos hasta estrategia avanzada."
      />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-wine/5 via-background to-background">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Academia Winerim
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Programa de formación completo en vino para tu equipo. De camarero sin experiencia a director de F&B.
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-2">
                <BookOpen size={16} /> 4 niveles
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> 14 horas totales
              </span>
              <span className="flex items-center gap-2">
                <Award size={16} /> Certificados
              </span>
            </div>
          </div>
        </motion.section>

        {/* Course Levels Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coursesLibrary.map((level, idx) => (
              <ScrollReveal key={level.id} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Link
                    to={`/decision-center/cursos/${level.slug}`}
                    className="block h-full rounded-xl border border-border bg-card hover:bg-card/80 transition overflow-hidden group"
                  >
                    <div className="p-8 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-4xl mb-3">{level.icon}</div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">
                            {level.title}
                          </h3>
                          <p className="text-wine font-semibold text-sm mb-2">
                            Nivel {level.level} de 4
                          </p>
                        </div>
                        <ArrowRight className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition" />
                      </div>

                      {/* Subtitle and description */}
                      <p className="text-muted-foreground text-sm font-medium mb-4">
                        {level.subtitle}
                      </p>
                      <p className="text-foreground text-sm mb-6 flex-grow">
                        {level.description}
                      </p>

                      {/* Meta info */}
                      <div className="space-y-2 mb-6 pt-6 border-t border-border">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="w-24 font-semibold">Audiencia:</span>
                          <span>{level.targetAudience}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="w-24 font-semibold">Duración:</span>
                          <span>{level.estimatedHours} horas</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="w-24 font-semibold">Módulos:</span>
                          <span>{level.modules.length} lecciones</span>
                        </div>
                        <div className="flex items-start text-sm text-muted-foreground">
                          <span className="w-24 font-semibold flex-shrink-0">Requisito:</span>
                          <span>{level.prerequisites}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-lg bg-wine text-white font-semibold hover:bg-wine/90 transition flex items-center justify-center gap-2"
                      >
                        Ver curso
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">Sobre Academia Winerim</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Diseñado para restaurantes</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Cada curso está diseñado específicamente para profesionales de la hostelería. Los contenidos son prácticos, aplicables en la mesa, y se basan en situaciones reales.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Progresión clara</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Desde camarero principiante hasta director de F&B. Cada nivel se basa en el anterior, creando un camino claro de aprendizaje.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Certificados reconocidos</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Al completar cada nivel, tu equipo recibe un certificado que verifica su competencia en vino.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Videos + Quizzes</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Cada módulo combina videos explicativos con quizzes interactivos para asegurar comprensión y retención.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}
