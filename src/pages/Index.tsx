import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, AlertTriangle, Copy, MapPin, Bell, MessageCircle, ArrowRight, FileText, CheckCircle2, Building2, Timer, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const heroPhrases = [
  { line1: "Your Voice,", line2: "Smarter Governance." },
  { line1: "Your Voice,", line2: "Faster Resolutions." },
  { line1: "Report Today.", line2: "Resolved in 7 Days." },
  { line1: "Turning Complaints into", line2: "Quick Action." },
  { line1: "Smart Complaints.", line2: "Faster Solutions." },
  { line1: "Your Complaint, Our Priority —", line2: "Solved in 7 Days." },
  { line1: "Speak Up.", line2: "We Act Fast." },
  { line1: "Transparent Complaints.", line2: "Trusted Governance." },
  { line1: "From Complaint to Resolution —", line2: "Within 7 Days." },
  { line1: "Empowering Citizens,", line2: "Fixing Problems Faster." }
];

const WordAnimation = ({ line1, line2 }: { line1: string, line2: string }) => {
  const words1 = line1.split(" ");
  const words2 = line2.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 12, stiffness: 100 } }
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight"
    >
      <div className="block">
        {words1.map((w, i) => (
          <motion.span key={`l1-${w}-${i}`} variants={wordVariant} className="inline-block mr-[0.25em]">
            {w}
          </motion.span>
        ))}
      </div>
      <div className="block mt-1 md:mt-2">
        {words2.map((w, i) => (
          <motion.span key={`l2-${w}-${i}`} variants={wordVariant} className="inline-block mr-[0.25em] text-accent">
            {w}
          </motion.span>
        ))}
      </div>
    </motion.h1>
  );
};

function AnimatedCounter({ end, duration = 2000, suffix = '', continueIncrementing = true }: { end: number; duration?: number; suffix?: string; continueIncrementing?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    let isFinished = false;

    const timer = setInterval(() => {
      if (!isFinished) {
        start += increment;
        if (start >= end) {
          setCount(end);
          isFinished = true;
        } else {
          setCount(Math.floor(start));
        }
      } else if (continueIncrementing && Math.random() > 0.95) {
        // Slowly randomly increment occasionally to simulate real-time activity
        if (Number.isInteger(end)) {
          setCount(prev => prev + 1);
        } else {
          // Increment decimals by a small fraction (e.g. 0.1)
          setCount(prev => prev + 0.1);
        }
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, continueIncrementing]);

  const displayCount = Number.isInteger(end) ? count : count.toFixed(1);
  return <span>{Number(displayCount).toLocaleString('en-IN', {
    minimumFractionDigits: Number.isInteger(end) ? 0 : 1,
    maximumFractionDigits: Number.isInteger(end) ? 0 : 1
  })}{suffix}</span>;
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
  { label: 'Total Complaints Filed', value: 24581, icon: PieChart, color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
  { label: 'Resolved This Month', value: 3847, icon: CheckCircle2, color: 'from-emerald-500 to-green-400', bg: 'bg-emerald-500/10' },
  { label: 'Departments Active', value: 27, icon: Building2, color: 'from-orange-500 to-amber-400', bg: 'bg-orange-500/10', continueIncrementing: false },
  { label: 'Avg Resolution Time', value: 3.2, suffix: ' Days', isDecimal: true, icon: Timer, color: 'from-purple-500 to-pink-400', bg: 'bg-purple-500/10', continueIncrementing: false },
];

const Index = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            <p>© 2025 Saarthi — Smart Public Service Governance. Built for Indian cities.</p>
            <p className="mt-1">A prototype for digital governance transformation.</p>
          </div>
        </footer>
      </div>
  );
};

export default Index;
