import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveLibraryLink, type TagCategory } from "@/data/wineLibraryLinks";
import { getWineLibraryPath } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

export interface RelatedWineLibraryLinkItem {
  name: string;
  hint?: TagCategory;
  note?: string;
}

interface RelatedWineLibraryLinksProps {
  items: RelatedWineLibraryLinkItem[];
  title?: string;
  description?: string;
  className?: string;
}

const copyByLang: Record<string, { title: string; description: string; eyebrow: string }> = {
  es: {
    title: "Explorar relaciones en la biblioteca",
    description: "Conecta esta ficha con uvas, regiones, estilos y maridajes relacionados.",
    eyebrow: "Biblioteca conectada",
  },
  en: {
    title: "Explore related library entries",
    description: "Connect this page with related grapes, regions, styles and pairings.",
    eyebrow: "Connected library",
  },
  it: {
    title: "Esplora schede correlate",
    description: "Collega questa pagina con vitigni, regioni, stili e abbinamenti correlati.",
    eyebrow: "Biblioteca collegata",
  },
  fr: {
    title: "Explorer les fiches liées",
    description: "Reliez cette page aux cépages, régions, styles et accords associés.",
    eyebrow: "Bibliothèque connectée",
  },
  de: {
    title: "Verwandte Bibliothekseinträge",
    description: "Diese Seite mit passenden Rebsorten, Regionen, Stilen und Pairings verbinden.",
    eyebrow: "Vernetzte Bibliothek",
  },
  pt: {
    title: "Explorar fichas relacionadas",
    description: "Ligue esta página a castas, regiões, estilos e harmonizações relacionadas.",
    eyebrow: "Biblioteca ligada",
  },
};

const RelatedWineLibraryLinks = ({ items, title, description, className = "" }: RelatedWineLibraryLinksProps) => {
  const { lang } = useLanguage();
  const copy = copyByLang[String(lang)] || copyByLang.en;
  const seen = new Set<string>();

  const links = items
    .map((item) => {
      const resolved = resolveLibraryLink(item.name, item.hint);
      if (!resolved) return null;
      const localizedPath = getWineLibraryPath(lang, resolved.path);
      if (seen.has(localizedPath)) return null;
      seen.add(localizedPath);
      return { ...item, path: localizedPath };
    })
    .filter((item): item is RelatedWineLibraryLinkItem & { path: string } => Boolean(item))
    .slice(0, 8);

  if (links.length === 0) return null;

  return (
    <section className={`rounded-lg border border-border bg-card/60 p-6 ${className}`}>
      <p className="mb-2 text-xs font-semibold uppercase text-wine">{copy.eyebrow}</p>
      <div className="mb-5 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold text-foreground">{title || copy.title}</h2>
        <p className="mt-2 text-muted-foreground">{description || copy.description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group flex min-h-24 flex-col justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:border-wine/40 hover:text-wine"
          >
            <span className="font-medium leading-snug">{item.name}</span>
            <span className="mt-3 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-wine">
              {item.note || copy.eyebrow}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedWineLibraryLinks;
