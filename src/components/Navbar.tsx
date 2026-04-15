import { useState, useEffect, useRef, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { ga } from "@/lib/analytics";

/* ── Types ─────────────────────────────────────── */
interface SubLink {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

interface DropdownColumn {
  title: string;
  items: SubLink[];
}

interface NavItem {
  label: string;
  href: string;
  columns?: DropdownColumn[];
}

/* ── Component ─────────────────────────────────── */
const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { t, localePath, lang } = useLanguage();

  const newBadge = lang === "es" ? "Nuevo" : lang === "en" ? "New" : lang === "it" ? "Nuovo" : "Nouveau";

  /* ── Navigation structure ────────────────────── */
  const navItems: NavItem[] = [
    {
      label: t.nav_product,
      href: localePath("/software-carta-de-vinos"),
      columns: [
        {
          title: t.nav_platform,
          items: [
            { label: t.nav_software, href: localePath("/software-carta-de-vinos"), description: t.nav_software_desc },
            { label: t.nav_features, href: localePath("/funcionalidades") },
            { label: "Winerim Core", href: localePath("/producto/winerim-core"), badge: newBadge },
            { label: t.nav_dynamic_intelligence ?? "Inteligencia dinámica", href: localePath("/producto/inteligencia-dinamica"), badge: newBadge },
            { label: "Winerim Supply", href: localePath("/producto/winerim-supply"), badge: newBadge },
            { label: t.nav_integrations, href: localePath("/integraciones") },
          ],
        },
        {
          title: t.nav_results,
          items: [
            { label: t.nav_case_studies, href: localePath("/casos-exito") },
            { label: t.nav_clients, href: localePath("/clientes") },
            { label: t.footer_common_problems, href: localePath("/problemas") },
          ],
        },
      ],
    },
    {
      label: t.nav_solutions,
      href: localePath("/soluciones"),
      columns: [
        {
          title: t.nav_by_business_type,
          items: [
            { label: t.nav_sol_gastronomic, href: localePath("/soluciones/restaurantes-gastronomicos") },
            { label: t.nav_sol_wine_bars, href: localePath("/soluciones/wine-bars") },
            { label: t.nav_sol_hotels, href: localePath("/soluciones/hoteles") },
            { label: t.nav_sol_groups, href: localePath("/soluciones/grupos-restauracion") },
            { label: t.nav_sol_no_sommelier, href: localePath("/soluciones/restaurantes-sin-sumiller") },
            { label: t.nav_sol_growing_list, href: localePath("/soluciones/carta-crecimiento") },
            { label: t.nav_sol_large_list, href: localePath("/soluciones/carta-amplia") },
            { label: t.nav_sol_purchasing ?? "Inteligencia de compras", href: localePath("/soluciones/inteligencia-de-compras") },
          ],
        },
      ],
    },
    {
      label: t.nav_resources,
      href: localePath("/blog"),
      columns: [
        {
          title: t.nav_resources_learn,
          items: [
            { label: "Blog", href: localePath("/blog") },
            { label: t.nav_sommelier, href: localePath("/sommelier-corner") },
            { label: t.nav_guides, href: localePath("/guias-y-recursos") },
            { label: t.nav_benchmarks, href: localePath("/benchmarks-playbooks") },
          ],
        },
        {
          title: t.nav_resources_downloads ?? "Descargables",
          items: [
            { label: t.nav_res_estrategia_copa, href: localePath("/recursos/plantilla-estrategia-vinos-por-copa") },
            { label: t.nav_res_vinos_muertos, href: localePath("/recursos/checklist-deteccion-vinos-muertos") },
            { label: t.nav_res_formacion_sala, href: localePath("/recursos/plantilla-formacion-equipo-sala") },
            { label: t.nav_see_all_resources, href: localePath("/recursos") },
          ],
        },
        {
          title: t.nav_resources_tools,
          items: [
            { label: t.nav_wine_analyzer, href: localePath("/analisis-carta") },
            { label: t.nav_margin_calc, href: localePath("/calculadora-margen-vino") },
            { label: t.nav_glass_price, href: localePath("/herramientas/calculadora-precio-vino-por-copa") },
            { label: t.nav_see_all, href: localePath("/herramientas") },
          ],
        },
      ],
    },
    {
      label: t.nav_pricing,
      href: localePath("/precios"),
    },
  ];

  /* ── Scroll listener ─────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link to={localePath("/")} className="shrink-0">
          <img src={winerimLogo} alt="Winerim" className="h-6 sm:h-7" width={120} height={28} />
        </Link>

        {/* ── Desktop nav ──────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.columns && handleMouseEnter(item.label)}
              onMouseLeave={() => item.columns && handleMouseLeave()}
            >
              {item.columns ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={`px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium tracking-widest uppercase transition-colors relative inline-flex items-center gap-1 rounded-md hover:bg-accent/50 cursor-pointer ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={12} className={`opacity-60 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={`px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium tracking-widest uppercase transition-colors relative inline-flex items-center gap-1 rounded-md hover:bg-accent/50 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {/* Mega dropdown */}
              <AnimatePresence>
                {item.columns && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                  >
                    <div className="bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-xl shadow-black/10 p-1">
                      <div className={`flex ${item.columns.length > 1 ? "divide-x divide-border" : ""}`}>
                        {item.columns.map((col) => (
                          <div key={col.title} className="min-w-[220px] px-2 py-2">
                            <span className="block px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70">
                              {col.title}
                            </span>
                            {col.items.map((sub) => (
                              <Link
                                key={sub.href + sub.label}
                                to={sub.href}
                                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                                  isActive(sub.href)
                                    ? "text-foreground bg-wine/5 font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                }`}
                              >
                                <span className="flex-1">{sub.label}</span>
                                {sub.badge && (
                                  <Badge className="bg-wine/15 text-wine border-wine/25 text-[10px] px-1.5 py-0 font-semibold leading-4">
                                    {sub.badge}
                                  </Badge>
                                )}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/decision-center"
            className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/60 hover:text-muted-foreground transition-colors px-2 py-2"
          >
            {t.nav_client_area}
          </Link>
          <Link
            to={localePath("/demo")}
            onClick={() => ga.ctaClick("nav_demo", "/demo", "navbar")}
            className="bg-gradient-wine text-primary-foreground px-5 xl:px-6 py-2.5 rounded text-xs xl:text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
          >
            {t.nav_cta}
          </Link>
        </div>

        {/* ── Mobile toggle ────────────────────── */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-background/98 backdrop-blur-lg z-40 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 px-6 py-8">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.columns ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className={`flex items-center justify-between w-full py-3 text-lg font-medium tracking-widest uppercase transition-colors border-b border-border ${
                          isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-2 py-3 space-y-4">
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <span className="block text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/60 mb-1 px-2">
                                    {col.title}
                                  </span>
                                  <div className="space-y-0.5">
                                    {col.items.map((sub) => (
                                      <Link
                                        key={sub.href + sub.label}
                                        to={sub.href}
                                        className={`flex items-center gap-2 py-2 px-2 text-base rounded-lg transition-colors ${
                                          isActive(sub.href)
                                            ? "text-foreground bg-wine/5"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        {sub.label}
                                        {sub.badge && (
                                          <Badge className="bg-wine/15 text-wine border-wine/25 text-[10px] px-1.5 py-0 font-semibold leading-4">
                                            {sub.badge}
                                          </Badge>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block py-3 text-lg font-medium tracking-widest uppercase transition-colors border-b border-border ${
                        isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile contact + area cliente + CTA */}
              <Link
                to="/decision-center"
                className="block py-3 text-base font-medium tracking-widest uppercase transition-colors border-b border-border text-muted-foreground/60"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav_client_area}
              </Link>
              <div className="mt-6">
                <Link
                  to={localePath("/demo")}
                  className="block bg-gradient-wine text-primary-foreground px-6 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase text-center"
                  onClick={() => { setMobileOpen(false); ga.ctaClick("mobile_nav_demo", "/demo", "navbar_mobile"); }}
                >
                  {t.nav_cta}
                </Link>
                <Link
                  to={localePath("/contacto")}
                  className="block text-center text-sm text-muted-foreground mt-3 py-2 hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav_contact}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
