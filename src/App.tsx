import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";

// Eager load home for fast first paint
import Index from "./pages/Index";

// Lazy load other routes
const Blog = lazy(() => import("./pages/Blog"));
const SommelierCorner = lazy(() => import("./pages/SommelierCorner"));
const Afiliate = lazy(() => import("./pages/Afiliate"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Demo = lazy(() => import("./pages/Demo"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Terminos = lazy(() => import("./pages/Terminos"));
const VenderMasVino = lazy(() => import("./pages/VenderMasVino"));
const AnalizaCarta = lazy(() => import("./pages/AnalizaCarta"));
const SoftwareCartaVinos = lazy(() => import("./pages/SoftwareCartaVinos"));
const IARestaurantes = lazy(() => import("./pages/IARestaurantes"));
const PrecioVinoRestaurante = lazy(() => import("./pages/PrecioVinoRestaurante"));
const WineListSoftware = lazy(() => import("./pages/WineListSoftware"));
const VinoPorCopa = lazy(() => import("./pages/VinoPorCopa"));
const QueEsWinerim = lazy(() => import("./pages/QueEsWinerim"));
const CalculadoraMargen = lazy(() => import("./pages/CalculadoraMargen"));
const CalculadoraPrecioCopa = lazy(() => import("./pages/CalculadoraPrecioCopa"));
const BibliotecaVino = lazy(() => import("./pages/BibliotecaVino"));
const BibliotecaDetalle = lazy(() => import("./pages/BibliotecaDetalle"));
const CasosExito = lazy(() => import("./pages/CasosExito"));
const EjemplosCarta = lazy(() => import("./pages/EjemplosCarta"));
const CartaPapelVsDigital = lazy(() => import("./pages/CartaPapelVsDigital"));
const WineListAnalyzer = lazy(() => import("./pages/WineListAnalyzer"));
const WineROICalculator = lazy(() => import("./pages/WineROICalculator"));
const WinePairingGenerator = lazy(() => import("./pages/WinePairingGenerator"));
const WinePricingTool = lazy(() => import("./pages/WinePricingTool"));
const WineListBenchmark = lazy(() => import("./pages/WineListBenchmark"));
const Precios = lazy(() => import("./pages/Precios"));
const Integraciones = lazy(() => import("./pages/Integraciones"));
const GruposRestauracion = lazy(() => import("./pages/GruposRestauracion"));
const AumentarTicketMedio = lazy(() => import("./pages/AumentarTicketMedio"));
const DigitalWineList = lazy(() => import("./pages/DigitalWineList"));
const ComoOrganizarCarta = lazy(() => import("./pages/ComoOrganizarCarta"));
const CuantosVinosCarta = lazy(() => import("./pages/CuantosVinosCarta"));
const CartaVinosRentable = lazy(() => import("./pages/CartaVinosRentable"));
const GuiasRecursos = lazy(() => import("./pages/GuiasRecursos"));
const PlantillaCartaVinos = lazy(() => import("./pages/PlantillaCartaVinos"));
const ChecklistCartaRentable = lazy(() => import("./pages/ChecklistCartaRentable"));
const GuiaVinoPorCopa = lazy(() => import("./pages/GuiaVinoPorCopa"));
const WhatIsWinerim = lazy(() => import("./pages/WhatIsWinerim"));
const AiWineSoftware = lazy(() => import("./pages/AiWineSoftware"));
const ComoHacerCartaVinos = lazy(() => import("./pages/ComoHacerCartaVinos"));
const CartaNoVende = lazy(() => import("./pages/CartaNoVende"));
const RotacionVinos = lazy(() => import("./pages/RotacionVinos"));
const SeoPage = lazy(() => import("./pages/SeoPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-wine border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/sommelier-corner" element={<SommelierCorner />} />
              <Route path="/afiliate" element={<Afiliate />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/como-vender-mas-vino-en-un-restaurante" element={<VenderMasVino />} />
              <Route path="/analisis-carta" element={<AnalizaCarta />} />
              <Route path="/software-carta-de-vinos" element={<SoftwareCartaVinos />} />
              <Route path="/inteligencia-artificial-restaurantes" element={<IARestaurantes />} />
              <Route path="/precio-vino-restaurante" element={<PrecioVinoRestaurante />} />
              <Route path="/wine-list-management-software" element={<WineListSoftware />} />
              <Route path="/vino-por-copa-restaurante" element={<VinoPorCopa />} />
              <Route path="/que-es-winerim" element={<QueEsWinerim />} />
              <Route path="/calculadora-margen-vino" element={<CalculadoraMargen />} />
              <Route path="/herramientas/calculadora-precio-vino-por-copa" element={<CalculadoraPrecioCopa />} />
              <Route path="/biblioteca-vino" element={<BibliotecaVino />} />
              <Route path="/biblioteca-vino/:slug" element={<BibliotecaDetalle />} />
              <Route path="/casos-exito" element={<CasosExito />} />
              <Route path="/ejemplos-carta-vinos" element={<EjemplosCarta />} />
              <Route path="/carta-papel-vs-digital" element={<CartaPapelVsDigital />} />
              <Route path="/wine-list-analyzer" element={<WineListAnalyzer />} />
              <Route path="/wine-roi-calculator" element={<WineROICalculator />} />
              <Route path="/wine-pairing-generator" element={<WinePairingGenerator />} />
              <Route path="/wine-pricing-tool" element={<WinePricingTool />} />
              <Route path="/wine-list-benchmark" element={<WineListBenchmark />} />
              <Route path="/precios" element={<Precios />} />
              <Route path="/integraciones" element={<Integraciones />} />
              <Route path="/soluciones/grupos-restauracion" element={<GruposRestauracion />} />
              <Route path="/soluciones/aumentar-ticket-medio-restaurante" element={<AumentarTicketMedio />} />
              <Route path="/en/digital-wine-list" element={<DigitalWineList />} />
              <Route path="/blog/como-organizar-carta-de-vinos" element={<ComoOrganizarCarta />} />
              <Route path="/blog/cuantos-vinos-carta-restaurante" element={<CuantosVinosCarta />} />
              <Route path="/blog/como-disenar-carta-vinos-rentable" element={<CartaVinosRentable />} />
              <Route path="/guias-y-recursos" element={<GuiasRecursos />} />
              <Route path="/recursos/plantilla-carta-de-vinos" element={<PlantillaCartaVinos />} />
              <Route path="/recursos/checklist-carta-de-vinos-rentable" element={<ChecklistCartaRentable />} />
              <Route path="/recursos/guia-vino-por-copa-para-restaurantes" element={<GuiaVinoPorCopa />} />
              <Route path="/what-is-winerim" element={<WhatIsWinerim />} />
              <Route path="/ai-wine-software" element={<AiWineSoftware />} />
              <Route path="/como-hacer-una-carta-de-vinos" element={<ComoHacerCartaVinos />} />
              <Route path="/problemas/carta-de-vinos-no-vende" element={<CartaNoVende />} />
              <Route path="/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" element={<RotacionVinos />} />
              {/* Dynamic programmatic SEO pages - must be before NotFound */}
              <Route path="/software-carta-de-vinos-*" element={<SeoPage />} />
              <Route path="/software-vino-*" element={<SeoPage />} />
              <Route path="/wine-list-software-*" element={<SeoPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
          <BackToTop />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
