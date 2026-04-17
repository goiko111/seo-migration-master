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

const i18n = {
  es: {
    academyTitle: "Academia Winerim",
    passwordPrompt: "Accede al programa de formacion en vino para tu equipo.",
    passwordPlaceholder: "Contrasena",
    accessButton: "Acceder",
    wrongPassword: "Contrasena incorrecta",
    seoTitle: "Academia Winerim - Cursos de Vino para Equipos",
    seoDescription: "Programa de formacion completo en vino para camareros, jefes de sala y directores de F&B. Desde fundamentos hasta estrategia avanzada.",
    heroTitle: "Academia Winerim",
    heroSubtitle: "Programa de formacion completo en vino para tu equipo. De camarero sin experiencia a director de F&B.",
    levels: "4 niveles",
    totalHours: "14 horas totales",
    certificates: "Certificados",
    viewCourse: "Ver curso",
    aboutTitle: "Sobre Academia Winerim",
    designedForRestaurants: "Diseñado para restaurantes",
    designedText: "Cada curso esta diseñado especificamente para profesionales de la hosteleria. Los contenidos son practicos, aplicables en la mesa, y se basan en situaciones reales.",
    clearProgression: "Progresion clara",
    progressionText: "Desde camarero principiante hasta director de F&B. Cada nivel se basa en el anterior, creando un camino claro de aprendizaje.",
    recognizedCertificates: "Certificados reconocidos",
    certificatesText: "Al completar cada nivel, tu equipo recibe un certificado que verifica su competencia en vino.",
    videosQuizzes: "Videos + Quizzes",
    quizzesText: "Cada modulo combina videos explicativos con quizzes interactivos para asegurar comprension y retencion.",
    level: "Nivel",
    of4: "de 4",
    audience: "Audiencia:",
    duration: "Duracion:",
    hours: "horas",
    modules: "Modulos:",
    lessons: "lecciones",
    requirement: "Requisito:",
  },
  en: {
    academyTitle: "Winerim Academy",
    passwordPrompt: "Access the wine training program for your team.",
    passwordPlaceholder: "Password",
    accessButton: "Access",
    wrongPassword: "Incorrect password",
    seoTitle: "Winerim Academy - Wine Courses for Teams",
    seoDescription: "Complete wine training program for servers, head waiters and F&B directors. From fundamentals to advanced strategy.",
    heroTitle: "Winerim Academy",
    heroSubtitle: "Complete wine training program for your team. From inexperienced server to F&B director.",
    levels: "4 levels",
    totalHours: "14 total hours",
    certificates: "Certificates",
    viewCourse: "View Course",
    aboutTitle: "About Winerim Academy",
    designedForRestaurants: "Designed for Restaurants",
    designedText: "Each course is designed specifically for hospitality professionals. Content is practical, applicable at the table, and based on real situations.",
    clearProgression: "Clear Progression",
    progressionText: "From beginner server to F&B director. Each level builds on the previous one, creating a clear learning path.",
    recognizedCertificates: "Recognized Certificates",
    certificatesText: "Upon completing each level, your team receives a certificate that verifies their wine competency.",
    videosQuizzes: "Videos + Quizzes",
    quizzesText: "Each module combines explanatory videos with interactive quizzes to ensure understanding and retention.",
    level: "Level",
    of4: "of 4",
    audience: "Audience:",
    duration: "Duration:",
    hours: "hours",
    modules: "Modules:",
    lessons: "lessons",
    requirement: "Requirement:",
  },
  it: {
    academyTitle: "Accademia Winerim",
    passwordPrompt: "Accedi al programma di formazione sul vino per il tuo team.",
    passwordPlaceholder: "Password",
    accessButton: "Accedi",
    wrongPassword: "Password errata",
    seoTitle: "Accademia Winerim - Corsi di Vino per Team",
    seoDescription: "Programma di formazione completo sul vino per camerieri, capi sala e direttori F&B. Dai fondamenti alla strategia avanzata.",
    heroTitle: "Accademia Winerim",
    heroSubtitle: "Programma di formazione completo sul vino per il tuo team. Da cameriere inesperto a direttore F&B.",
    levels: "4 livelli",
    totalHours: "14 ore totali",
    certificates: "Certificati",
    viewCourse: "Visualizza Corso",
    aboutTitle: "Informazioni su Accademia Winerim",
    designedForRestaurants: "Progettato per Ristoranti",
    designedText: "Ogni corso e progettato specificamente per professionisti dell'ospitalita. I contenuti sono pratici, applicabili al tavolo e basati su situazioni reali.",
    clearProgression: "Progressione Chiara",
    progressionText: "Da cameriere principiante a direttore F&B. Ogni livello si basa sul precedente, creando un percorso di apprendimento trasparente.",
    recognizedCertificates: "Certificati Riconosciuti",
    certificatesText: "Dopo aver completato ogni livello, il tuo team riceve un certificato che verifica la sua competenza nel vino.",
    videosQuizzes: "Video + Quiz",
    quizzesText: "Ogni modulo combina video esplicativi con quiz interattivi per garantire la comprensione e la memorizzazione.",
    level: "Livello",
    of4: "di 4",
    audience: "Pubblico:",
    duration: "Durata:",
    hours: "ore",
    modules: "Moduli:",
    lessons: "lezioni",
    requirement: "Requisito:",
  },
  fr: {
    academyTitle: "Academie Winerim",
    passwordPrompt: "Accdez au programme de formation sur le vin pour votre equipe.",
    passwordPlaceholder: "Mot de passe",
    accessButton: "Acceder",
    wrongPassword: "Mot de passe incorrect",
    seoTitle: "Academie Winerim - Cours de Vin pour Equipes",
    seoDescription: "Programme de formation complet sur le vin pour serveurs, chefs de salle et directeurs F&B. Des fondamentaux a la strategie avancee.",
    heroTitle: "Academie Winerim",
    heroSubtitle: "Programme de formation complet sur le vin pour votre equipe. Du serveur inexpérimente au directeur F&B.",
    levels: "4 niveaux",
    totalHours: "14 heures au total",
    certificates: "Certificats",
    viewCourse: "Voir le Cours",
    aboutTitle: "A propos de l'Academie Winerim",
    designedForRestaurants: "Concu pour les Restaurants",
    designedText: "Chaque cours est concu specifiquement pour les professionnels de l'hospitalite. Le contenu est pratique, applicable a table et base sur des situations reelles.",
    clearProgression: "Progression Claire",
    progressionText: "Du serveur debutant au directeur F&B. Chaque niveau s'appuie sur le precedent, creant un parcours d'apprentissage clair.",
    recognizedCertificates: "Certificats Reconnus",
    certificatesText: "Une fois chaque niveau termine, votre equipe reçoit un certificat attestant de ses competences en matieres de vin.",
    videosQuizzes: "Videos + Quiz",
    quizzesText: "Chaque module combine des videos explicatives avec des quiz interactifs pour assurer la comprehension et la retention.",
    level: "Niveau",
    of4: "sur 4",
    audience: "Public:",
    duration: "Duree:",
    hours: "heures",
    modules: "Modules:",
    lessons: "leçons",
    requirement: "Prerequis:",
  },
  de: {
    academyTitle: "Winerim Akademie",
    passwordPrompt: "Greifen Sie auf das Weinschulungsprogramm fur Ihr Team zu.",
    passwordPlaceholder: "Passwort",
    accessButton: "Zugriff",
    wrongPassword: "Falsches Passwort",
    seoTitle: "Winerim Akademie - Weinkurse fur Teams",
    seoDescription: "Umfassendes Weinschulungsprogramm fur Kellner, Oberkellner und F&B-Direktoren. Von Grundlagen bis zu fortgeschrittener Strategie.",
    heroTitle: "Winerim Akademie",
    heroSubtitle: "Umfassendes Weinschulungsprogramm fur Ihr Team. Vom unerfahrenen Kellner zum F&B-Direktor.",
    levels: "4 Stufen",
    totalHours: "14 Stunden insgesamt",
    certificates: "Zertifikate",
    viewCourse: "Kurs anzeigen",
    aboutTitle: "Uber die Winerim Akademie",
    designedForRestaurants: "Fur Restaurants konzipiert",
    designedText: "Jeder Kurs ist speziell fur Hospitality-Profis konzipiert. Die Inhalte sind praktisch, am Tisch anwendbar und basieren auf realen Situationen.",
    clearProgression: "Klare Progression",
    progressionText: "Vom Anfanger-Kellner zum F&B-Direktor. Jede Stufe baut auf der vorherigen auf und schafft einen klaren Lernpfad.",
    recognizedCertificates: "Anerkannte Zertifikate",
    certificatesText: "Nach Abschluss jeder Stufe erhalten Ihre Mitarbeiter ein Zertifikat, das ihre Weinkompetenz bestatigt.",
    videosQuizzes: "Videos + Quiz",
    quizzesText: "Jedes Modul kombiniert erklarende Videos mit interaktiven Quiz, um Verstandnis und Merkfahigkeit zu gewahrleisten.",
    level: "Stufe",
    of4: "von 4",
    audience: "Zielgruppe:",
    duration: "Dauer:",
    hours: "Stunden",
    modules: "Module:",
    lessons: "Lektionen",
    requirement: "Voraussetzung:",
  },
  pt: {
    academyTitle: "Academia Winerim",
    passwordPrompt: "Acesse o programa de treinamento em vinho para sua equipe.",
    passwordPlaceholder: "Senha",
    accessButton: "Acessar",
    wrongPassword: "Senha incorreta",
    seoTitle: "Academia Winerim - Cursos de Vinho para Equipes",
    seoDescription: "Programa de treinamento completo em vinho para garcons, chefes de sala e diretores de F&B. Dos fundamentos a estrategia avancada.",
    heroTitle: "Academia Winerim",
    heroSubtitle: "Programa de treinamento completo em vinho para sua equipe. De garcom inexperiente a diretor de F&B.",
    levels: "4 niveis",
    totalHours: "14 horas totais",
    certificates: "Certificados",
    viewCourse: "Ver Curso",
    aboutTitle: "Sobre a Academia Winerim",
    designedForRestaurants: "Projetado para Restaurantes",
    designedText: "Cada curso e projetado especificamente para profissionais de hospitalidade. Os conteudos sao praticos, aplicaveis a mesa e baseados em situacoes reais.",
    clearProgression: "Progressao Clara",
    progressionText: "De garcom principiante a diretor de F&B. Cada nivel se baseia no anterior, criando um caminho claro de aprendizado.",
    recognizedCertificates: "Certificados Reconhecidos",
    certificatesText: "Apos completar cada nivel, sua equipe recebe um certificado que verifica sua competencia em vinho.",
    videosQuizzes: "Videos + Quizzes",
    quizzesText: "Cada modulo combina videos explicativos com quizzes interativos para garantir compreensao e retencao.",
    level: "Nivel",
    of4: "de 4",
    audience: "Publico:",
    duration: "Duracao:",
    hours: "horas",
    modules: "Modulos:",
    lessons: "licoes",
    requirement: "Requisito:",
  },
};

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

const PasswordGate = ({ onUnlock, t }: { onUnlock: (pwd: string) => boolean; t: (typeof i18n)["es"] }) => {
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
          <h1 className="text-2xl font-bold text-center mb-2">{t.academyTitle}</h1>
          <p className="text-muted-foreground text-center text-sm mb-6">
            {t.passwordPrompt}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-wine/50"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-wine text-white font-semibold hover:bg-wine/90 transition"
            >
              {t.accessButton}
            </button>
            {error && (
              <p className="text-red-500 text-xs text-center">{t.wrongPassword}</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default function CursosVino() {
  const { granted, unlock } = useGate();
  const { lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n];

  if (!granted) {
    return <PasswordGate onUnlock={unlock} t={t} />;
  }

  return (
    <>
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
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
              {t.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {t.heroSubtitle}
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-2">
                <BookOpen size={16} /> {t.levels}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {t.totalHours}
              </span>
              <span className="flex items-center gap-2">
                <Award size={16} /> {t.certificates}
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
                            {t.level} {level.level} {t.of4}
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
                          <span className="w-24 font-semibold">{t.audience}</span>
                          <span>{level.targetAudience}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="w-24 font-semibold">{t.duration}</span>
                          <span>{level.estimatedHours} {t.hours}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="w-24 font-semibold">{t.modules}</span>
                          <span>{level.modules.length} {t.lessons}</span>
                        </div>
                        <div className="flex items-start text-sm text-muted-foreground">
                          <span className="w-24 font-semibold flex-shrink-0">{t.requirement}</span>
                          <span>{level.prerequisites}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-lg bg-wine text-white font-semibold hover:bg-wine/90 transition flex items-center justify-center gap-2"
                      >
                        {t.viewCourse}
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
            <h2 className="text-2xl font-bold mb-6 text-foreground">{t.aboutTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-foreground">{t.designedForRestaurants}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t.designedText}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">{t.clearProgression}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t.progressionText}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">{t.recognizedCertificates}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t.certificatesText}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">{t.videosQuizzes}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t.quizzesText}
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
