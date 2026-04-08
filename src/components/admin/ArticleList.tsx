import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  image_url: string | null;
  category: string;
  author: string | null;
  author_role: string | null;
  author_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ArticleListProps {
  articles: Article[];
  filterCategory: string;
  onFilterChange: (cat: string) => void;
  onNew: () => void;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (article: Article) => void;
}

const ArticleList = ({ articles, filterCategory, onFilterChange, onNew, onEdit, onDelete, onTogglePublish }: ArticleListProps) => {
  const filtered = filterCategory === "all" ? articles : articles.filter(a => a.category === filterCategory);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button onClick={onNew} className="bg-gradient-wine text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Nuevo artículo
        </Button>
        <select value={filterCategory}
          onChange={e => onFilterChange(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground">
          <option value="all">Todos</option>
          <option value="blog">Blog</option>
          <option value="interview">Entrevistas</option>
        </select>
      </div>
      <div className="space-y-3">
        {filtered.map(article => (
          <div key={article.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
            {article.image_url && (
              <img src={article.image_url} alt={article.title || "Imagen del artículo"} className="w-16 h-16 rounded object-cover shrink-0" loading="lazy" decoding="async" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{article.title}</p>
              <p className="text-xs text-muted-foreground">
                {article.category === "interview" ? "Entrevista" : "Blog"}
                {article.author && ` · ${article.author}`}
                {" · "}
                {new Date(article.created_at).toLocaleDateString("es-ES")}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => onTogglePublish(article)}
                title={article.published ? "Despublicar" : "Publicar"}>
                {article.published ? <Eye className="w-4 h-4 text-accent" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onEdit(article)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(article.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No hay artículos. Crea el primero.</p>
        )}
      </div>
    </>
  );
};

export default ArticleList;
