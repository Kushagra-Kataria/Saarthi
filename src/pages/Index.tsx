import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Copy, MapPin, Bell, MessageCircle, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString('en-IN')}{suffix}</span>;
}

const features = [
  { icon: Brain, title: 'AI Auto-Classification', desc: 'Complaints are automatically categorized using NLP, reducing manual sorting by 85%.' },
  { icon: AlertTriangle, title: 'Priority Detection', desc: 'Critical keywords trigger automatic high-priority flags and immediate department alerts.' },
  { icon: Copy, title: 'Duplicate Detection', desc: 'GPS-based matching links similar complaints within 500m radius to boost resolution priority.' },
  { icon: MapPin, title: 'Heatmap Analytics', desc: 'Real-time geographic visualization of complaint density across city zones and wards.' },
  { icon: Bell, title: 'Crisis Alerts', desc: 'Automated crisis detection when complaint clusters spike in a zone within 24 hours.' },
  { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Citizens can file and track complaints directly via WhatsApp bot in multiple languages.' },
];

const stats = [
  { label: 'Total Complaints Filed', value: 24581 },
  { label: 'Resolved This Month', value: 3847 },
  { label: 'Departments Active', value: 12 },
  { label: 'Avg Resolution Time', value: 3.2, suffix: ' Days', isDecimal: true },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight"
          >
            Your Voice,<br />
            <span className="text-accent">Smarter Governance.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10"
          >
            Submit complaints, track real-time resolution, and hold departments accountable — powered by AI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
              <Link to="/submit">
                <FileText className="mr-2 h-5 w-5" />
                Submit a Complaint
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 bg-transparent">
              <Link to="/track">
                Track Your Complaint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.6 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-primary">
                  {stat.isDecimal ? (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix || ''} />
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">AI-Powered Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with cutting-edge technology to transform public service delivery.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 PS-CRM — Smart Public Service CRM. Built for Indian cities.</p>
          <p className="mt-1">A prototype for digital governance transformation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
