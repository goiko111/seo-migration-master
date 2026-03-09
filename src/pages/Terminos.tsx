import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/i18n/LanguageContext";

const i18n: Record<string, {
  seoTitle: string; seoDesc: string; title: string;
  sections: { heading: string; key: string; fallback: string }[];
}> = {
  es: {
    seoTitle: "Términos de Uso", seoDesc: "Términos y condiciones de uso de Winerim.", title: "Términos de Uso",
    sections: [
      { heading: "1. Titularidad", key: "ownership", fallback: "Este sitio web es propiedad de Winerim S.L. El acceso y uso del sitio implica la aceptación de estos términos." },
      { heading: "2. Uso del servicio", key: "usage", fallback: "El usuario se compromete a utilizar el sitio web y sus servicios de forma lícita." },
      { heading: "3. Propiedad intelectual", key: "ip", fallback: "Todos los contenidos del sitio son propiedad de Winerim o de sus licenciantes." },
      { heading: "4. Limitación de responsabilidad", key: "liability", fallback: "Winerim no se responsabiliza de los daños que puedan derivarse del uso de este sitio web." },
      { heading: "5. Modificaciones", key: "modifications", fallback: "Winerim se reserva el derecho de modificar estos términos en cualquier momento." },
      { heading: "6. Legislación aplicable", key: "jurisdiction", fallback: "Estos términos se rigen por la legislación española." },
    ],
  },
  en: {
    seoTitle: "Terms of Use", seoDesc: "Terms and conditions of use for Winerim.", title: "Terms of Use",
    sections: [
      { heading: "1. Ownership", key: "ownership", fallback: "This website is owned by Winerim S.L. Access and use of the site implies acceptance of these terms." },
      { heading: "2. Use of Service", key: "usage", fallback: "The user agrees to use the website and its services lawfully." },
      { heading: "3. Intellectual Property", key: "ip", fallback: "All content on the site is the property of Winerim or its licensors." },
      { heading: "4. Limitation of Liability", key: "liability", fallback: "Winerim is not responsible for damages that may arise from the use of this website." },
      { heading: "5. Modifications", key: "modifications", fallback: "Winerim reserves the right to modify these terms at any time." },
      { heading: "6. Applicable Law", key: "jurisdiction", fallback: "These terms are governed by Spanish law." },
    ],
  },
  it: {
    seoTitle: "Termini di Utilizzo", seoDesc: "Termini e condizioni d'uso di Winerim.", title: "Termini di Utilizzo",
    sections: [
      { heading: "1. Titolarità", key: "ownership", fallback: "Questo sito web è di proprietà di Winerim S.L. L'accesso e l'utilizzo del sito implica l'accettazione di questi termini." },
      { heading: "2. Utilizzo del servizio", key: "usage", fallback: "L'utente si impegna a utilizzare il sito web e i suoi servizi in modo lecito." },
      { heading: "3. Proprietà intellettuale", key: "ip", fallback: "Tutti i contenuti del sito sono di proprietà di Winerim o dei suoi licenzianti." },
      { heading: "4. Limitazione di responsabilità", key: "liability", fallback: "Winerim non è responsabile dei danni che possano derivare dall'uso di questo sito web." },
      { heading: "5. Modifiche", key: "modifications", fallback: "Winerim si riserva il diritto di modificare questi termini in qualsiasi momento." },
      { heading: "6. Legge applicabile", key: "jurisdiction", fallback: "Questi termini sono regolati dalla legge spagnola." },
    ],
  },
  fr: {
    seoTitle: "Conditions d'Utilisation", seoDesc: "Conditions générales d'utilisation de Winerim.", title: "Conditions d'Utilisation",
    sections: [
      { heading: "1. Propriété", key: "ownership", fallback: "Ce site web est la propriété de Winerim S.L. L'accès et l'utilisation du site impliquent l'acceptation de ces conditions." },
      { heading: "2. Utilisation du service", key: "usage", fallback: "L'utilisateur s'engage à utiliser le site web et ses services de manière licite." },
      { heading: "3. Propriété intellectuelle", key: "ip", fallback: "Tout le contenu du site est la propriété de Winerim ou de ses concédants." },
      { heading: "4. Limitation de responsabilité", key: "liability", fallback: "Winerim n'est pas responsable des dommages pouvant résulter de l'utilisation de ce site web." },
      { heading: "5. Modifications", key: "modifications", fallback: "Winerim se réserve le droit de modifier ces conditions à tout moment." },
      { heading: "6. Droit applicable", key: "jurisdiction", fallback: "Ces conditions sont régies par le droit espagnol." },
    ],
  },
};

const Terminos = () => {
  const { get } = usePageContent("legal");
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/terminos")}`} hreflang={allLangPaths("/terminos")} />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">{t.title}</h1>
        <div className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
          {t.sections.map((s) => (
            <div key={s.key}>
              <h2>{s.heading}</h2>
              <p>{get("terms", s.key, s.fallback)}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terminos;
