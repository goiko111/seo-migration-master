import { Link } from "react-router-dom";
import winerimLogo from "@/assets/winerim-logo.png";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, lang, localePath } = useLanguage();

  const socialLinks = [
    { label: "Instagram", url: "https://www.instagram.com/winerim/" },
    { label: "YouTube", url: "https://www.youtube.com/@Winerim" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/winerim/" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <ScrollReveal direction="up" className="sm:col-span-2 lg:col-span-2">
            <img src={winerimLogo} alt="Winerim" className="h-7 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t.footer_description}
            </p>
          </ScrollReveal>

          {/* Product */}
          <ScrollReveal delay={0.1}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.footer_product}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav_features, href: localePath("/funcionalidades") },
                { label: t.nav_dynamic_intelligence ?? "Inteligencia dinámica", href: localePath("/producto/inteligencia-dinamica") },
                { label: t.nav_integrations, href: localePath("/integraciones") },
                { label: t.nav_pricing, href: localePath("/precios") },
                { label: t.nav_case_studies, href: localePath("/casos-exito") },
                { label: t.footer_free_demo, href: localePath("/demo") },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Solutions */}
          <ScrollReveal delay={0.15}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.nav_solutions}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav_sol_gastronomic, href: localePath("/soluciones/restaurantes-gastronomicos") },
                { label: t.nav_sol_wine_bars, href: localePath("/soluciones/wine-bars") },
                { label: t.nav_sol_hotels, href: localePath("/soluciones/hoteles") },
                { label: t.nav_sol_groups, href: localePath("/soluciones/grupos-restauracion") },
                { label: t.nav_sol_no_sommelier, href: localePath("/soluciones/restaurante-sin-sumiller") },
                { label: t.nav_sol_large_list, href: localePath("/soluciones/carta-amplia") },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Resources */}
          <ScrollReveal delay={0.2}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.nav_resources}
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Blog", href: localePath("/blog") },
                { label: t.nav_sommelier, href: localePath("/sommelier-corner") },
                { label: t.nav_guides, href: localePath("/guias-y-recursos") },
                { label: t.nav_benchmarks, href: "/benchmarks-playbooks" },
                { label: t.nav_wine_analyzer, href: localePath("/analisis-carta") },
                { label: t.nav_margin_calc, href: localePath("/calculadora-margen-vino") },
                { label: t.nav_contact, href: localePath("/contacto") },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Legal */}
          <ScrollReveal delay={0.25}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.footer_legal}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.footer_privacy, href: localePath("/privacidad") },
                { label: t.footer_terms, href: localePath("/terminos") },
                { label: lang === "es" ? "Sobre Winerim" : "About Winerim", href: "/sobre-winerim" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t.footer_copyright}
          </p>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
