import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Upload, MapPin, Loader2, Brain, Copy, Share2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { complaints, CATEGORY_DEPT_MAP, type Category } from '@/data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const categories: Category[] = ['Road', 'Garbage', 'Water', 'Electricity', 'Safety', 'Transport', 'Sanitation', 'Other'];

const CRITICAL_KEYWORDS = ['fire', 'dangerous', 'school', 'children', 'death', 'emergency', 'collapse', 'accident'];

function LocationPicker({ position, setPosition }: { position: [number, number] | null; setPosition: (p: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const toRad = (d: number) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Submit() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Step 2
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');

  // Step 3
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState('');

  // AI result
  const [aiResult, setAiResult] = useState<any>(null);
  const [duplicate, setDuplicate] = useState<string | null>(null);
  const [complaintId] = useState(`CMP-2025-${String(Math.floor(Math.random() * 90000) + 10000)}`);

  const isCritical = CRITICAL_KEYWORDS.some(kw => description.toLowerCase().includes(kw) || title.toLowerCase().includes(kw));

  const handleSubmit = useCallback(() => {
    setLoading(true);

    // Check duplicates
    if (position && category) {
      const dup = complaints.find(c =>
        c.category === category &&
        getDistance(position[0], position[1], c.lat, c.lng) < 500
      );
      if (dup) setDuplicate(dup.id);
    }

    // Simulate AI classification
    setTimeout(() => {
      const confidence = Math.floor(Math.random() * 10) + 88;
      const sentiment = -(Math.random() * 0.6 + 0.3).toFixed(2);
      setAiResult({
        category: category || 'Road',
        confidence,
        priority: isCritical ? 'CRITICAL' : 'HIGH',
        sentiment: Number(sentiment),
        department: CATEGORY_DEPT_MAP[(category || 'Road') as Category],
      });
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  }, [position, category, isCritical]);

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setAddress('Current location detected');
        },
        () => {
          setPosition([12.9716, 77.6412]);
          setAddress('Indiranagar, Bengaluru (default)');
        }
      );
    }
  };

  const steps = [
    { num: 1, label: 'Your Details' },
    { num: 2, label: 'Complaint Details' },
    { num: 3, label: 'Location' },
  ];

  if (submitted && aiResult) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-2xl">
          <Card className="border-success/30">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Complaint Submitted Successfully!</h2>
              <div className="text-4xl font-extrabold text-primary my-6 font-mono">{complaintId}</div>

              <Card className="bg-muted/50 mb-6">
                <CardContent className="p-4 text-left space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">AI Classification Result</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{aiResult.category}</span>
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{aiResult.confidence}%</span>
                    <span className="text-muted-foreground">Priority:</span>
                    <Badge className={aiResult.priority === 'CRITICAL' ? 'bg-critical text-critical-foreground' : 'bg-accent text-accent-foreground'}>
                      {aiResult.priority}
                    </Badge>
                    <span className="text-muted-foreground">Sentiment:</span>
                    <span className="font-medium">Negative ({aiResult.sentiment})</span>
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium">{aiResult.department}</span>
                  </div>
                </CardContent>
              </Card>

              {isCritical && (
                <div className="bg-critical/10 border border-critical/30 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-semibold text-critical">⚠️ CRITICAL PRIORITY: This complaint has been auto-flagged for immediate attention due to safety-related keywords detected.</p>
                </div>
              )}

              {duplicate && (
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-warning font-medium">
                    🔗 Similar issue already reported ({duplicate}). Your report has been linked to increase priority.
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(complaintId)}>
                  <Copy className="h-4 w-4 mr-1" /> Copy ID
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
                <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Submit a Complaint</h1>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                step > s.num ? "bg-success text-success-foreground" :
                step === s.num ? "bg-accent text-accent-foreground" :
                "bg-muted text-muted-foreground"
              )}>
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </div>
              <span className={cn("ml-2 text-sm font-medium hidden sm:inline", step >= s.num ? "text-foreground" : "text-muted-foreground")}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className={cn("w-12 sm:w-20 h-0.5 mx-3", step > s.num ? "bg-success" : "bg-border")} />}
            </div>
          ))}
        </div>

        {isCritical && step === 2 && (
          <div className="bg-critical/10 border border-critical/30 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-critical">⚠️ CRITICAL keywords detected! This complaint will be auto-flagged as CRITICAL priority.</p>
          </div>
        )}

        <Card>
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Mobile Number *</label>
                  <div className="flex gap-2">
                    <Input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 9876543210" className="flex-1" />
                    <Button
                      variant="outline"
                      onClick={() => setOtpSent(true)}
                      disabled={otpSent || mobile.length < 10}
                      className={otpSent ? "text-success border-success" : ""}
                    >
                      {otpSent ? <><Check className="h-4 w-4 mr-1" /> Verified</> : 'Send OTP'}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email (optional)</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" />
                </div>
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setStep(2)}
                  disabled={!name || !mobile}
                >
                  Next: Complaint Details
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Complaint Title *</label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief title of your complaint" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Description *</label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={4} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Category *</label>
                  <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Photo Upload</label>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                      dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                    )}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); setFileName(e.dataTransfer.files[0]?.name || 'photo.jpg'); }}
                    onClick={() => { setFileName('complaint_photo.jpg'); }}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    {fileName ? (
                      <p className="text-sm text-success font-medium">{fileName} selected</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setStep(3)}
                    disabled={!title || !description || !category}
                  >
                    Next: Location
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Select Location *</label>
                  <Button variant="outline" size="sm" onClick={handleUseLocation}>
                    <MapPin className="h-4 w-4 mr-1" /> Use my location
                  </Button>
                </div>
                <div className="h-64 rounded-lg overflow-hidden border">
                  <MapContainer
                    center={[12.9716, 77.6412]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OSM" />
                    <LocationPicker position={position} setPosition={setPosition} />
                  </MapContainer>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Address</label>
                  <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address or use map above" />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={handleSubmit}
                    disabled={loading || !position}
                  >
                    {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /><Brain className="h-4 w-4 mr-1" /> AI Processing...</> : 'Submit Complaint'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
