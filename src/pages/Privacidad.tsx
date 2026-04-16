import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n } from "@/i18n/types";

const i18n: Record<string, {
  seoTitle: string; seoDesc: string; title: string;
  sections: { heading: string; key: string; fallback: string }[];
}> = {
  es: {
    seoTitle: "Política de Privacidad", seoDesc: "Política de privacidad de Winerim.", title: "Política de Privacidad",
    sections: [
      { heading: "1. Responsable del tratamiento", key: "responsible", fallback: "Winerim S.L. es responsable del tratamiento de los datos personales recogidos a través de este sitio web." },
      { heading: "2. Datos recogidos", key: "data_collected", fallback: "Recogemos los datos que nos proporcionas voluntariamente a través de nuestros formularios de contacto y demo." },
      { heading: "3. Finalidad", key: "purpose", fallback: "Los datos se utilizan exclusivamente para gestionar las solicitudes de información, demos y contacto comercial." },
      { heading: "4. Base legal", key: "legal_basis", fallback: "El tratamiento se basa en el consentimiento del interesado al enviar el formulario." },
      { heading: "5. Derechos", key: "rights", fallback: "Puedes ejercer tus derechos de acceso, rectificación, supresión enviando un email a info@winerim.com." },
      { heading: "6. Cookies", key: "cookies", fallback: "Este sitio utiliza cookies propias y de terceros para mejorar la experiencia de navegación." },
      { heading: "7. Conservación", key: "retention", fallback: "Los datos se conservarán mientras exista interés mutuo y durante los plazos legalmente establecidos." },
    ],
  },
  en: {
    seoTitle: "Privacy Policy", seoDesc: "Winerim privacy policy.", title: "Privacy Policy",
    sections: [
      { heading: "1. Data Controller", key: "responsible", fallback: "Winerim S.L. is the data controller for personal data collected through this website." },
      { heading: "2. Data Collected", key: "data_collected", fallback: "We collect data you voluntarily provide through our contact and demo forms." },
      { heading: "3. Purpose", key: "purpose", fallback: "Data is used exclusively to manage information requests, demos and commercial contact." },
      { heading: "4. Legal Basis", key: "legal_basis", fallback: "Processing is based on the data subject's consent when submitting the form." },
      { heading: "5. Rights", key: "rights", fallback: "You can exercise your rights of access, rectification, deletion by emailing info@winerim.com." },
      { heading: "6. Cookies", key: "cookies", fallback: "This site uses first and third-party cookies to improve the browsing experience." },
      { heading: "7. Retention", key: "retention", fallback: "Data will be retained as long as there is mutual interest and for legally established periods." },
    ],
  },
  it: {
    seoTitle: "Informativa sulla Privacy", seoDesc: "Informativa sulla privacy di Winerim.", title: "Informativa sulla Privacy",
    sections: [
      { heading: "1. Titolare del trattamento", key: "responsible", fallback: "Winerim S.L. è il titolare del trattamento dei dati personali raccolti attraverso questo sito web." },
      { heading: "2. Dati raccolti", key: "data_collected", fallback: "Raccogliamo i dati che ci fornisci volontariamente attraverso i nostri moduli di contatto e demo." },
      { heading: "3. Finalità", key: "purpose", fallback: "I dati vengono utilizzati esclusivamente per gestire le richieste di informazioni, demo e contatti commerciali." },
      { heading: "4. Base giuridica", key: "legal_basis", fallback: "Il trattamento si basa sul consenso dell'interessato al momento dell'invio del modulo." },
      { heading: "5. Diritti", key: "rights", fallback: "Puoi esercitare i tuoi diritti di accesso, rettifica, cancellazione inviando un'email a info@winerim.com." },
      { heading: "6. Cookie", key: "cookies", fallback: "Questo sito utilizza cookie propri e di terze parti per migliorare l'esperienza di navigazione." },
      { heading: "7. Conservazione", key: "retention", fallback: "I dati saranno conservati finché esiste un interesse reciproco e per i periodi legalmente stabiliti." },
    ],
  },
  fr: {
    seoTitle: "Politique de Confidentialité", seoDesc: "Politique de confidentialité de Winerim.", title: "Politique de Confidentialité",
    sections: [
      { heading: "1. Responsable du traitement", key: "responsible", fallback: "Winerim S.L. est responsable du traitement des données personnelles collectées via ce site web." },
      { heading: "2. Données collectées", key: "data_collected", fallback: "Nous collectons les données que vous nous fournissez volontairement via nos formulaires de contact et de démo." },
      { heading: "3. Finalité", key: "purpose", fallback: "Les données sont utilisées exclusivement pour gérer les demandes d'information, démos et contacts commerciaux." },
      { heading: "4. Base légale", key: "legal_basis", fallback: "Le traitement est basé sur le consentement de la personne concernée lors de la soumission du formulaire." },
      { heading: "5. Droits", key: "rights", fallback: "Vous pouvez exercer vos droits d'accès, rectification, suppression en envoyant un email à info@winerim.com." },
      { heading: "6. Cookies", key: "cookies", fallback: "Ce site utilise des cookies propres et tiers pour améliorer l'expérience de navigation." },
      { heading: "7. Conservation", key: "retention", fallback: "Les données seront conservées tant qu'il existe un intérêt mutuel et pendant les délais légalement établis." },
    ],
  },
  de: {
    seoTitle: "Datenschutzrichtlinie", seoDesc: "Datenschutzrichtlinie von Winerim.", title: "Datenschutzrichtlinie",
    sections: [
      { heading: "1. Verantwortlicher", key: "responsible", fallback: "Winerim S.L. ist verantwortlich für die Verarbeitung der über diese Website erhobenen personenbezogenen Daten." },
      { heading: "2. Erhobene Daten", key: "data_collected", fallback: "Wir erheben Daten, die Sie uns freiwillig über unsere Kontakt- und Demo-Formulare zur Verfügung stellen." },
      { heading: "3. Zweck", key: "purpose", fallback: "Die Daten werden ausschließlich zur Bearbeitung von Informationsanfragen, Demos und geschäftlichen Kontakten verwendet." },
      { heading: "4. Rechtsgrundlage", key: "legal_basis", fallback: "Die Verarbeitung basiert auf der Einwilligung der betroffenen Person bei Absendung des Formulars." },
      { heading: "5. Rechte", key: "rights", fallback: "Sie können Ihre Rechte auf Auskunft, Berichtigung und Löschung per E-Mail an info@winerim.com ausüben." },
      { heading: "6. Cookies", key: "cookies", fallback: "Diese Website verwendet eigene und Drittanbieter-Cookies zur Verbesserung des Nutzererlebnisses." },
      { heading: "7. Speicherdauer", key: "retention", fallback: "Die Daten werden aufbewahrt, solange ein beiderseitiges Interesse besteht, sowie für die gesetzlich vorgeschriebenen Fristen." },
    ],
  },
  pt: {
    seoTitle: "Política de Privacidade", seoDesc: "Política de privacidade da Winerim.", title: "Política de Privacidade",
    sections: [
      { heading: "1. Responsável pelo tratamento", key: "responsible", fallback: "A Winerim S.L. é responsável pelo tratamento dos dados pessoais recolhidos através deste website." },
      { heading: "2. Dados recolhidos", key: "data_collected", fallback: "Recolhemos os dados que nos fornece voluntariamente através dos nossos formulários de contacto e demo." },
      { heading: "3. Finalidade", key: "purpose", fallback: "Os dados são utilizados exclusivamente para gerir pedidos de informação, demos e contacto comercial." },
      { heading: "4. Base legal", key: "legal_basis", fallback: "O tratamento baseia-se no consentimento do titular dos dados ao enviar o formulário." },
      { heading: "5. Direitos", key: "rights", fallback: "Pode exercer os seus direitos de acesso, retificação e eliminação enviando um e-mail para info@winerim.com." },
      { heading: "6. Cookies", key: "cookies", fallback: "Este website utiliza cookies próprios e de terceiros para melhorar a experiência de navegação." },
      { heading: "7. Conservação", key: "retention", fallback: "Os dados serão conservados enquanto existir interesse mútuo e durante os prazos legalmente estabelecidos." },
    ],
  },
};

const Privacidad = () => {
  const { get } = usePageContent("legal");
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/privacidad")}`} hreflang={allLangPaths("/privacidad")} />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">{t.title}</h1>
        <div className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
          {t.sections.map((s) => (
            <div key={s.key}>
              <h2>{s.heading}</h2>
              <p>{get("privacy", s.key, s.fallback)}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidad;
