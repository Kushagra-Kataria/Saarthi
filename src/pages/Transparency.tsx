import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, FileText, CheckCircle2, Clock, Users } from 'lucide-react';
import { departments, complaints } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Transparency() {
  const totalComplaints = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const pending = totalComplaints - resolved;
  const avgTime = 3.2;

  const stats = [
    { label: 'Total Complaints', value: totalComplaints, icon: FileText },
    { label: 'Resolved', value: resolved, icon: CheckCircle2 },
    { label: 'Pending', value: pending, icon: Clock },
    { label: 'Avg Resolution', value: `${avgTime} Days`, icon: Users },
  ];

  const sortedDepts = [...departments].sort((a, b) => (b.resolved / b.assigned) - (a.resolved / a.assigned));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-8">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/70 tracking-wider">PUBLIC TRANSPARENCY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Bengaluru City Grievance Scorecard — <span className="text-accent">Live</span>
          </h1>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <s.icon className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Resolution Rate</TableHead>
                  <TableHead>Avg Time</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDepts.map((d, i) => {
                  const rate = Math.round((d.resolved / d.assigned) * 100);
                  const isExcellent = rate >= 80 && d.rating >= 4.0;
                  const needsWork = rate < 60 || d.rating < 3.0;
                  return (
                    <TableRow key={d.name}>
                      <TableCell className="font-bold text-lg text-muted-foreground">#{i + 1}</TableCell>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={rate} className="h-2 w-24" />
                          <span className="text-sm font-medium">{rate}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{d.avgTime} days</TableCell>
                      <TableCell>
                        <span className="text-warning">{'★'.repeat(Math.round(d.rating))}{'☆'.repeat(5 - Math.round(d.rating))}</span>
                        <span className="text-xs text-muted-foreground ml-1">({d.rating})</span>
                      </TableCell>
                      <TableCell>
                        {isExcellent ? (
                          <Badge className="bg-success/20 text-success text-xs">Excellent</Badge>
                        ) : needsWork ? (
                          <Badge className="bg-critical/20 text-critical text-xs">Needs Improvement</Badge>
                        ) : (
                          <Badge className="bg-warning/20 text-warning text-xs">Good</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-muted-foreground py-4">
          <p>Data updated in real-time. Powered by Saarthi Smart Governance Platform.</p>
        </footer>
      </div>
    </div>
  );
}
