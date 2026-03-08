import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { complaints, type Category, type Priority } from '@/data/mockData';
import 'leaflet/dist/leaflet.css';

const HEAT_COLORS = ['hsl(210,53%,23%)', 'hsl(27,91%,54%)', 'hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(0,84%,50%)'];
const categories: Category[] = ['Road', 'Garbage', 'Water', 'Electricity', 'Safety', 'Transport', 'Sanitation', 'Other'];
const priorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

function HeatLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();
  const layerRef = useRef<any>(null);

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }
    // @ts-ignore - leaflet.heat typing
    if ((L as any).heatLayer) {
      layerRef.current = (L as any).heatLayer(points, {
        radius: 25,
        blur: 20,
        maxZoom: 17,
        gradient: { 0.2: 'blue', 0.4: 'lime', 0.6: 'yellow', 0.8: 'orange', 1.0: 'red' },
      }).addTo(map);
    }
    return () => {
      if (layerRef.current) map.removeLayer(layerRef.current);
    };
  }, [map, points]);

  return null;
}

export default function HeatmapPage() {
  const [selCategories, setSelCategories] = useState<Set<Category>>(new Set(categories));
  const [selPriorities, setSelPriorities] = useState<Set<Priority>>(new Set(priorities));

  const filtered = complaints.filter(c => selCategories.has(c.category) && selPriorities.has(c.priority));
  const heatPoints: [number, number, number][] = filtered.map(c => [c.lat, c.lng, c.priority === 'CRITICAL' ? 1 : c.priority === 'HIGH' ? 0.7 : 0.4]);

  const catBreakdown = categories.map(cat => ({
    name: cat,
    value: filtered.filter(c => c.category === cat).length,
  })).filter(x => x.value > 0);

  // Hotspot zones
  const zones = [
    { name: 'Indiranagar', count: filtered.filter(c => c.lat > 12.96 && c.lat < 12.98 && c.lng > 77.63 && c.lng < 77.65).length },
    { name: 'Koramangala', count: filtered.filter(c => c.lat > 12.92 && c.lat < 12.94 && c.lng > 77.61 && c.lng < 77.63).length },
    { name: 'Whitefield', count: filtered.filter(c => c.lat > 12.96 && c.lat < 12.98 && c.lng > 77.74 && c.lng < 77.76).length },
    { name: 'Hebbal', count: filtered.filter(c => c.lat > 13.02 && c.lat < 13.05 && c.lng > 77.58 && c.lng < 77.61).length },
    { name: 'Malleshwaram', count: filtered.filter(c => c.lat > 12.99 && c.lat < 13.01 && c.lng > 77.56 && c.lng < 77.58).length },
  ].sort((a, b) => b.count - a.count);

  const toggleCat = (cat: Category) => {
    const s = new Set(selCategories);
    s.has(cat) ? s.delete(cat) : s.add(cat);
    setSelCategories(s);
  };

  const togglePri = (pri: Priority) => {
    const s = new Set(selPriorities);
    s.has(pri) ? s.delete(pri) : s.add(pri);
    setSelPriorities(s);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Left filters */}
        <div className="w-full lg:w-64 border-r bg-card p-4 overflow-y-auto space-y-4">
          <h3 className="font-semibold text-sm text-foreground">Filters</h3>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Category</p>
            {categories.map(cat => (
              <div key={cat} className="flex items-center gap-2 mb-1">
                <Checkbox checked={selCategories.has(cat)} onCheckedChange={() => toggleCat(cat)} id={`cat-${cat}`} />
                <label htmlFor={`cat-${cat}`} className="text-sm">{cat}</label>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Priority</p>
            {priorities.map(pri => (
              <div key={pri} className="flex items-center gap-2 mb-1">
                <Checkbox checked={selPriorities.has(pri)} onCheckedChange={() => togglePri(pri)} id={`pri-${pri}`} />
                <label htmlFor={`pri-${pri}`} className="text-sm">{pri}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer center={[12.9716, 77.6412]} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OSM" />
            <HeatLayer points={heatPoints} />
          </MapContainer>
        </div>

        {/* Right stats */}
        <div className="w-full lg:w-72 border-l bg-card p-4 overflow-y-auto space-y-4">
          <h3 className="font-semibold text-sm text-foreground">Stats</h3>

          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Total in View</p>
              <p className="text-2xl font-bold text-foreground">{filtered.length}</p>
            </CardContent>
          </Card>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Top Hotspot Zones</p>
            {zones.slice(0, 5).map((z, i) => (
              <div key={z.name} className="flex items-center justify-between text-sm py-1">
                <span className="text-muted-foreground">{i + 1}. {z.name}</span>
                <Badge variant="outline" className="text-xs">{z.count}</Badge>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Category Breakdown</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={catBreakdown} cx="50%" cy="50%" outerRadius={60} dataKey="value" label={({ name }) => name}>
                  {catBreakdown.map((_, i) => <Cell key={i} fill={HEAT_COLORS[i % HEAT_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
