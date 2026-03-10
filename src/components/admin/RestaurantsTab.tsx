import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Trash2, GripVertical, Eye, EyeOff, Star, StarOff, FolderOpen, ChevronDown, ChevronRight, ArrowUp, ArrowDown, X } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  logo_url: string | null;
  city: string | null;
  category: string | null;
  display_order: number;
  featured: boolean;
  visible: boolean;
  created_at: string;
}

const BUCKET = "restaurant-logos";

const RestaurantsTab = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchRestaurants = useCallback(async () => {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setRestaurants(data as Restaurant[]);
  }, []);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  // Group restaurants by category
  const grouped = useMemo(() => {
    if (!groupByCategory) return { "": restaurants };
    const map: Record<string, Restaurant[]> = {};
    for (const r of restaurants) {
      const key = r.category || "Sin categoría";
      if (!map[key]) map[key] = [];
      map[key].push(r);
    }
    return map;
  }, [restaurants, groupByCategory]);

  const categories = useMemo(() => Object.keys(grouped).sort((a, b) => {
    if (a === "Sin categoría") return 1;
    if (b === "Sin categoría") return -1;
    return a.localeCompare(b);
  }), [grouped]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const imageFiles = Array.from(files).filter(f =>
      /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(f.name)
    );

    if (imageFiles.length === 0) {
      toast.error("No se encontraron imágenes en la carpeta");
      setUploading(false);
      return;
    }

    const maxOrder = restaurants.length > 0
      ? Math.max(...restaurants.map(r => r.display_order)) + 1
      : 0;

    const BATCH_SIZE = 6;
    let added = 0;

    for (let start = 0; start < imageFiles.length; start += BATCH_SIZE) {
      const batch = imageFiles.slice(start, start + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map(async (file, idx) => {
          const i = start + idx;
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          const safeName = `${Date.now()}-${i}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

          const relativePath = (file as any).webkitRelativePath || "";
          const pathParts = relativePath.split("/").filter(Boolean);
          const category = pathParts.length > 2 ? pathParts.slice(1, -1).join(" / ") : null;

          const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(safeName, file, { upsert: true });

          if (uploadError) throw new Error(`Storage: ${file.name} - ${uploadError.message}`);

          const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(safeName);

          const { error: insertError } = await supabase.from("restaurants").insert({
            name: nameWithoutExt,
            logo_url: urlData.publicUrl,
            display_order: maxOrder + i,
            visible: true,
            featured: false,
            category,
          });

          if (insertError) throw new Error(`DB: ${nameWithoutExt} - ${insertError.message}`);
          return true;
        })
      );

      results.forEach(r => {
        if (r.status === "fulfilled") added++;
        else toast.error(r.reason?.message || "Error en subida");
      });
    }

    toast.success(`${added} restaurante(s) añadido(s)`);
    setUploading(false);
    e.target.value = "";
    fetchRestaurants();
  };

  const updateField = async (id: string, field: string, value: unknown) => {
    await supabase.from("restaurants").update({ [field]: value } as Record<string, unknown>).eq("id", id);
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const deleteRestaurant = async (r: Restaurant) => {
    if (r.logo_url) {
      const path = r.logo_url.split("/restaurant-logos/")[1];
      if (path) await supabase.storage.from(BUCKET).remove([path]);
    }
    await supabase.from("restaurants").delete().eq("id", r.id);
  };

  const deleteSingle = async (r: Restaurant) => {
    if (!confirm(`¿Eliminar ${r.name}?`)) return;
    await deleteRestaurant(r);
    toast.success("Eliminado");
    fetchRestaurants();
  };

  // Bulk delete selected
  const deleteSelected = async () => {
    if (selected.size === 0) return;
    if (!confirm(`¿Eliminar ${selected.size} restaurante(s)?`)) return;
    setDeleting(true);
    const toDelete = restaurants.filter(r => selected.has(r.id));
    const BATCH = 10;
    for (let i = 0; i < toDelete.length; i += BATCH) {
      await Promise.allSettled(toDelete.slice(i, i + BATCH).map(deleteRestaurant));
    }
    setSelected(new Set());
    toast.success(`${toDelete.length} eliminado(s)`);
    setDeleting(false);
    fetchRestaurants();
  };

  // Delete all in a category
  const deleteCategory = async (category: string) => {
    const items = grouped[category] || [];
    if (items.length === 0) return;
    if (!confirm(`¿Eliminar ${items.length} restaurante(s) de "${category}"?`)) return;
    setDeleting(true);
    const BATCH = 10;
    for (let i = 0; i < items.length; i += BATCH) {
      await Promise.allSettled(items.slice(i, i + BATCH).map(deleteRestaurant));
    }
    toast.success(`${items.length} eliminado(s) de "${category}"`);
    setDeleting(false);
    fetchRestaurants();
  };

  // Select/deselect all in a category
  const toggleCategorySelection = (category: string) => {
    const items = grouped[category] || [];
    const allSelected = items.every(r => selected.has(r.id));
    setSelected(prev => {
      const next = new Set(prev);
      items.forEach(r => allSelected ? next.delete(r.id) : next.add(r.id));
      return next;
    });
  };

  // Select/deselect all
  const toggleSelectAll = () => {
    if (selected.size === restaurants.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(restaurants.map(r => r.id)));
    }
  };

  // Toggle collapse
  const toggleCollapse = (cat: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  // Reorder: move item up/down within its list
  const moveItem = async (id: string, direction: "up" | "down") => {
    const idx = restaurants.findIndex(r => r.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= restaurants.length) return;
    const a = restaurants[idx];
    const b = restaurants[swapIdx];
    await Promise.all([
      supabase.from("restaurants").update({ display_order: b.display_order }).eq("id", a.id),
      supabase.from("restaurants").update({ display_order: a.display_order }).eq("id", b.id),
    ]);
    fetchRestaurants();
  };

  // Reorder entire category up/down
  const moveCategoryItems = async (category: string, direction: "up" | "down") => {
    const items = grouped[category];
    if (!items || items.length === 0) return;
    const catIdx = categories.indexOf(category);
    const swapCat = direction === "up" ? categories[catIdx - 1] : categories[catIdx + 1];
    if (!swapCat) return;
    const swapItems = grouped[swapCat];
    // Swap display_order blocks
    const allItems = direction === "up"
      ? [...items, ...swapItems]
      : [...swapItems, ...items];
    const baseOrder = Math.min(...[...items, ...swapItems].map(r => r.display_order));
    const updates = allItems.map((r, i) =>
      supabase.from("restaurants").update({ display_order: baseOrder + i }).eq("id", r.id)
    );
    await Promise.all(updates);
    fetchRestaurants();
  };

  const renderItem = (r: Restaurant) => (
    <div key={r.id} className="flex items-center gap-2 bg-card border border-border rounded-lg p-2.5 group hover:border-wine/30 transition-colors">
      <input
        type="checkbox"
        checked={selected.has(r.id)}
        onChange={() => setSelected(prev => {
          const next = new Set(prev);
          next.has(r.id) ? next.delete(r.id) : next.add(r.id);
          return next;
        })}
        className="shrink-0 accent-wine"
      />

      <div className="flex gap-0.5 shrink-0">
        <button onClick={() => moveItem(r.id, "up")} className="p-0.5 rounded hover:bg-accent/10" title="Subir">
          <ArrowUp size={12} className="text-muted-foreground" />
        </button>
        <button onClick={() => moveItem(r.id, "down")} className="p-0.5 rounded hover:bg-accent/10" title="Bajar">
          <ArrowDown size={12} className="text-muted-foreground" />
        </button>
      </div>

      {r.logo_url ? (
        <img src={r.logo_url} alt={r.name} className="w-9 h-9 rounded-md object-contain bg-white/5 border border-border shrink-0" />
      ) : (
        <div className="w-9 h-9 rounded-md bg-wine/10 flex items-center justify-center shrink-0 text-wine font-heading font-bold text-xs">
          {r.name.charAt(0)}
        </div>
      )}

      <Input
        value={r.name}
        onChange={e => updateField(r.id, "name", e.target.value)}
        className="flex-1 h-8 text-sm bg-transparent border-transparent hover:border-border focus:border-ring"
      />

      <Input
        value={r.city || ""}
        onChange={e => updateField(r.id, "city", e.target.value)}
        placeholder="Ciudad"
        className="w-24 h-8 text-sm bg-transparent border-transparent hover:border-border focus:border-ring"
      />

      <Input
        value={r.category || ""}
        onChange={e => updateField(r.id, "category", e.target.value)}
        placeholder="Categoría"
        className="w-24 h-8 text-sm bg-transparent border-transparent hover:border-border focus:border-ring"
      />

      <button onClick={() => updateField(r.id, "featured", !r.featured)} className="p-1 rounded hover:bg-accent/10 transition-colors" title={r.featured ? "Quitar destacado" : "Destacar"}>
        {r.featured ? <Star size={14} className="text-accent fill-accent" /> : <StarOff size={14} className="text-muted-foreground/40" />}
      </button>

      <button onClick={() => updateField(r.id, "visible", !r.visible)} className="p-1 rounded hover:bg-accent/10 transition-colors" title={r.visible ? "Ocultar" : "Mostrar"}>
        {r.visible ? <Eye size={14} className="text-muted-foreground" /> : <EyeOff size={14} className="text-muted-foreground/40" />}
      </button>

      <button onClick={() => deleteSingle(r)} className="p-1 rounded hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100">
        <Trash2 size={14} className="text-destructive" />
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-heading font-bold">Restaurantes</h2>
          <p className="text-sm text-muted-foreground">{restaurants.length} restaurantes · {categories.length} categorías</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Label htmlFor="logo-upload" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
              <Upload size={14} /> {uploading ? "Subiendo..." : "Subir carpeta"}
            </div>
          </Label>
          <input id="logo-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} {...{ webkitdirectory: "", directory: "" } as any} />
          <Label htmlFor="logo-upload-files" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 border border-border text-foreground px-3 py-2 rounded-lg text-xs font-semibold hover:bg-accent/10 transition-opacity">
              <Upload size={14} /> Archivos
            </div>
          </Label>
          <input id="logo-upload-files" type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap bg-card border border-border rounded-lg p-2.5 text-xs">
        <button onClick={toggleSelectAll} className="px-2 py-1 rounded border border-border hover:bg-accent/10 transition-colors">
          {selected.size === restaurants.length && restaurants.length > 0 ? "Deseleccionar todo" : "Seleccionar todo"}
        </button>
        <button
          onClick={() => setGroupByCategory(!groupByCategory)}
          className={`px-2 py-1 rounded border transition-colors ${groupByCategory ? "border-wine/40 bg-wine/10 text-wine" : "border-border hover:bg-accent/10"}`}
        >
          <FolderOpen size={12} className="inline mr-1" />
          {groupByCategory ? "Agrupado" : "Lista plana"}
        </button>

        {selected.size > 0 && (
          <Button
            size="sm"
            variant="destructive"
            onClick={deleteSelected}
            disabled={deleting}
            className="ml-auto h-7 text-xs gap-1"
          >
            <Trash2 size={12} /> Eliminar {selected.size} seleccionado(s)
          </Button>
        )}

        {selected.size > 0 && (
          <button onClick={() => setSelected(new Set())} className="p-1 rounded hover:bg-accent/10">
            <X size={14} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Content */}
      {groupByCategory ? (
        categories.map(cat => {
          const items = grouped[cat];
          const isCollapsed = collapsedCategories.has(cat);
          const allSelected = items.every(r => selected.has(r.id));
          const someSelected = items.some(r => selected.has(r.id));

          return (
            <div key={cat} className="border border-border rounded-xl overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-2 bg-card/80 px-3 py-2 border-b border-border">
                <button onClick={() => toggleCollapse(cat)} className="p-0.5">
                  {isCollapsed ? <ChevronRight size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                <input
                  type="checkbox"
                  checked={allSelected && items.length > 0}
                  ref={el => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={() => toggleCategorySelection(cat)}
                  className="accent-wine"
                />
                <FolderOpen size={14} className="text-accent" />
                <span className="text-sm font-semibold flex-1">{cat}</span>
                <span className="text-xs text-muted-foreground">{items.length}</span>
                <div className="flex gap-0.5">
                  <button onClick={() => moveCategoryItems(cat, "up")} className="p-1 rounded hover:bg-accent/10" title="Mover categoría arriba">
                    <ArrowUp size={12} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => moveCategoryItems(cat, "down")} className="p-1 rounded hover:bg-accent/10" title="Mover categoría abajo">
                    <ArrowDown size={12} className="text-muted-foreground" />
                  </button>
                </div>
                <button
                  onClick={() => deleteCategory(cat)}
                  className="p-1 rounded hover:bg-destructive/10 transition-colors"
                  title={`Eliminar toda la categoría "${cat}"`}
                  disabled={deleting}
                >
                  <Trash2 size={14} className="text-destructive" />
                </button>
              </div>

              {/* Items */}
              {!isCollapsed && (
                <div className="space-y-1 p-2">
                  {items.map(renderItem)}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="space-y-1">
          {restaurants.map(renderItem)}
        </div>
      )}

      {restaurants.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Upload size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-medium">No hay restaurantes todavía</p>
          <p className="text-sm mt-1">Sube logos para empezar</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantsTab;
