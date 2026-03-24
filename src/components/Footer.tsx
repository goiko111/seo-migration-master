import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";
import ScrollReveal from "./ScrollReveal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { ga } from "@/lib/analytics";
import InstagramFeed from "./InstagramFeed";

const Footer = () => {
  const { t, lang, localePath } = useLanguage();

  const socialLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/winerim/", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label: "Facebook", url: "https://www.facebook.com/Winerim", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { label: "Instagram", url: "https://www.instagram.com/wine_rim/", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    { label: "YouTube", url: "https://www.youtube.com/@Winerim", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
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
            onClick={() => ga.ctaClick("footer_demo", "/demo", "footer")}
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
            <div className="flex gap-3 mt-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Winerim en ${link.label}`}
                >
                  {link.icon}
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
                { label: t.nav_sol_growing_list, href: localePath("/soluciones/carta-crecimiento") },
                { label: t.nav_sol_large_list, href: localePath("/soluciones/carta-amplia") },
                { label: t.nav_sol_purchasing ?? "Inteligencia de compras", href: localePath("/soluciones/inteligencia-de-compras") },
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
                { label: "Partners", href: localePath("/afiliate") },
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
