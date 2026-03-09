import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ArticleMidCTA = () => (
  <section className="max-w-4xl mx-auto px-6 md:px-12 py-6">
    <ScrollReveal>
      <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-xl border border-wine/20 bg-wine/5">
        <Sparkles size={24} className="text-wine shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-heading font-bold text-lg mb-1">¿Quieres optimizar tu carta de vinos?</h3>
          <p className="text-sm text-muted-foreground">Winerim te ayuda a vender más vino con tecnología e inteligencia artificial.</p>
        </div>
        <Link to="/demo"
          className="shrink-0 inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
          Solicitar demo <ArrowRight size={16} />
        </Link>
      </div>
    </ScrollReveal>
  </section>
);

export default ArticleMidCTA;
