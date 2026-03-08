import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Trash2, Search } from "lucide-react";

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

interface LeadsTabProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onExport: () => void;
}

const LeadsTab = ({ leads, onDelete, onExport }: LeadsTabProps) => {
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l => {
    if (filterType !== "all" && l.form_type !== filterType) return false;
    if (search) {
      const q = search.toLowerCase();
      return [l.name, l.email, l.restaurant, l.city, l.phone].some(f => f?.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-background border-border"
          />
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground"
        >
          <option value="all">Todos ({leads.length})</option>
          <option value="demo">Demo ({leads.filter(l => l.form_type === "demo").length})</option>
          <option value="contacto">Contacto ({leads.filter(l => l.form_type === "contacto").length})</option>
        </select>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" /> Exportar CSV
        </Button>
      </div>
      <div className="space-y-3">
        {filtered.map(lead => (
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
                  {lead.position && <p>👤 {lead.position}</p>}
                  {lead.references_count && <p>📊 {lead.references_count} referencias</p>}
                  {lead.menu_link && <p>🔗 <a href={lead.menu_link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{lead.menu_link}</a></p>}
                  {lead.message && <p className="mt-2 text-foreground/70 italic">"{lead.message}"</p>}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onDelete(lead.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            {search || filterType !== "all" ? "No se encontraron leads con estos filtros." : "No hay leads todavía."}
          </p>
        )}
      </div>
    </>
  );
};

export default LeadsTab;
