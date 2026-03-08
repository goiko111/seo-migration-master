import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";

interface ArticleForm {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  category: string;
  author: string;
  author_role: string;
  author_image: string;
  published: boolean;
}

interface ArticleEditorProps {
  article: ArticleForm;
  onChange: (article: ArticleForm) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

const ArticleEditor = ({ article, onChange, onSave, onCancel, saving }: ArticleEditorProps) => {
  const update = (fields: Partial<ArticleForm>) => onChange({ ...article, ...fields });

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <h2 className="font-heading text-xl font-bold">
        {article.id ? "Editar artículo" : "Nuevo artículo"}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Input placeholder="Título" value={article.title}
          onChange={e => update({ title: e.target.value })}
          className="bg-background border-border" />
        <Input placeholder="Slug (URL)" value={article.slug}
          onChange={e => update({ slug: e.target.value })}
          className="bg-background border-border" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <select value={article.category}
          onChange={e => update({ category: e.target.value })}
          className="bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground">
          <option value="blog">Blog</option>
          <option value="interview">Entrevista</option>
        </select>
        <Input placeholder="Autor" value={article.author}
          onChange={e => update({ author: e.target.value })}
          className="bg-background border-border" />
        <Input placeholder="Cargo del autor" value={article.author_role}
          onChange={e => update({ author_role: e.target.value })}
          className="bg-background border-border" />
      </div>
      <ImageUpload
        label="Imagen principal"
        value={article.image_url}
        onChange={url => update({ image_url: url })}
      />
      <ImageUpload
        label="Imagen del autor"
        value={article.author_image}
        onChange={url => update({ author_image: url })}
      />
      <Textarea placeholder="Extracto / resumen" value={article.excerpt}
        onChange={e => update({ excerpt: e.target.value })}
        className="bg-background border-border min-h-[80px]" />
      <Textarea placeholder="Contenido (Markdown)" value={article.body}
        onChange={e => update({ body: e.target.value })}
        className="bg-background border-border min-h-[300px] font-mono text-sm" />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={article.published}
            onChange={e => update({ published: e.target.checked })} />
          Publicado
        </label>
      </div>
      <div className="flex gap-3">
        <Button onClick={onSave} disabled={saving} className="bg-gradient-wine text-primary-foreground">
          {saving ? "Guardando..." : "Guardar"}
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default ArticleEditor;
