import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, Clock, CheckCircle2, Users, Eye, UserCheck, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { complaints, departments, getCategoryData, getStatusData, getDailyVolumeData, STATUS_COLORS, PRIORITY_COLORS } from '@/data/mockData';

const CHART_COLORS = ['hsl(210,53%,23%)', 'hsl(27,91%,54%)', 'hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(0,84%,50%)', 'hsl(210,30%,60%)', 'hsl(270,50%,50%)', 'hsl(180,50%,40%)'];
const STATUS_CHART_COLORS = ['hsl(210,20%,70%)', 'hsl(38,92%,50%)', 'hsl(210,53%,23%)', 'hsl(27,91%,54%)', 'hsl(142,71%,35%)'];

export default function Admin() {
  const categoryData = useMemo(() => getCategoryData(), []);
  const statusData = useMemo(() => getStatusData(), []);
  const dailyData = useMemo(() => getDailyVolumeData(), []);

  const openCount = complaints.filter(c => c.status !== 'Resolved').length;
  const criticalCount = complaints.filter(c => c.priority === 'CRITICAL' && c.status !== 'Resolved').length;
  const avgTime = 3.2;
  const satisfaction = 4.1;

  const kpis = [
    { title: 'Total Open', value: openCount, icon: AlertTriangle, color: 'text-accent' },
    { title: 'Critical Pending', value: criticalCount, icon: Clock, color: 'text-critical' },
    { title: 'Avg Resolution', value: `${avgTime} days`, icon: CheckCircle2, color: 'text-success' },
    { title: 'Satisfaction', value: `${satisfaction}/5`, icon: Users, color: 'text-primary' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(k => (
            <Card key={k.title}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-muted", k.color)}>
                  <k.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Complaints by Category</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Daily Volume (30 days)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} interval={4} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="complaints" stroke="hsl(27,91%,54%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Status Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                    {statusData.map((_, i) => <Cell key={i} fill={STATUS_CHART_COLORS[i % STATUS_CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Priority Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Priority Queue</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SLA Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints
                  .filter(c => c.status !== 'Resolved')
                  .sort((a, b) => {
                    const order = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
                    return order[a.priority] - order[b.priority];
                  })
                  .slice(0, 10)
                  .map(c => {
                    const sla = new Date(c.created);
                    sla.setDate(sla.getDate() + (c.priority === 'CRITICAL' ? 1 : c.priority === 'HIGH' ? 3 : 7));
                    const overdue = sla < new Date();
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-mono text-xs">{c.id}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-sm">{c.title}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">{c.category}</Badge></TableCell>
                        <TableCell><Badge className={cn(PRIORITY_COLORS[c.priority], 'text-xs')}>{c.priority}</Badge></TableCell>
                        <TableCell className="text-sm">{c.department}</TableCell>
                        <TableCell><Badge className={cn(STATUS_COLORS[c.status], 'text-xs')}>{c.status}</Badge></TableCell>
                        <TableCell className={cn("text-xs font-mono", overdue && "text-critical font-bold")}>
                          {sla.toLocaleDateString('en-IN')}
                          {overdue && ' ⚠️'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 text-xs"><Eye className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs"><UserCheck className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs"><CircleCheck className="h-3 w-3" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Department Performance</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Resolved</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Avg Time</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map(d => {
                  const pct = Math.round((d.resolved / d.assigned) * 100);
                  return (
                    <TableRow key={d.name}>
                      <TableCell className="font-medium text-sm">{d.shortName}</TableCell>
                      <TableCell>{d.assigned}</TableCell>
                      <TableCell>{d.resolved}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-2 w-20" />
                          <span className="text-xs text-muted-foreground">{pct}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{d.avgTime}d</TableCell>
                      <TableCell>
                        <span className="text-sm text-warning">{'★'.repeat(Math.round(d.rating))}{'☆'.repeat(5 - Math.round(d.rating))}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
