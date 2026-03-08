import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Lead {
  id: string;
  form_type: string;
  created_at: string;
}

interface AnalyticsTabProps {
  leads: Lead[];
}

const COLORS = ["hsl(348, 68%, 32%)", "hsl(40, 50%, 55%)", "hsl(200, 60%, 50%)", "hsl(150, 50%, 45%)"];

const AnalyticsTab = ({ leads }: AnalyticsTabProps) => {
  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    const now = new Date();
    // Last 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      map[d.toISOString().slice(0, 10)] = 0;
    }
    leads.forEach((l) => {
      const day = l.created_at.slice(0, 10);
      if (map[day] !== undefined) map[day]++;
    });
    return Object.entries(map).map(([date, count]) => ({
      date: date.slice(5), // MM-DD
      leads: count,
    }));
  }, [leads]);

  const byType = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      map[l.form_type] = (map[l.form_type] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const thisWeek = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return leads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  }, [leads]);

  const thisMonth = useMemo(() => {
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return leads.filter((l) => new Date(l.created_at) >= monthAgo).length;
  }, [leads]);

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total leads", value: leads.length },
          { label: "Últimos 30 días", value: thisMonth },
          { label: "Últimos 7 días", value: thisWeek },
          { label: "Tipos de formulario", value: byType.length },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-lg p-5 text-center">
            <p className="text-3xl font-bold font-heading text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Leads últimos 30 días</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(40,10%,55%)" }} interval="preserveStartEnd" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(40,10%,55%)" }} />
              <Tooltip
                contentStyle={{ background: "hsl(0,0%,7%)", border: "1px solid hsl(0,0%,15%)", borderRadius: 8, fontSize: 13 }}
                labelStyle={{ color: "hsl(40,20%,92%)" }}
              />
              <Bar dataKey="leads" fill="hsl(348,68%,32%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Por tipo</h3>
          {byType.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={byType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {byType.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                {byType.map((t, i) => (
                  <span key={t.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    {t.name} ({t.value})
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Sin datos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
