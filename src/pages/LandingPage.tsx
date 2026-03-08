import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Layers, Terminal, Copy, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import CodeBlock from "@/components/CodeBlock";
import Dither from "@/components/Dither";

const features = [
  {
    icon: Zap,
    title: "Extreme Type Safety",
    desc: "End-to-end TypeScript inference. No manual casting, ever.",
  },
  {
    icon: Layers,
    title: "Tiered Middleware",
    desc: "Inject logic at global, service, or endpoint level.",
  },
  {
    icon: Shield,
    title: "Built-in Resilience",
    desc: "Retries, deduplication, and structured error handling.",
  },
  {
    icon: Terminal,
    title: "Framework Agnostic",
    desc: "Zero-dependency core. React, Svelte, and RN adapters.",
  },
];

const heroCode = `import { createApi } from "@simple-api/core";

export const api = createApi({
  baseUrl: "https://api.example.com",
  services: {
    users: {
      get: { method: "GET", path: "/users/:id" },
    },
  },
});

// Full type inference
const user = await api.users.get({ params: { id: "123" } });`;

const LandingPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install @simple-api/core");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav - floating glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto mt-4 px-4">
          <div className="flex items-center justify-between h-12 px-5 rounded-2xl border bg-card/40 backdrop-blur-xl">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-mono font-bold text-[10px]">S</span>
              </div>
              <span className="font-display font-bold text-sm">simple-api</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link to="/docs">
                <Button variant="ghost" size="sm" className="text-xs h-8">Docs</Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-xs h-8">GitHub</Button>
              </a>
              
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dither BG */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            colorNum={4}
            pixelSize={2}
            enableMouseInteraction={true}
            mouseRadius={0.35}
          />
          {/* Fade to next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6"
              >
                <span className="text-muted-foreground">THE TYPE-SAFE</span>
                <br />
                <span className="text-foreground">API CLIENT</span>
                <br />
                <span className="text-foreground">YOU DESERVE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="text-base text-muted-foreground max-w-md mb-10 leading-relaxed"
              >
                Stop wrestling with raw fetch. simple-api gives you a structured,
                service-oriented API layer with end-to-end type inference.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/docs">
                  <Button size="lg" className="gap-2 font-medium rounded-full px-8">
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>

                <button
                  onClick={copyInstall}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full border bg-card/40 backdrop-blur-md font-mono text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="text-accent">$</span>
                  <span>npm install @simple-api/core</span>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </motion.div>
            </div>

            {/* Right — code block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <CodeBlock language="typescript" filename="api.ts" code={heroCode} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative bg-background">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight mb-3">
              Built for production
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Everything you need to ship reliable, type-safe API integrations.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border bg-card p-5 hover:border-accent/30 transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors">
                  <f.icon className="h-4 w-4 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight mb-3">
              Modular by design
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Install only what you need. Every adapter is a separate package.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { pkg: "@simple-api/core", desc: "Engine & middleware library" },
              { pkg: "@simple-api/react", desc: "TanStack Query for React" },
              { pkg: "@simple-api/svelte", desc: "TanStack Query for Svelte" },
              { pkg: "@simple-api/zustand", desc: "Store synchronization" },
              { pkg: "@simple-api/react-native", desc: "Mobile-optimized adapter" },
            ].map((p, i) => (
              <motion.div
                key={p.pkg}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-lg border bg-card px-4 py-3 flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-sm font-medium truncate">{p.pkg}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-mono text-[10px] font-bold">S</span>
            </div>
            <span>simple-api</span>
          </div>
          <p>Built for developers who care about their network layer.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
