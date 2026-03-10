import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import winerimLogo from "@/assets/winerim-logo.png";
import { toast } from "sonner";
import ArticleEditor from "@/components/admin/ArticleEditor";
import ArticleList from "@/components/admin/ArticleList";
import LeadsTab from "@/components/admin/LeadsTab";
import PageContentEditor from "@/components/admin/PageContentEditor";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import RestaurantsTab from "@/components/admin/RestaurantsTab";

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
  slug: "", title: "", excerpt: "", body: "", image_url: "",
  category: "blog", author: "", author_role: "", author_image: "", published: false, related_links: [] as { to: string; label: string; type: "tool" | "guide" | "resource" | "solution" }[],
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editingArticle, setEditingArticle] = useState<typeof emptyArticle & { id?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) { fetchArticles(); fetchLeads(); }
  }, [isAdmin]);

  const fetchArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (data) setArticles(data);
  };

  const fetchLeads = async () => {
    const { data } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false });
    if (data) setLeads(data);
  };

  const saveArticle = async () => {
    if (!editingArticle) return;
    setSaving(true);
    const payload = {
      slug: editingArticle.slug, title: editingArticle.title,
      excerpt: editingArticle.excerpt || null, body: editingArticle.body || null,
      image_url: editingArticle.image_url || null, category: editingArticle.category,
      author: editingArticle.author || null, author_role: editingArticle.author_role || null,
      author_image: editingArticle.author_image || null, published: editingArticle.published,
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

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Cargando...</div>;

  return (
    <div className="min-h-screen bg-background">
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
        <Tabs defaultValue="analytics">
          <TabsList className="mb-8">
            <TabsTrigger value="analytics">Dashboard</TabsTrigger>
            <TabsTrigger value="articles">Artículos</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurantes</TabsTrigger>
            <TabsTrigger value="pages">Textos de páginas</TabsTrigger>
            <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsTab leads={leads} />
          </TabsContent>

          <TabsContent value="articles">
            {editingArticle ? (
              <ArticleEditor
                article={editingArticle}
                onChange={setEditingArticle}
                onSave={saveArticle}
                onCancel={() => setEditingArticle(null)}
                saving={saving}
              />
            ) : (
              <ArticleList
                articles={articles}
                filterCategory={filterCategory}
                onFilterChange={setFilterCategory}
                onNew={() => setEditingArticle({ ...emptyArticle })}
                onEdit={article => setEditingArticle({
                  id: article.id, slug: article.slug, title: article.title,
                  excerpt: article.excerpt || "", body: article.body || "",
                  image_url: article.image_url || "", category: article.category,
                  author: article.author || "", author_role: article.author_role || "",
                  author_image: article.author_image || "", published: article.published,
                })}
                onDelete={deleteArticle}
                onTogglePublish={togglePublish}
              />
            )}
          </TabsContent>

          <TabsContent value="restaurants">
            <RestaurantsTab />
          </TabsContent>

          <TabsContent value="pages">
            <PageContentEditor />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsTab leads={leads} onDelete={deleteLead} onExport={exportLeads} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
