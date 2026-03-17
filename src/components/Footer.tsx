import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";
import ScrollReveal from "./ScrollReveal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, lang, localePath } = useLanguage();

  const socialLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/winerim/" },
    { label: "Instagram", url: "https://www.instagram.com/winerim/" },
    { label: "YouTube", url: "https://www.youtube.com/@Winerim" },
  ];

  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      {/* ── CTA Band ──────────────────────────── */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
          <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
              {t.footer_cta_title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t.footer_cta_subtitle}
            </p>
          </div>
          <Link
            to={localePath("/demo")}
            className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 shrink-0"
          >
            {t.footer_free_demo}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Main links grid ───────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-x-8 gap-y-10">
          {/* Brand — 3 cols */}
          <ScrollReveal direction="up" className="col-span-2 sm:col-span-3 lg:col-span-3">
            <Link to={localePath("/")} className="inline-block">
              <img src={winerimLogo} alt="Winerim" className="h-7 mb-3" width={120} height={28} />
            </Link>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[260px]">
              {t.footer_description}
            </p>
            <p className="text-xs font-semibold tracking-widest uppercase text-wine mt-3">
              {t.footer_tagline}
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
                  aria-label={`Winerim en ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Product — 2 cols */}
          <ScrollReveal delay={0.05} className="lg:col-span-2">
            <FooterHeading>{t.footer_product}</FooterHeading>
            <FooterLinks
              items={[
                { label: t.nav_software, href: localePath("/software-carta-de-vinos") },
                { label: t.nav_features, href: localePath("/funcionalidades") },
                { label: "Winerim Core", href: localePath("/producto/winerim-core") },
                { label: t.nav_dynamic_intelligence ?? "Inteligencia dinámica", href: localePath("/producto/inteligencia-dinamica") },
                { label: "Winerim Supply", href: localePath("/producto/winerim-supply") },
                { label: t.nav_integrations, href: localePath("/integraciones") },
                { label: t.nav_pricing, href: localePath("/precios") },
                { label: t.nav_case_studies, href: localePath("/casos-exito") },
              ]}
            />
          </ScrollReveal>

          {/* Solutions — 2 cols */}
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <FooterHeading>{t.nav_solutions}</FooterHeading>
            <FooterLinks
              items={[
                { label: t.nav_sol_gastronomic, href: localePath("/soluciones/restaurantes-gastronomicos") },
                { label: t.nav_sol_wine_bars, href: localePath("/soluciones/wine-bars") },
                { label: t.nav_sol_hotels, href: localePath("/soluciones/hoteles") },
                { label: t.nav_sol_groups, href: localePath("/soluciones/grupos-restauracion") },
                { label: t.nav_sol_no_sommelier, href: localePath("/soluciones/restaurantes-sin-sumiller") },
                { label: t.nav_sol_large_list, href: localePath("/soluciones/carta-amplia") },
              ]}
            />
          </ScrollReveal>

          {/* Content & Resources — 2 cols */}
          <ScrollReveal delay={0.15} className="lg:col-span-2">
            <FooterHeading>{t.nav_resources}</FooterHeading>
            <FooterLinks
              items={[
                { label: "Blog", href: localePath("/blog") },
                { label: t.nav_sommelier, href: localePath("/sommelier-corner") },
                { label: t.nav_guides, href: localePath("/guias-y-recursos") },
                { label: t.nav_downloadable_resources ?? "Recursos descargables", href: localePath("/recursos") },
                { label: t.nav_benchmarks, href: localePath("/benchmarks-playbooks") },
                { label: t.nav_wine_analyzer, href: localePath("/analisis-carta") },
                { label: t.nav_margin_calc, href: localePath("/calculadora-margen-vino") },
              ]}
            />
          </ScrollReveal>

          {/* Company — 1 col (narrow) */}
          <ScrollReveal delay={0.2} className="lg:col-span-1">
            <FooterHeading>{t.footer_company}</FooterHeading>
            <FooterLinks
              items={[
                { label: t.footer_about, href: localePath("/sobre-winerim") },
                { label: t.nav_clients, href: localePath("/clientes") },
                { label: t.nav_contact, href: localePath("/contacto") },
                { label: "Área cliente", href: "/decision-center" },
                { label: t.footer_privacy, href: localePath("/privacidad") },
                { label: t.footer_terms, href: localePath("/terminos") },
              ]}
            />
          </ScrollReveal>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────── */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t.footer_copyright}
          </p>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── Sub-components ─────────────────────────────── */

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-heading text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 mb-4">
    {children}
  </h4>
);

const FooterLinks = ({ items }: { items: { label: string; href: string }[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item.href + item.label}>
        <Link
          to={item.href}
          className="text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-snug"
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
);

export default Footer;
