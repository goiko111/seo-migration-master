import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ImageUpload from "./ImageUpload";
import MarkdownToolbar from "./MarkdownToolbar";

interface RelatedLink {
  to: string;
  label: string;
  type: "tool" | "guide" | "resource" | "solution";
}

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
  related_links: RelatedLink[];
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
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold">
          {article.id ? "Editar artículo" : "Nuevo artículo"}
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Input placeholder="Título" value={article.title}
          onChange={e => {
            const title = e.target.value;
            const autoSlug = !article.id && !article.slug;
            update({
              title,
              ...(autoSlug ? { slug: title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } : {}),
            });
          }}
          className="bg-background border-border" />
        <div className="flex gap-2">
          <Input placeholder="Slug (URL)" value={article.slug}
            onChange={e => update({ slug: e.target.value })}
            className="bg-background border-border flex-1" />
          {article.slug && (
            <a href={`/article/${article.slug}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-3 text-xs text-accent hover:underline shrink-0">
              Vista previa ↗
            </a>
          )}
        </div>
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
      <ImageUpload label="Imagen principal" value={article.image_url} onChange={url => update({ image_url: url })} />
      <ImageUpload label="Imagen del autor" value={article.author_image} onChange={url => update({ author_image: url })} />
      <Textarea placeholder="Extracto / resumen" value={article.excerpt}
        onChange={e => update({ excerpt: e.target.value })}
        className="bg-background border-border min-h-[80px]" />

      {/* Markdown editor with toolbar and preview */}
      <div className="space-y-0">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">Contenido (Markdown)</label>
          <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)} type="button">
            {showPreview ? <><EyeOff className="w-4 h-4 mr-1" /> Editor</> : <><Eye className="w-4 h-4 mr-1" /> Vista previa</>}
          </Button>
        </div>
        {showPreview ? (
          <div className="bg-background border border-border rounded-md p-6 min-h-[300px] prose prose-invert prose-sm max-w-none">
            {article.body ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic">Sin contenido aún...</p>
            )}
          </div>
        ) : (
          <div>
            <MarkdownToolbar
              textareaId="article-body-editor"
              value={article.body}
              onChange={body => update({ body })}
            />
            <Textarea
              id="article-body-editor"
              placeholder="Escribe el contenido en Markdown..."
              value={article.body}
              onChange={e => update({ body: e.target.value })}
              className="bg-background border-border min-h-[300px] font-mono text-sm rounded-t-none"
            />
          </div>
        )}
      </div>

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
