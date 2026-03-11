import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Check, Clock, AlertTriangle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATUS_COLORS, PRIORITY_COLORS, type Status, type Complaint } from '@/data/mockData';

const API_BASE = 'http://localhost:8000';
const STATUS_ORDER: Status[] = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'];

export default function Track() {
  const [searchId, setSearchId] = useState('');
  const [mobile, setMobile] = useState('');
  const [found, setFound] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/complaints/${encodeURIComponent(searchId)}`);
      if (response.ok) {
        const data = await response.json();
        setFound(data);
        setNotFound(false);
      } else {
        setFound(null);
        setNotFound(true);
      }
    } catch (err) {
      console.error('Track error:', err);
      setFound(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Track Your Complaint</h1>
        <p className="text-muted-foreground text-center mb-8">Enter your Complaint ID to view real-time status updates.</p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-3">
              <Input value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Complaint ID (e.g. CMP-2025-00001)" onKeyDown={e => e.key === 'Enter' && handleSearch()} />
              <Input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Registered mobile number" />
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSearch} disabled={!searchId}>
                <Search className="h-4 w-4 mr-2" /> Track Complaint
              </Button>
            </div>
          </CardContent>
        </Card>

        {notFound && (
          <Card className="border-destructive/30">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <p className="text-destructive font-medium">No complaint found with ID "{searchId}"</p>
              <p className="text-sm text-muted-foreground mt-1">Please check the ID and try again.</p>
            </CardContent>
          </Card>
        )}

        {found && (
          <div className="space-y-6">
            {/* Detail card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-mono text-muted-foreground">{found.id}</p>
                    <CardTitle className="text-xl mt-1">{found.title}</CardTitle>
                  </div>
                  <Badge className={cn(PRIORITY_COLORS[found.priority], 'text-xs')}>{found.priority}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline" className="ml-2">{found.category}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={cn(STATUS_COLORS[found.status], 'ml-2 text-xs')}>{found.status}</Badge>
                  </div>
                  <div><span className="text-muted-foreground">Department:</span> <span className="font-medium ml-1">{found.department}</span></div>
                  <div><span className="text-muted-foreground">Submitted:</span> <span className="font-medium ml-1">{new Date(found.created).toLocaleDateString('en-IN')}</span></div>
                </div>
                <p className="text-sm text-muted-foreground">{found.description}</p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Status Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="relative">
                  {STATUS_ORDER.map((status, i) => {
                    const event = found.timeline.find(t => t.status === status);
                    const currentIdx = STATUS_ORDER.indexOf(found.status);
                    const isDone = i <= currentIdx && event;
                    const isActive = status === found.status;
                    const isPending = i > currentIdx;

                    return (
                      <div key={status} className="flex gap-4 pb-6 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                            isDone && !isActive ? "bg-success text-success-foreground" :
                            isActive ? "bg-accent text-accent-foreground ring-4 ring-accent/20" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {isDone && !isActive ? <Check className="h-4 w-4" /> :
                             isActive ? <Clock className="h-4 w-4" /> :
                             <span>{i + 1}</span>}
                          </div>
                          {i < STATUS_ORDER.length - 1 && (
                            <div className={cn("w-0.5 flex-1 mt-1", isDone ? "bg-success" : "bg-border")} />
                          )}
                        </div>
                        <div className="pb-2">
                          <p className={cn("text-sm font-semibold", isPending ? "text-muted-foreground" : "text-foreground")}>{status}</p>
                          {event ? (
                            <>
                              <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleString('en-IN')}</p>
                              <p className="text-sm text-muted-foreground mt-1">{event.note}</p>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">Pending</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            {found.feedback && (
              <Card className="border-success/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-warning" />
                    <span className="text-sm font-semibold">Citizen Feedback</span>
                    {found.rating && <span className="text-sm text-warning">{'★'.repeat(found.rating)}{'☆'.repeat(5 - found.rating)}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{found.feedback}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
