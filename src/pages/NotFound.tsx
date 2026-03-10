import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, { label: string; title: string; desc: string; cta: string }> = {
  es: { label: "Error 404", title: "Página no encontrada", desc: "Lo sentimos, la página que buscas no existe o ha sido trasladada.", cta: "Volver al inicio" },
  en: { label: "Error 404", title: "Page not found", desc: "Sorry, the page you're looking for doesn't exist or has been moved.", cta: "Back to home" },
  it: { label: "Errore 404", title: "Pagina non trovata", desc: "Ci dispiace, la pagina che cerchi non esiste o è stata spostata.", cta: "Torna alla home" },
  fr: { label: "Erreur 404", title: "Page introuvable", desc: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.", cta: "Retour à l'accueil" },
};

const NotFound = () => {
  const location = useLocation();
  const { lang, localePath } = useLanguage();
  const t = content[lang] || content.es;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={`${t.title} | Winerim`} description={t.desc} noindex />
      <Navbar />
      <main className="flex items-center justify-center py-32 section-padding">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent font-semibold mb-4">{t.label}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">{t.title}</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">{t.desc}</p>
          <Link to={localePath("/")} className="inline-flex bg-gradient-wine text-primary-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
            {t.cta}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
