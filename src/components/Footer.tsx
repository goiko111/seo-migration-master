import winerimLogo from "@/assets/winerim-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <img src={winerimLogo} alt="Winerim" className="h-7 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              La carta de vinos digital que revoluciona la hostelería.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              Producto
            </h4>
            <ul className="space-y-3">
              {["Funcionalidades", "Precios", "Demo gratuita", "Integraciones"].map((item) => (
                <li key={item}>
                  <a href="/demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Sommelier Corner", href: "/sommelier-corner" },
                { label: "Afíliate", href: "/afiliate" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {["Política de privacidad", "Términos de uso", "Cookies"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Winerim. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/winerim/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@Winerim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
            >
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/company/winerim/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
