import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import SommelierCorner from "./pages/SommelierCorner";
import Afiliate from "./pages/Afiliate";
import Contacto from "./pages/Contacto";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
