import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

// Eager load home for fast first paint
import Index from "./pages/Index";

// Lazy load overlay components — not needed for FCP
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const BackToTop = lazy(() => import("./components/BackToTop"));

// Lazy load other routes
const Blog = lazy(() => import("./pages/Blog"));
const SommelierCorner = lazy(() => import("./pages/SommelierCorner"));
const Afiliate = lazy(() => import("./pages/Afiliate"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Demo = lazy(() => import("./pages/Demo"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
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
const Hoteles = lazy(() => import("./pages/Hoteles"));
const RestauranteSinSumiller = lazy(() => import("./pages/RestauranteSinSumiller"));
const RestaurantesGastronomicos = lazy(() => import("./pages/RestaurantesGastronomicos"));
const WineBars = lazy(() => import("./pages/WineBars"));
const CartaAmplia = lazy(() => import("./pages/CartaAmplia"));
const Implantacion = lazy(() => import("./pages/Implantacion"));
const AumentarTicketMedio = lazy(() => import("./pages/AumentarTicketMedio"));
const DigitalWineList = lazy(() => import("./pages/DigitalWineList"));
const ComoOrganizarCarta = lazy(() => import("./pages/ComoOrganizarCarta"));
const CuantosVinosCarta = lazy(() => import("./pages/CuantosVinosCarta"));
const CartaVinosRentable = lazy(() => import("./pages/CartaVinosRentable"));
const GuiasRecursos = lazy(() => import("./pages/GuiasRecursos"));
const Recursos = lazy(() => import("./pages/Recursos"));
const WhatIsWinerim = lazy(() => import("./pages/WhatIsWinerim"));
const AiWineSoftware = lazy(() => import("./pages/AiWineSoftware"));
const ComoHacerCartaVinos = lazy(() => import("./pages/ComoHacerCartaVinos"));
const CartaNoVende = lazy(() => import("./pages/CartaNoVende"));
const RotacionVinos = lazy(() => import("./pages/RotacionVinos"));
const EstrategiaMaridaje = lazy(() => import("./pages/EstrategiaMaridaje"));
const GuiaCartaGrupoRestauracion = lazy(() => import("./pages/GuiaCartaGrupoRestauracion"));
const GuiaEstrategiaVinoPorCopa = lazy(() => import("./pages/GuiaEstrategiaVinoPorCopa"));
const GuiaDetectarVinosMuertos = lazy(() => import("./pages/GuiaDetectarVinosMuertos"));
const GuiaFormarEquipoSala = lazy(() => import("./pages/GuiaFormarEquipoSala"));
const GuiaUsarDatosCompra = lazy(() => import("./pages/GuiaUsarDatosCompra"));
const GuiaConectarCartaStockVentasMargen = lazy(() => import("./pages/GuiaConectarCartaStockVentasMargen"));
const GuiaGestionarCartaGrupos = lazy(() => import("./pages/GuiaGestionarCartaGrupos"));
const GuiaVinoPorCopaSinPerderMargen = lazy(() => import("./pages/GuiaVinoPorCopaSinPerderMargen"));
const GuiaWinerimSinSumiller = lazy(() => import("./pages/GuiaWinerimSinSumiller"));
const GuiaSurtidoTicketMedio = lazy(() => import("./pages/GuiaSurtidoTicketMedio"));
const GuiaCanibalizacionVinos = lazy(() => import("./pages/GuiaCanibalizacionVinos"));
const GuiaRevisarCartaCadaMes = lazy(() => import("./pages/GuiaRevisarCartaCadaMes"));
const Herramientas = lazy(() => import("./pages/Herramientas"));
const DiagnosticoVinoPorCopa = lazy(() => import("./pages/DiagnosticoVinoPorCopa"));
const WineListScore = lazy(() => import("./pages/WineListScore"));
const CalculadoraStockMuerto = lazy(() => import("./pages/CalculadoraStockMuerto"));
const CalculadoraTicketMedio = lazy(() => import("./pages/CalculadoraTicketMedio"));
const AuditorMultiLocal = lazy(() => import("./pages/AuditorMultiLocal"));
const CalculadoraCompraInteligente = lazy(() => import("./pages/CalculadoraCompraInteligente"));
const Soluciones = lazy(() => import("./pages/Soluciones"));
const Problemas = lazy(() => import("./pages/Problemas"));
const Clientes = lazy(() => import("./pages/Clientes"));
const Funcionalidades = lazy(() => import("./pages/Funcionalidades"));
const InteligenciaDinamica = lazy(() => import("./pages/InteligenciaDinamica"));
const WinerimCore = lazy(() => import("./pages/WinerimCore"));
const WinerimSupply = lazy(() => import("./pages/WinerimSupply"));
const BenchmarksPlaybooks = lazy(() => import("./pages/BenchmarksPlaybooks"));
const BenchmarkPlaybookDetail = lazy(() => import("./pages/BenchmarkPlaybookDetail"));
const ResourcePage = lazy(() => import("./pages/ResourcePage"));
const SeoPage = lazy(() => import("./pages/SeoPage"));
const SobreWinerim = lazy(() => import("./pages/SobreWinerim"));
const Comparativas = lazy(() => import("./pages/Comparativas"));
const ComparativaDetalle = lazy(() => import("./pages/ComparativaDetalle"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin routes — fully isolated chunk (AuthProvider only loads here)
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminShell = lazy(() => import("./components/admin/AdminShell"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-wine border-t-transparent rounded-full animate-spin" />
  </div>
);

// Spanish routes (also used for shared routes)
const esRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/sommelier-corner" element={<SommelierCorner />} />
    <Route path="/afiliate" element={<Afiliate />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/article/:slug" element={<ArticlePage />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminShell />} />
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
    <Route path="/sobre-winerim" element={<SobreWinerim />} />
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
    <Route path="/soluciones/hoteles" element={<Hoteles />} />
    <Route path="/soluciones/restaurantes-sin-sumiller" element={<RestauranteSinSumiller />} />
    <Route path="/soluciones/restaurantes-gastronomicos" element={<RestaurantesGastronomicos />} />
    <Route path="/soluciones/wine-bars" element={<WineBars />} />
    <Route path="/soluciones/carta-amplia" element={<CartaAmplia />} />
    <Route path="/soluciones/aumentar-ticket-medio-restaurante" element={<AumentarTicketMedio />} />
    <Route path="/implantacion" element={<Implantacion />} />
    <Route path="/en/digital-wine-list" element={<DigitalWineList />} />
    <Route path="/blog/como-organizar-carta-de-vinos" element={<ComoOrganizarCarta />} />
    <Route path="/blog/cuantos-vinos-carta-restaurante" element={<CuantosVinosCarta />} />
    <Route path="/blog/como-disenar-carta-vinos-rentable" element={<CartaVinosRentable />} />
    <Route path="/guias-y-recursos" element={<GuiasRecursos />} />
    <Route path="/recursos/:slug" element={<ResourcePage />} />
    <Route path="/what-is-winerim" element={<WhatIsWinerim />} />
    <Route path="/ai-wine-software" element={<AiWineSoftware />} />
    <Route path="/como-hacer-una-carta-de-vinos" element={<ComoHacerCartaVinos />} />
    <Route path="/problemas/carta-de-vinos-no-vende" element={<CartaNoVende />} />
    <Route path="/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" element={<RotacionVinos />} />
    <Route path="/guias/como-crear-una-estrategia-de-maridaje-en-restauracion" element={<EstrategiaMaridaje />} />
    <Route path="/guias/como-estructurar-carta-vinos-grupo-restauracion" element={<GuiaCartaGrupoRestauracion />} />
    <Route path="/guias/como-fijar-estrategia-rentable-vino-por-copa" element={<GuiaEstrategiaVinoPorCopa />} />
    <Route path="/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" element={<GuiaDetectarVinosMuertos />} />
    <Route path="/guias/como-formar-equipo-sala-para-vender-vino" element={<GuiaFormarEquipoSala />} />
    <Route path="/guias/como-usar-datos-para-decidir-que-vinos-comprar" element={<GuiaUsarDatosCompra />} />
    <Route path="/guias/como-conectar-carta-stock-ventas-margen" element={<GuiaConectarCartaStockVentasMargen />} />
    <Route path="/guias/como-gestionar-carta-vinos-grupos-restauracion" element={<GuiaGestionarCartaGrupos />} />
    <Route path="/guias/como-implantar-vino-por-copa-sin-perder-margen" element={<GuiaVinoPorCopaSinPerderMargen />} />
    <Route path="/guias/como-usar-winerim-sin-sumiller" element={<GuiaWinerimSinSumiller />} />
    <Route path="/guias/como-decidir-surtido-segun-ticket-medio-tipo-local" element={<GuiaSurtidoTicketMedio />} />
    <Route path="/guias/como-detectar-canibalizacion-vinos-carta" element={<GuiaCanibalizacionVinos />} />
    <Route path="/guias/como-revisar-carta-vinos-cada-mes" element={<GuiaRevisarCartaCadaMes />} />
    <Route path="/herramientas" element={<Herramientas />} />
    <Route path="/herramientas/diagnostico-vino-por-copa" element={<DiagnosticoVinoPorCopa />} />
    <Route path="/herramientas/wine-list-score" element={<WineListScore />} />
    <Route path="/herramientas/calculadora-stock-muerto" element={<CalculadoraStockMuerto />} />
    <Route path="/herramientas/calculadora-ticket-medio-vino" element={<CalculadoraTicketMedio />} />
    <Route path="/herramientas/auditor-carta-multilocal" element={<AuditorMultiLocal />} />
    <Route path="/herramientas/calculadora-compra-inteligente" element={<CalculadoraCompraInteligente />} />
    <Route path="/soluciones" element={<Soluciones />} />
    <Route path="/problemas" element={<Problemas />} />
    <Route path="/clientes" element={<Clientes />} />
    <Route path="/funcionalidades" element={<Funcionalidades />} />
    <Route path="/producto/inteligencia-dinamica" element={<InteligenciaDinamica />} />
    <Route path="/producto/winerim-core" element={<WinerimCore />} />
    <Route path="/producto/winerim-supply" element={<WinerimSupply />} />
    <Route path="/benchmarks-playbooks" element={<BenchmarksPlaybooks />} />
    <Route path="/benchmarks-playbooks/:slug" element={<BenchmarkPlaybookDetail />} />
    <Route path="/comparativas" element={<Comparativas />} />
    <Route path="/comparativa/:slug" element={<ComparativaDetalle />} />
    {/* Dynamic programmatic SEO pages */}
    <Route path="/software-carta-de-vinos-*" element={<SeoPage />} />
    <Route path="/software-vino-*" element={<SeoPage />} />
    <Route path="/wine-list-software-*" element={<SeoPage />} />
  </>
);

// Language routes — reuse same components (they read lang from URL via LanguageProvider)
const langRoutes = (prefix: string) => (
  <>
    <Route path={`${prefix}`} element={<Index />} />
    <Route path={`${prefix}/blog`} element={<Blog />} />
    <Route path={`${prefix}/demo`} element={<Demo />} />
    <Route path={`${prefix}/contact`} element={<Contacto />} />
    <Route path={`${prefix}/contatto`} element={<Contacto />} />
    <Route path={`${prefix}/pricing`} element={<Precios />} />
    <Route path={`${prefix}/prezzi`} element={<Precios />} />
    <Route path={`${prefix}/tarifs`} element={<Precios />} />
    <Route path={`${prefix}/features`} element={<Funcionalidades />} />
    <Route path={`${prefix}/funzionalita`} element={<Funcionalidades />} />
    <Route path={`${prefix}/fonctionnalites`} element={<Funcionalidades />} />
    <Route path={`${prefix}/clients`} element={<Clientes />} />
    <Route path={`${prefix}/clienti`} element={<Clientes />} />
    <Route path={`${prefix}/integrations`} element={<Integraciones />} />
    <Route path={`${prefix}/integrazioni`} element={<Integraciones />} />
    <Route path={`${prefix}/case-studies`} element={<CasosExito />} />
    <Route path={`${prefix}/casi-di-successo`} element={<CasosExito />} />
    <Route path={`${prefix}/cas-clients`} element={<CasosExito />} />
    <Route path={`${prefix}/tools`} element={<Herramientas />} />
    <Route path={`${prefix}/strumenti`} element={<Herramientas />} />
    <Route path={`${prefix}/outils`} element={<Herramientas />} />
    <Route path={`${prefix}/guides`} element={<GuiasRecursos />} />
    <Route path={`${prefix}/guide`} element={<GuiasRecursos />} />
    <Route path={`${prefix}/solutions`} element={<Soluciones />} />
    <Route path={`${prefix}/soluzioni`} element={<Soluciones />} />
    <Route path={`${prefix}/challenges`} element={<Problemas />} />
    <Route path={`${prefix}/sfide`} element={<Problemas />} />
    <Route path={`${prefix}/defis`} element={<Problemas />} />
    <Route path={`${prefix}/sommelier-corner`} element={<SommelierCorner />} />
    <Route path={`${prefix}/affiliate`} element={<Afiliate />} />
    <Route path={`${prefix}/affiliati`} element={<Afiliate />} />
    <Route path={`${prefix}/affilies`} element={<Afiliate />} />
    <Route path={`${prefix}/wine-list-management-software`} element={<WineListSoftware />} />
    <Route path={`${prefix}/software-carta-vini`} element={<SoftwareCartaVinos />} />
    <Route path={`${prefix}/logiciel-carte-des-vins`} element={<SoftwareCartaVinos />} />
    <Route path={`${prefix}/what-is-winerim`} element={<WhatIsWinerim />} />
    <Route path={`${prefix}/cose-winerim`} element={<QueEsWinerim />} />
    <Route path={`${prefix}/quest-ce-que-winerim`} element={<QueEsWinerim />} />
    <Route path={`${prefix}/product/dynamic-intelligence`} element={<InteligenciaDinamica />} />
    <Route path={`${prefix}/prodotto/intelligenza-dinamica`} element={<InteligenciaDinamica />} />
    <Route path={`${prefix}/produit/intelligence-dynamique`} element={<InteligenciaDinamica />} />
    <Route path={`${prefix}/privacy`} element={<Privacidad />} />
    <Route path={`${prefix}/confidentialite`} element={<Privacidad />} />
    <Route path={`${prefix}/terms`} element={<Terminos />} />
    <Route path={`${prefix}/termini`} element={<Terminos />} />
    <Route path={`${prefix}/conditions`} element={<Terminos />} />
    <Route path={`${prefix}/solutions/restaurant-groups`} element={<GruposRestauracion />} />
    <Route path={`${prefix}/soluzioni/gruppi-ristorazione`} element={<GruposRestauracion />} />
    <Route path={`${prefix}/solutions/groupes-restauration`} element={<GruposRestauracion />} />
    <Route path={`${prefix}/solutions/increase-average-ticket`} element={<AumentarTicketMedio />} />
    <Route path={`${prefix}/soluzioni/aumentare-scontrino-medio`} element={<AumentarTicketMedio />} />
    <Route path={`${prefix}/solutions/augmenter-ticket-moyen`} element={<AumentarTicketMedio />} />
    <Route path={`${prefix}/article/:slug`} element={<ArticlePage />} />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {esRoutes}
              {langRoutes("/en")}
              {langRoutes("/it")}
              {langRoutes("/fr")}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {/* Overlay components — lazy loaded, non-critical */}
          <Suspense fallback={null}>
            <WhatsAppButton />
            <BackToTop />
            <CookieConsent />
          </Suspense>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
