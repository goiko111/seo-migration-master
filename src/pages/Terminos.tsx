import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePageContent } from "@/hooks/usePageContent";

const Terminos = () => {
  const { get } = usePageContent("legal");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title="Términos de Uso" description="Términos y condiciones de uso de Winerim." url="https://winerim.wine/terminos" />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
          {get("terms", "title", "Términos de Uso")}
        </h1>
        <div className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
          <h2>1. Titularidad</h2>
          <p>{get("terms", "ownership", "Este sitio web es propiedad de Winerim S.L. El acceso y uso del sitio implica la aceptación de estos términos.")}</p>

          <h2>2. Uso del servicio</h2>
          <p>{get("terms", "usage", "El usuario se compromete a utilizar el sitio web y sus servicios de forma lícita, sin contravenir la legislación vigente ni lesionar los derechos de terceros.")}</p>

          <h2>3. Propiedad intelectual</h2>
          <p>{get("terms", "ip", "Todos los contenidos del sitio (textos, imágenes, diseño, logotipos, código) son propiedad de Winerim o de sus licenciantes y están protegidos por las leyes de propiedad intelectual.")}</p>

          <h2>4. Limitación de responsabilidad</h2>
          <p>{get("terms", "liability", "Winerim no se responsabiliza de los daños que puedan derivarse del uso de este sitio web ni de la información contenida en él.")}</p>

          <h2>5. Modificaciones</h2>
          <p>{get("terms", "modifications", "Winerim se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en el sitio web.")}</p>

          <h2>6. Legislación aplicable</h2>
          <p>{get("terms", "jurisdiction", "Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de la ciudad de Barcelona.")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terminos;
