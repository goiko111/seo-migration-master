import { Link } from "react-router-dom";
import winerimLogo from "@/assets/winerim-logo.png";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, localePath } = useLanguage();

  const socialLinks = [
    { label: "Instagram", url: "https://www.instagram.com/winerim/" },
    { label: "YouTube", url: "https://www.youtube.com/@Winerim" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/winerim/" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <ScrollReveal direction="up" className="sm:col-span-2 lg:col-span-1">
            <img src={winerimLogo} alt="Winerim" className="h-7 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer_description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.footer_product}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav_features, href: localePath("/funcionalidades") },
                { label: t.nav_dynamic_intelligence ?? "Inteligencia dinámica", href: localePath("/producto/inteligencia-dinamica") },
                { label: t.nav_pricing, href: localePath("/precios") },
                { label: t.nav_integrations, href: localePath("/integraciones") },
                { label: t.nav_case_studies, href: localePath("/casos-exito") },
                { label: t.nav_clients, href: localePath("/clientes") },
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

          <ScrollReveal delay={0.15}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.footer_content}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav_blog, href: localePath("/blog") },
                { label: "Sommelier Corner", href: localePath("/sommelier-corner") },
                { label: t.nav_guides, href: localePath("/guias-y-recursos") },
                { label: "Benchmarks & Playbooks", href: "/benchmarks-playbooks" },
                { label: t.footer_common_problems, href: localePath("/problemas") },
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

          <ScrollReveal delay={0.2}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.footer_tools}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav_wine_analyzer, href: localePath("/analisis-carta") },
                { label: t.nav_margin_calc, href: localePath("/calculadora-margen-vino") },
                { label: t.nav_glass_price, href: localePath("/herramientas/calculadora-precio-vino-por-copa") },
                { label: t.nav_pairing_generator, href: localePath("/herramientas") },
                { label: t.nav_pricing_tool, href: localePath("/herramientas") },
                { label: t.nav_see_all, href: localePath("/herramientas") },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {t.footer_legal}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.footer_privacy, href: localePath("/privacidad") },
                { label: t.footer_terms, href: localePath("/terminos") },
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
