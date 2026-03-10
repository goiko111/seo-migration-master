import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, Trash2, GripVertical, Eye, EyeOff, Star, StarOff } from "lucide-react";

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

  const fetchRestaurants = useCallback(async () => {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setRestaurants(data as Restaurant[]);
  }, []);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    // Filter only image files (webkitdirectory includes all files from subfolders)
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
    if (!confirm(`¿Eliminar ${r.name}?`)) return;
    if (r.logo_url) {
      const path = r.logo_url.split("/restaurant-logos/")[1];
      if (path) await supabase.storage.from(BUCKET).remove([path]);
    }
    await supabase.from("restaurants").delete().eq("id", r.id);
    toast.success("Eliminado");
    fetchRestaurants();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold">Restaurantes</h2>
          <p className="text-sm text-muted-foreground">{restaurants.length} restaurantes · Sube logos para mostrarlos en /clientes</p>
        </div>
        <div>
          <Label htmlFor="logo-upload" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              <Upload size={16} /> {uploading ? "Subiendo..." : "Subir carpeta"}
            </div>
          </Label>
          <input
            id="logo-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
            {...{ webkitdirectory: "", directory: "" } as any}
          />
          <Label htmlFor="logo-upload-files" className="cursor-pointer ml-2">
            <div className="inline-flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/10 transition-opacity">
              <Upload size={16} /> Subir archivos
            </div>
          </Label>
          <input
            id="logo-upload-files"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground bg-card border border-border rounded-lg p-3">
        💡 Sube múltiples logos a la vez. El nombre del archivo se usará como nombre del restaurante (puedes editarlo después).
      </p>

      <div className="space-y-2">
        {restaurants.map(r => (
          <div key={r.id} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 group hover:border-wine/30 transition-colors">
            <GripVertical size={16} className="text-muted-foreground/40 shrink-0" />

            {r.logo_url ? (
              <img
                src={r.logo_url}
                alt={r.name}
                className="w-10 h-10 rounded-md object-contain bg-white/5 border border-border shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-md bg-wine/10 flex items-center justify-center shrink-0 text-wine font-heading font-bold">
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
              className="w-28 h-8 text-sm bg-transparent border-transparent hover:border-border focus:border-ring"
            />

            <Input
              value={r.category || ""}
              onChange={e => updateField(r.id, "category", e.target.value)}
              placeholder="Categoría"
              className="w-28 h-8 text-sm bg-transparent border-transparent hover:border-border focus:border-ring"
            />

            <button
              onClick={() => updateField(r.id, "featured", !r.featured)}
              className="p-1.5 rounded hover:bg-accent/10 transition-colors"
              title={r.featured ? "Quitar destacado" : "Destacar"}
            >
              {r.featured ? <Star size={16} className="text-accent fill-accent" /> : <StarOff size={16} className="text-muted-foreground/40" />}
            </button>

            <button
              onClick={() => updateField(r.id, "visible", !r.visible)}
              className="p-1.5 rounded hover:bg-accent/10 transition-colors"
              title={r.visible ? "Ocultar" : "Mostrar"}
            >
              {r.visible ? <Eye size={16} className="text-muted-foreground" /> : <EyeOff size={16} className="text-muted-foreground/40" />}
            </button>

            <button
              onClick={() => deleteRestaurant(r)}
              className="p-1.5 rounded hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={16} className="text-destructive" />
            </button>
          </div>
        ))}

        {restaurants.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Upload size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay restaurantes todavía</p>
            <p className="text-sm mt-1">Sube logos para empezar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsTab;
