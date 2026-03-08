import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Loader2, Code, List } from "lucide-react";
import { toast } from "sonner";
import JsonListEditor from "./JsonListEditor";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  updated_at: string;
}

const PAGES = [
  { value: "home", label: "Home" },
  { value: "afiliate", label: "Afíliate" },
  { value: "demo", label: "Demo" },
  { value: "contacto", label: "Contacto" },
  { value: "blog", label: "Blog" },
  { value: "sommelier", label: "Sommelier Corner" },
  { value: "footer", label: "Footer" },
];

const PageContentEditor = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedPage, setSelectedPage] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ section: "", content_key: "", content_value: "" });
  const [showNew, setShowNew] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("page_content")
      .select("*")
      .eq("page", selectedPage)
      .order("section")
      .order("content_key");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, [selectedPage]);

  const saveItem = async (item: ContentItem) => {
    setSaving(item.id);
    const { error } = await supabase
      .from("page_content")
      .update({ content_value: item.content_value })
      .eq("id", item.id);
    if (error) toast.error("Error al guardar");
    else toast.success("Guardado");
    setSaving(null);
  };

  const addItem = async () => {
    if (!newItem.section || !newItem.content_key) {
      toast.error("Sección y clave son obligatorios");
      return;
    }
    const { error } = await supabase.from("page_content").insert({
      page: selectedPage,
      section: newItem.section,
      content_key: newItem.content_key,
      content_value: newItem.content_value,
    });
    if (error) toast.error("Error: " + error.message);
    else {
      toast.success("Contenido añadido");
      setNewItem({ section: "", content_key: "", content_value: "" });
      setShowNew(false);
      fetchContent();
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("¿Eliminar este contenido?")) return;
    await supabase.from("page_content").delete().eq("id", id);
    toast.success("Eliminado");
    fetchContent();
  };

  const updateLocal = (id: string, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, content_value: value } : i));
  };

  // Group by section
  const sections = items.reduce<Record<string, ContentItem[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {PAGES.map(p => (
            <Button
              key={p.value}
              variant={selectedPage === p.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPage(p.value)}
              className={selectedPage === p.value ? "bg-gradient-wine text-primary-foreground" : ""}
            >
              {p.label}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowNew(!showNew)}>
          <Plus className="w-4 h-4 mr-1" /> Añadir campo
        </Button>
      </div>

      {showNew && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold">Nuevo campo de contenido</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <Input placeholder="Sección (ej: hero)" value={newItem.section}
              onChange={e => setNewItem({ ...newItem, section: e.target.value })}
              className="bg-background border-border" />
            <Input placeholder="Clave (ej: title)" value={newItem.content_key}
              onChange={e => setNewItem({ ...newItem, content_key: e.target.value })}
              className="bg-background border-border" />
            <Input placeholder="Valor" value={newItem.content_value}
              onChange={e => setNewItem({ ...newItem, content_value: e.target.value })}
              className="bg-background border-border" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={addItem} className="bg-gradient-wine text-primary-foreground">Guardar</Button>
            <Button size="sm" variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando...
        </div>
      ) : Object.keys(sections).length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No hay contenido para esta página. Usa "Añadir campo" para empezar.
        </p>
      ) : (
        Object.entries(sections).map(([section, sectionItems]) => (
          <div key={section} className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{section}</h3>
            {sectionItems.map(item => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">{item.content_key}</label>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"
                      onClick={() => saveItem(item)}
                      disabled={saving === item.id}>
                      {saving === item.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Save className="w-4 h-4 text-accent" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                {item.content_value.length > 100 ? (
                  <Textarea
                    value={item.content_value}
                    onChange={e => updateLocal(item.id, e.target.value)}
                    className="bg-background border-border min-h-[80px] text-sm"
                  />
                ) : (
                  <Input
                    value={item.content_value}
                    onChange={e => updateLocal(item.id, e.target.value)}
                    className="bg-background border-border"
                  />
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default PageContentEditor;
