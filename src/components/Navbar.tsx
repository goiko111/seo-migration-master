import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sommelier Corner", href: "/sommelier-corner" },
  { label: "Blog", href: "/blog" },
  { label: "Afíliate", href: "/afiliate" },
  { label: "Contacto", href: "/contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-xs xl:text-sm font-medium tracking-widest uppercase transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-wine after:origin-left after:transition-transform after:duration-300 ${
                location.pathname === item.href
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
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

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-background/98 backdrop-blur-lg z-40"
          >
            <nav className="flex flex-col gap-2 px-6 py-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={`block py-3 text-lg font-medium tracking-widest uppercase transition-colors border-b border-border ${
                      location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
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
