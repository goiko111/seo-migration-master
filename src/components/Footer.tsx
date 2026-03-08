import { Link } from "react-router-dom";
import winerimLogo from "@/assets/winerim-logo.png";
import { usePageContent } from "@/hooks/usePageContent";

const Footer = () => {
  const { get, getJson } = usePageContent("footer");

  const socialLinks = getJson<{ label: string; url: string }[]>("social", "links", [
    { label: "Instagram", url: "https://www.instagram.com/winerim/" },
    { label: "YouTube", url: "https://www.youtube.com/@Winerim" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/winerim/" },
  ]);

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <img src={winerimLogo} alt="Winerim" className="h-7 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {get("general", "description", "La carta de vinos digital que revoluciona la hostelería.")}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {get("columns", "col1_title", "Producto")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Funcionalidades", href: "/afiliate" },
                { label: "Demo gratuita", href: "/demo" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {get("columns", "col2_title", "Empresa")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Sommelier Corner", href: "/sommelier-corner" },
                { label: "Afíliate", href: "/afiliate" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4">
              {get("columns", "col3_title", "Legal")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: get("legal", "item1", "Política de privacidad"), href: "/privacidad" },
                { label: get("legal", "item2", "Términos de uso"), href: "/terminos" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {get("general", "copyright", "Winerim. Todos los derechos reservados.")}
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
