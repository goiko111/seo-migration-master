import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Producto",
    href: "/software-carta-de-vinos",
    dropdown: [
      { label: "Software carta de vinos", href: "/software-carta-de-vinos" },
      { label: "Integraciones", href: "/integraciones" },
      { label: "Precios", href: "/precios" },
      { label: "Casos de éxito", href: "/casos-exito" },
      { label: "Soluciones para grupos", href: "/soluciones/grupos-restauracion" },
    ],
  },
  {
    label: "Herramientas",
    href: "/herramientas",
    dropdown: [
      { label: "Analizador de carta", href: "/wine-list-analyzer" },
      { label: "Calculadora de margen", href: "/calculadora-margen-vino" },
      { label: "Precio por copa", href: "/herramientas/calculadora-precio-vino-por-copa" },
      { label: "Generador de maridajes", href: "/wine-pairing-generator" },
      { label: "Wine pricing tool", href: "/wine-pricing-tool" },
      { label: "Ver todas →", href: "/herramientas" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Guías", href: "/guias-y-recursos" },
  { label: "Contacto", href: "/contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

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
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="shrink-0">
          <img src={winerimLogo} alt="Winerim" className="h-6 sm:h-7" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              <Link
                to={item.href}
                className={`text-xs xl:text-sm font-medium tracking-widest uppercase transition-colors relative inline-flex items-center gap-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-wine after:origin-left after:transition-transform after:duration-300 ${
                  location.pathname === item.href || location.pathname.startsWith(item.href + "/")
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={12} className="opacity-60" />}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                  >
                    <div className="bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-xl shadow-black/10 py-2 min-w-[220px]">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            location.pathname === sub.href
                              ? "text-foreground bg-wine/5"
                              : "text-muted-foreground hover:text-foreground hover:bg-wine/5"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <Link
          to="/demo"
          className="hidden lg:inline-flex bg-gradient-wine text-primary-foreground px-5 xl:px-6 py-2.5 rounded text-xs xl:text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
        >
          Prueba Gratis
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
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
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className={`flex items-center justify-between w-full py-3 text-lg font-medium tracking-widest uppercase transition-colors border-b border-border ${
                          location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
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
                            <div className="pl-4 py-2 space-y-1">
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.href}
                                  to={sub.href}
                                  className={`block py-2 text-base transition-colors ${
                                    location.pathname === sub.href
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.label}
                                </Link>
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
                        location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Link
                  to="/demo"
                  className="block bg-gradient-wine text-primary-foreground px-6 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Prueba Gratis
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
