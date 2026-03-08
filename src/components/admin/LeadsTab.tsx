import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

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

const LeadsTab = ({ leads, onDelete, onExport }: LeadsTabProps) => (
  <>
    <div className="flex items-center gap-4 mb-6">
      <Button variant="outline" onClick={onExport}>
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
            <Button variant="ghost" size="icon" onClick={() => onDelete(lead.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
      {leads.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No hay leads todavía.</p>
      )}
    </div>
  </>
);

export default LeadsTab;
