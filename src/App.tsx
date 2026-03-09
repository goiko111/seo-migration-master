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
const BibliotecaVino = lazy(() => import("./pages/BibliotecaVino"));
const BibliotecaDetalle = lazy(() => import("./pages/BibliotecaDetalle"));
const CasosExito = lazy(() => import("./pages/CasosExito"));
const EjemplosCarta = lazy(() => import("./pages/EjemplosCarta"));
const CartaPapelVsDigital = lazy(() => import("./pages/CartaPapelVsDigital"));
const WineListAnalyzer = lazy(() => import("./pages/WineListAnalyzer"));
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
              <Route path="/biblioteca-vino" element={<BibliotecaVino />} />
              <Route path="/biblioteca-vino/:slug" element={<BibliotecaDetalle />} />
              <Route path="/casos-exito" element={<CasosExito />} />
              <Route path="/ejemplos-carta-vinos" element={<EjemplosCarta />} />
              <Route path="/carta-papel-vs-digital" element={<CartaPapelVsDigital />} />
              <Route path="/wine-list-analyzer" element={<WineListAnalyzer />} />
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
