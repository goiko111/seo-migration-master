import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePageContent } from "@/hooks/usePageContent";

const Privacidad = () => {
  const { get } = usePageContent("legal");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title="Política de Privacidad" description="Política de privacidad de Winerim." url="https://winerim.wine/privacidad" />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
          {get("privacy", "title", "Política de Privacidad")}
        </h1>
        <div className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
          <h2>1. Responsable del tratamiento</h2>
          <p>{get("privacy", "responsible", "Winerim S.L. es responsable del tratamiento de los datos personales recogidos a través de este sitio web.")}</p>

          <h2>2. Datos recogidos</h2>
          <p>{get("privacy", "data_collected", "Recogemos los datos que nos proporcionas voluntariamente a través de nuestros formularios de contacto y demo: nombre, email, teléfono, restaurante, ciudad, cargo y mensaje.")}</p>

          <h2>3. Finalidad</h2>
          <p>{get("privacy", "purpose", "Los datos se utilizan exclusivamente para gestionar las solicitudes de información, demos y contacto comercial. No compartimos tus datos con terceros sin tu consentimiento.")}</p>

          <h2>4. Base legal</h2>
          <p>{get("privacy", "legal_basis", "El tratamiento se basa en el consentimiento del interesado al enviar el formulario y en el interés legítimo para la gestión de la relación comercial.")}</p>

          <h2>5. Derechos</h2>
          <p>{get("privacy", "rights", "Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición enviando un email a info@winerim.com.")}</p>

          <h2>6. Cookies</h2>
          <p>{get("privacy", "cookies", "Este sitio utiliza cookies propias y de terceros para mejorar la experiencia de navegación y realizar análisis de uso. Puedes aceptar o rechazar las cookies a través del banner que se muestra en tu primera visita.")}</p>

          <h2>7. Conservación</h2>
          <p>{get("privacy", "retention", "Los datos se conservarán mientras exista interés mutuo y durante los plazos legalmente establecidos.")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidad;
