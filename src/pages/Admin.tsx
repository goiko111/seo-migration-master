import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Pencil, Trash2, Eye, EyeOff, Download } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";
import { toast } from "sonner";

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

interface Lead {
  id: string;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  restaurant: string | null;
  city: string | null;
  position: string | null;
  references_count: string | null;
  menu_link: string | null;
  message: string | null;
  created_at: string;
}

const emptyArticle = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  image_url: "",
  category: "blog",
  author: "",
  author_role: "",
  author_image: "",
  published: false,
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editingArticle, setEditingArticle] = useState<typeof emptyArticle & { id?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchArticles();
      fetchLeads();
    }
  }, [isAdmin]);

  const fetchArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setArticles(data);
  };

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setLeads(data);
  };

  const saveArticle = async () => {
    if (!editingArticle) return;
    setSaving(true);
    const payload = {
      slug: editingArticle.slug,
      title: editingArticle.title,
      excerpt: editingArticle.excerpt || null,
      body: editingArticle.body || null,
      image_url: editingArticle.image_url || null,
      category: editingArticle.category,
      author: editingArticle.author || null,
      author_role: editingArticle.author_role || null,
      author_image: editingArticle.author_image || null,
      published: editingArticle.published,
      published_at: editingArticle.published ? new Date().toISOString() : null,
    };

    if (editingArticle.id) {
      const { error } = await supabase.from("articles").update(payload).eq("id", editingArticle.id);
      if (error) toast.error("Error al guardar");
      else toast.success("Artículo actualizado");
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) toast.error("Error al crear: " + error.message);
      else toast.success("Artículo creado");
    }
    setSaving(false);
    setEditingArticle(null);
    fetchArticles();
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("¿Eliminar este artículo?")) return;
    await supabase.from("articles").delete().eq("id", id);
    toast.success("Artículo eliminado");
    fetchArticles();
  };

  const togglePublish = async (article: Article) => {
    await supabase.from("articles").update({
      published: !article.published,
      published_at: !article.published ? new Date().toISOString() : null,
    }).eq("id", article.id);
    fetchArticles();
  };

  const deleteLead = async (id: string) => {
    await supabase.from("contact_leads").delete().eq("id", id);
    toast.success("Lead eliminado");
    fetchLeads();
  };

  const exportLeads = () => {
    const headers = ["Fecha", "Tipo", "Nombre", "Email", "Teléfono", "Restaurante", "Ciudad", "Cargo", "Mensaje"];
    const rows = leads.map(l => [
      new Date(l.created_at).toLocaleDateString("es-ES"),
      l.form_type, l.name, l.email, l.phone, l.restaurant, l.city, l.position, l.message
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filteredArticles = filterCategory === "all"
    ? articles
    : articles.filter(a => a.category === filterCategory);

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Cargando...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={winerimLogo} alt="Winerim" className="h-6" />
            <span className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => { signOut(); navigate("/"); }}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="articles">
          <TabsList className="mb-8">
            <TabsTrigger value="articles">Artículos & Entrevistas</TabsTrigger>
            <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          </TabsList>

          {/* ARTICLES TAB */}
          <TabsContent value="articles">
            {editingArticle ? (
              <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                <h2 className="font-heading text-xl font-bold">
                  {editingArticle.id ? "Editar artículo" : "Nuevo artículo"}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Título" value={editingArticle.title}
                    onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                    className="bg-background border-border" />
                  <Input placeholder="Slug (URL)" value={editingArticle.slug}
                    onChange={e => setEditingArticle({...editingArticle, slug: e.target.value})}
                    className="bg-background border-border" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <select value={editingArticle.category}
                    onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                    className="bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground">
                    <option value="blog">Blog</option>
                    <option value="interview">Entrevista</option>
                  </select>
                  <Input placeholder="Autor" value={editingArticle.author || ""}
                    onChange={e => setEditingArticle({...editingArticle, author: e.target.value})}
                    className="bg-background border-border" />
                  <Input placeholder="Cargo del autor" value={editingArticle.author_role || ""}
                    onChange={e => setEditingArticle({...editingArticle, author_role: e.target.value})}
                    className="bg-background border-border" />
                </div>
                <Input placeholder="URL de imagen principal" value={editingArticle.image_url || ""}
                  onChange={e => setEditingArticle({...editingArticle, image_url: e.target.value})}
                  className="bg-background border-border" />
                <Input placeholder="URL de imagen del autor" value={editingArticle.author_image || ""}
                  onChange={e => setEditingArticle({...editingArticle, author_image: e.target.value})}
                  className="bg-background border-border" />
                <Textarea placeholder="Extracto / resumen" value={editingArticle.excerpt || ""}
                  onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                  className="bg-background border-border min-h-[80px]" />
                <Textarea placeholder="Contenido (Markdown)" value={editingArticle.body || ""}
                  onChange={e => setEditingArticle({...editingArticle, body: e.target.value})}
                  className="bg-background border-border min-h-[300px] font-mono text-sm" />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={editingArticle.published}
                      onChange={e => setEditingArticle({...editingArticle, published: e.target.checked})} />
                    Publicado
                  </label>
                </div>
                <div className="flex gap-3">
                  <Button onClick={saveArticle} disabled={saving} className="bg-gradient-wine text-primary-foreground">
                    {saving ? "Guardando..." : "Guardar"}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingArticle(null)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Button onClick={() => setEditingArticle({...emptyArticle})} className="bg-gradient-wine text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Nuevo artículo
                  </Button>
                  <select value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground">
                    <option value="all">Todos</option>
                    <option value="blog">Blog</option>
                    <option value="interview">Entrevistas</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {filteredArticles.map(article => (
                    <div key={article.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                      {article.image_url && (
                        <img src={article.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />
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
                        <Button variant="ghost" size="icon" onClick={() => togglePublish(article)}
                          title={article.published ? "Despublicar" : "Publicar"}>
                          {article.published ? <Eye className="w-4 h-4 text-accent" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingArticle({
                          id: article.id, slug: article.slug, title: article.title,
                          excerpt: article.excerpt || "", body: article.body || "",
                          image_url: article.image_url || "", category: article.category,
                          author: article.author || "", author_role: article.author_role || "",
                          author_image: article.author_image || "", published: article.published,
                        })}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteArticle(article.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredArticles.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">No hay artículos. Crea el primero.</p>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* LEADS TAB */}
          <TabsContent value="leads">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={exportLeads}>
                <Download className="w-4 h-4 mr-2" /> Exportar CSV
              </Button>
            </div>
            <div className="space-y-3">
              {leads.map(lead => (
                <div key={lead.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                          lead.form_type === "demo" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                        }`}>
                          {lead.form_type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="font-semibold text-sm">{lead.name || "Sin nombre"}</p>
                      <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
                        {lead.email && <p>📧 {lead.email}</p>}
                        {lead.phone && <p>📞 {lead.phone}</p>}
                        {lead.restaurant && <p>🏪 {lead.restaurant}{lead.city ? `, ${lead.city}` : ""}</p>}
                        {lead.message && <p className="mt-2 text-foreground/70 italic">"{lead.message}"</p>}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteLead(lead.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {leads.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No hay leads todavía.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
