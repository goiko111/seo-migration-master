import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, Lock, CheckCircle, AlertCircle,
  ChevronDown, Clock, Award, BookOpen, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import coursesLibrary, { type CourseModule } from "@/data/coursesLibrary";
import { useLanguage } from "@/i18n/LanguageContext";

const i18n = {
  es: {
    backToCourses: "Volver a cursos",
    accessRestricted: "Acceso restringido",
    accessMessage: "Debes acceder a la Academia Winerim desde el Decision Center.",
    backToDecisionCenter: "Volver al Decision Center",
    courseModules: "Modulos del curso",
    whatYouWillLearn: "Que aprenderas",
    quiz: "Cuestionario",
    markComplete: "Marcar como completado",
    moduleCompleted: "Modulo completado",
    correct: "Correcto!",
    correctAnswer: "Respuesta correcta:",
    courseProgress: "Progreso del curso",
    of: "de",
    duration: "Duracion",
    certificate: "Certificado",
    progress: "Progreso",
    coming: "Proximamente",
    questions: "preguntas",
    congratulations: "Felicidades!",
    completedMessage: "Has completado",
    downloadCertificate: "Descargar certificado",
  },
  en: {
    backToCourses: "Back to courses",
    accessRestricted: "Access Restricted",
    accessMessage: "You must access Winerim Academy from the Decision Center.",
    backToDecisionCenter: "Back to Decision Center",
    courseModules: "Course Modules",
    whatYouWillLearn: "What You Will Learn",
    quiz: "Quiz",
    markComplete: "Mark as Completed",
    moduleCompleted: "Module Completed",
    correct: "Correct!",
    correctAnswer: "Correct Answer:",
    courseProgress: "Course Progress",
    of: "of",
    duration: "Duration",
    certificate: "Certificate",
    progress: "Progress",
    coming: "Coming Soon",
    questions: "questions",
    congratulations: "Congratulations!",
    completedMessage: "You have completed",
    downloadCertificate: "Download Certificate",
  },
  it: {
    backToCourses: "Torna ai corsi",
    accessRestricted: "Accesso Limitato",
    accessMessage: "Devi accedere all'Accademia Winerim dal Decision Center.",
    backToDecisionCenter: "Torna al Decision Center",
    courseModules: "Moduli del Corso",
    whatYouWillLearn: "Cosa Imparerai",
    quiz: "Quiz",
    markComplete: "Segna come Completato",
    moduleCompleted: "Modulo Completato",
    correct: "Corretto!",
    correctAnswer: "Risposta Corretta:",
    courseProgress: "Progresso del Corso",
    of: "di",
    duration: "Durata",
    certificate: "Certificato",
    progress: "Progresso",
    coming: "Prossimamente",
    questions: "domande",
    congratulations: "Congratulazioni!",
    completedMessage: "Hai completato",
    downloadCertificate: "Scarica Certificato",
  },
  fr: {
    backToCourses: "Retour aux cours",
    accessRestricted: "Acces Limite",
    accessMessage: "Vous devez acceder a l'Academie Winerim depuis le Decision Center.",
    backToDecisionCenter: "Retour au Decision Center",
    courseModules: "Modules du Cours",
    whatYouWillLearn: "Ce que Vous Apprendrez",
    quiz: "Quiz",
    markComplete: "Marquer comme Termine",
    moduleCompleted: "Module Termine",
    correct: "Correct!",
    correctAnswer: "Bonne Reponse:",
    courseProgress: "Progression du Cours",
    of: "sur",
    duration: "Duree",
    certificate: "Certificat",
    progress: "Progression",
    coming: "Bientot",
    questions: "questions",
    congratulations: "Felicitations!",
    completedMessage: "Vous avez termine",
    downloadCertificate: "Telecharger le Certificat",
  },
  de: {
    backToCourses: "Zuruck zu Kursen",
    accessRestricted: "Zugriff Eingeschrankt",
    accessMessage: "Sie mussen uber das Decision Center auf die Winerim Akademie zugreifen.",
    backToDecisionCenter: "Zuruck zum Decision Center",
    courseModules: "Kursmodule",
    whatYouWillLearn: "Was Sie Lernen Werden",
    quiz: "Quiz",
    markComplete: "Als Abgeschlossen Markieren",
    moduleCompleted: "Modul Abgeschlossen",
    correct: "Korrekt!",
    correctAnswer: "Richtige Antwort:",
    courseProgress: "Kursfortschritt",
    of: "von",
    duration: "Dauer",
    certificate: "Zertifikat",
    progress: "Fortschritt",
    coming: "In Kurze",
    questions: "Fragen",
    congratulations: "Herzlichen Gluckwunsch!",
    completedMessage: "Sie haben abgeschlossen",
    downloadCertificate: "Zertifikat Herunterladen",
  },
  pt: {
    backToCourses: "Voltar para cursos",
    accessRestricted: "Acesso Restrito",
    accessMessage: "Voce deve acessar a Academia Winerim a partir do Decision Center.",
    backToDecisionCenter: "Voltar para Decision Center",
    courseModules: "Modulos do Curso",
    whatYouWillLearn: "O Que Voce Aprendera",
    quiz: "Quiz",
    markComplete: "Marcar como Concluido",
    moduleCompleted: "Modulo Concluido",
    correct: "Correto!",
    correctAnswer: "Resposta Correta:",
    courseProgress: "Progresso do Curso",
    of: "de",
    duration: "Duracao",
    certificate: "Certificado",
    progress: "Progresso",
    coming: "Em Breve",
    questions: "perguntas",
    congratulations: "Parabens!",
    completedMessage: "Voce completou",
    downloadCertificate: "Baixar Certificado",
  },
};

/* ── Password gate ── */
const GATE_KEY = "wdc_access";
const GATE_PASSWORD = "winerim2026";

const useGate = () => {
  const granted = sessionStorage.getItem(GATE_KEY) === "true";
  return { granted };
};

export default function CursoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const { granted } = useGate();
  const { lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n];

  const course = coursesLibrary.find((c) => c.slug === slug);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<{ moduleId: string; questionIdx: number } | null>(
    null
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number[]>>({});

  if (!granted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <Lock size={48} className="text-wine mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t.accessRestricted}</h1>
            <p className="text-muted-foreground mb-4">
              {t.accessMessage}
            </p>
            <Link to="/decision-center" className="text-wine font-semibold hover:underline">
              {t.backToDecisionCenter}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return <Navigate to="/decision-center/cursos" />;
  }

  const progressPercent = (completedModules.length / course.modules.length) * 100;
  const progress = Math.round(progressPercent);

  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const markModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleQuizAnswer = (moduleId: string, questionIdx: number, answer: number) => {
    const key = `${moduleId}-q${questionIdx}`;
    setQuizAnswers({ ...quizAnswers, [key]: [answer] });
  };

  const getQuizAnswer = (moduleId: string, questionIdx: number): number | undefined => {
    return quizAnswers[`${moduleId}-q${questionIdx}`]?.[0];
  };

  const renderModuleContent = (module: CourseModule) => {
    const isComplete = completedModules.includes(module.id);

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={module.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 border-t border-border space-y-6">
            {/* Video Placeholder */}
            <div className="rounded-lg bg-muted/50 border border-border aspect-video flex items-center justify-center relative overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 bg-gradient-to-br from-wine/20 to-wine/5 flex items-center justify-center cursor-pointer"
              >
                <div className="text-center">
                  <Play size={48} className="text-wine mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground font-medium">{t.coming}</p>
                </div>
              </motion.div>
              <p className="absolute bottom-4 left-4 right-4 text-xs text-muted-foreground italic">
                {module.videoPlaceholder}
              </p>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Zap size={16} className="text-wine" />
                {t.whatYouWillLearn}
              </h4>
              <ul className="space-y-2">
                {module.keyPoints.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Quiz */}
            <div className="bg-wine/5 border border-wine/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">{t.quiz}</h4>
              <div className="space-y-5">
                {module.quiz.map((q, qIdx) => {
                  const userAnswer = getQuizAnswer(module.id, qIdx);
                  const isCorrect = userAnswer === q.correct;
                  const answered = userAnswer !== undefined;

                  return (
                    <div key={qIdx} className="space-y-3">
                      <p className="text-sm font-medium text-foreground">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, oIdx) => (
                          <motion.button
                            key={oIdx}
                            whileHover={{ x: 4 }}
                            onClick={() => handleQuizAnswer(module.id, qIdx, oIdx)}
                            className={`w-full text-left p-3 rounded-lg border transition ${
                              userAnswer === oIdx
                                ? isCorrect
                                  ? "border-emerald-500/50 bg-emerald-500/10"
                                  : "border-red-500/50 bg-red-500/10"
                                : "border-border hover:border-wine/50 hover:bg-wine/5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                  userAnswer === oIdx
                                    ? isCorrect
                                      ? "bg-emerald-500 border-emerald-500"
                                      : "bg-red-500 border-red-500"
                                    : "border-border"
                                }`}
                              >
                                {userAnswer === oIdx && (
                                  <span className="text-white text-xs font-bold">
                                    {isCorrect ? "✓" : "✗"}
                                  </span>
                                )}
                              </div>
                              <span className="text-sm">{option}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                      {answered && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-xs p-2 rounded flex items-start gap-2 ${
                            isCorrect
                              ? "bg-emerald-500/10 text-emerald-700"
                              : "bg-red-500/10 text-red-700"
                          }`}
                        >
                          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                          <span>
                            {isCorrect
                              ? t.correct
                              : `${t.correctAnswer} ${q.options[q.correct]}`}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mark Complete */}
            {!isComplete && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => markModuleComplete(module.id)}
                className="w-full py-3 rounded-lg bg-wine text-white font-semibold hover:bg-wine/90 transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                {t.markComplete}
              </motion.button>
            )}
            {isComplete && (
              <div className="w-full py-3 rounded-lg bg-emerald-500/10 text-emerald-700 font-semibold flex items-center justify-center gap-2 border border-emerald-500/20">
                <CheckCircle size={16} />
                {t.moduleCompleted}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <SEOHead
        title={course.seo.title}
        description={course.seo.description}
      />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-wine/5 via-background to-background">
        {/* Breadcrumb + Back */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-4">
          <Link
            to="/decision-center/cursos"
            className="inline-flex items-center gap-2 text-wine hover:text-wine/80 transition text-sm"
          >
            <ArrowLeft size={16} />
            {t.backToCourses}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">{course.icon}</div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full bg-wine/10 border border-wine/20 text-wine text-xs font-semibold mb-3">
                  Nivel {course.level} de 4
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.subtitle}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Clock size={18} className="text-wine" />
                <div>
                  <p className="text-muted-foreground text-xs">{t.duration}</p>
                  <p className="font-semibold text-foreground">{course.estimatedHours}h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BookOpen size={18} className="text-wine" />
                <div>
                  <p className="text-muted-foreground text-xs">{t.courseModules}</p>
                  <p className="font-semibold text-foreground">{course.modules.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Award size={18} className="text-wine" />
                <div>
                  <p className="text-muted-foreground text-xs">{t.certificate}</p>
                  <p className="font-semibold text-foreground text-xs">{course.certificate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap size={18} className="text-wine" />
                <div>
                  <p className="text-muted-foreground text-xs">{t.progress}</p>
                  <p className="font-semibold text-foreground">{progress}%</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t.courseProgress}</span>
                <span className="font-semibold text-foreground">
                  {completedModules.length} {t.of} {course.modules.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-wine to-wine/70"
                />
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 text-muted-foreground">{course.description}</p>
          </motion.div>
        </section>

        {/* Modules */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{t.courseModules}</h2>
          <div className="space-y-3">
            {course.modules.map((module, idx) => {
              const isExpanded = expandedModule === module.id;
              const isComplete = completedModules.includes(module.id);

              return (
                <ScrollReveal key={module.id} delay={idx * 0.05}>
                  <motion.div
                    layout
                    className="border border-border rounded-lg bg-card hover:border-wine/50 transition overflow-hidden"
                  >
                    <motion.button
                      onClick={() => toggleModuleExpand(module.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition text-left"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {isComplete ? (
                            <CheckCircle size={20} className="text-emerald-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-border" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isComplete ? "text-muted-foreground" : "text-foreground"}`}>
                            {module.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {module.description}
                          </p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <AlertCircle size={12} />
                              {module.quiz.length} {t.questions}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`flex-shrink-0 text-muted-foreground transition ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </motion.button>

                    {isExpanded && renderModuleContent(module)}
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        {completedModules.length === course.modules.length && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24"
          >
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
              <Award size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t.congratulations}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t.completedMessage} "{course.title}". Descarga tu certificado y comparte tu logro con tu equipo.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
              >
                {t.downloadCertificate}
              </motion.button>
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </>
  );
}
