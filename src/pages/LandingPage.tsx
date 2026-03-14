import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Terminal,
  Copy,
  Check,
  ChevronRight,
  Cpu,
  Workflow,
  Network,
  Repeat,
  Globe,
  Smartphone,
  Box,
  Key,
  Infinity,
  Code2,
  FileCode,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import CodeBlock from "@/components/CodeBlock";
import RippleGrid from "@/components/RippleGrid";

const features = [
  {
    icon: Zap,
    title: "Always Typed",
    desc: "Your data is automatically typed from request to response. It just works.",
  },
  {
    icon: Layers,
    title: "Rules at Every Level",
    desc: "Add logic to your whole app, a single service, or just one endpoint.",
  },
  {
    icon: Shield,
    title: "Reliable by Design",
    desc: "Built in retries and smart error handling for messy connections.",
  },
  {
    icon: Terminal,
    title: "Works Everywhere",
    desc: "Use it with React, Svelte, or React Native. No extra weight.",
  },
];

const enterpriseFeatures = [
  {
    title: "Global Hooks",
    desc: "Catch every request and response in one place for auth or tracking.",
    icon: Infinity,
  },
  {
    title: "Auto-Lists",
    desc: "Simple helpers to handle 'load more' and lists without the headache.",
    icon: Repeat,
  },
  {
    title: "Auto-Refresh",
    desc: "Keep data fresh by fetching in the background with smart timing.",
    icon: Network,
  },
  {
    title: "Offline First",
    desc: "Show data instantly from the cache while updating in the background.",
    icon: Globe,
  },
  {
    title: "Dev Tools",
    desc: "Turn your API specification files into working code in seconds.",
    icon: Terminal,
  },
  {
    title: "Slow-Sync",
    desc: "Saves updates and retries them automatically when you're back online.",
    icon: Smartphone,
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

const cliCode = `# Scaffold from OpenAPI
npx simple-api init --source ./swagger.json

# Export to Postman
npx simple-api export --format postman`;

const LandingPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install @simple-api/core");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Nav - floating glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <div className="flex items-center justify-between h-12 px-5 rounded-none border bg-card/40 backdrop-blur-xl">
            <Link to="/" className="flex items-center gap-1">
              <img
                src="/simplewhite.png"
                alt="simple-api logo"
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-white font-bold text-base">
                simple-api
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link to="/docs">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 text-white"
                >
                  Docs
                </Button>
              </Link>
              <a
                href="https://github.com/ElnatanSamuel/simple-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 text-white"
                >
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* RippleGrid BG */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <RippleGrid
            gridColor="#eff6ff"
            rippleIntensity={0.01}
            gridThickness={7}
            vignetteStrength={2}
            glowIntensity={0.01}
            opacity={0.4}
            gridRotation={137}
            mouseInteractionRadius={10}
            fadeDistance={10}
            gridSize={10}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(var(--background)))",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display text-3xl sm:text-6xl lg:text-5xl font-bold tracking-tighter leading-[0.95] mb-6"
              >
                THE TYPE-SAFE
                <br />
                API CLIENT
                <br />
                YOU DESERVE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="text-base text-foreground max-w-md mb-10 leading-relaxed"
              >
                Stop wrestling with raw fetch. simple-api gives you a
                structured, organized way to handle data with automatic types.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/docs">
                  <Button
                    size="sm"
                    className="gap-2 font-medium rounded-none px-8"
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>

                <button
                  onClick={copyInstall}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-none border bg-card backdrop-blur-md font-mono text-sm text-foreground hover:border-foreground/40 transition-colors group"
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <CodeBlock
                language="typescript"
                filename="api.ts"
                code={heroCode}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative bg-background py-24 border-y overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight mb-4">
              Built for Production
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Everything you need to ship reliable API integrations without the
              manual work.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-none border bg-card/50 p-6 hover:border-foreground/20 transition-all hover:bg-card group"
              >
                <div className="h-10 w-10 rounded-none bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors">
                  <f.icon className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className=""
            >
              <h2 className="font-display mb-2 text-4xl font-bold tracking-tighter leading-none">
                A Unified
                <br />
                Architecture.
              </h2>
              <p className="text-lg mb-4 text-foreground leading-relaxed max-w-md">
                simple-api makes sure your network layer is the most organized
                part of your app.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Organized Groups",
                    desc: "Put your endpoints into logical folders.",
                  },
                  {
                    title: "Shared Info",
                    desc: "Keep tokens and headers in one place.",
                  },
                  {
                    title: "Step-by-Step Logic",
                    desc: "Add rules that run in order for every call.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-6 w-6 mt-2 rounded-none border border-foreground/20 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-foreground/5 blur-3xl rounded-none" />
              <div className="relative rounded-none border bg-card p-1 shadow-2xl">
                <div className="bg-background rounded-none p-6 space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-sm font-bold uppercase tracking-widest">
                      Pipeline Comparison
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-8 text-xs font-mono">
                    <div className="space-y-3">
                      <div className="text-muted-foreground"># Rules Chain</div>
                      <div className="p-3 bg-foreground/5 border rounded-none">
                        request -&gt; log
                      </div>
                      <div className="p-3 bg-foreground/5 border rounded-none">
                        log -&gt; auth
                      </div>
                      <div className="p-3 bg-foreground/5 border rounded-none">
                        auth -&gt; fetch
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-muted-foreground">
                        # Global Hooks
                      </div>
                      <div className="p-3 bg-accent/10 border border-accent/20 rounded-none text-accent">
                        Watch All Requests
                      </div>
                      <div className="p-3 bg-foreground/5 border rounded-none text-foreground opacity-70 select-none">
                        ...
                      </div>
                      <div className="p-3 bg-accent/10 border border-accent/20 rounded-none text-accent">
                        Watch All Results
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Matrix */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-bold tracking-tighter mb-2">
                Enterprise Capabilities
              </h2>
              <p className="text-foreground text-base leading-relaxed">
                Advanced features that usually take days to set up, now ready in
                minutes.
              </p>
            </div>
            <Link to="/docs/advanced/type-inference">
              <Button
                variant="outline"
                className="rounded-none px-8 h-12 font-bold tracking-widest text-xs uppercase"
              >
                EXPLORE STACK
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {enterpriseFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-background flex flex-col gap-2 group hover:bg-muted/30 transition-colors duration-500"
              >
                <feature.icon className="h-5 w-5 text-muted-foreground/40 group-hover:text-foreground/40 transition-colors" />
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Experience / CLI */}
      <section className="py-24 border-b relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <CodeBlock
                language="bash"
                filename="terminal"
                code={cliCode}
                className="min-h-[200px]"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-2">
              <h2 className="font-display text-4xl font-bold tracking-tighter leading-none">
                Built for
                <br />
                Efficiency.
              </h2>
              <p className="text-base text-foreground mb-4 leading-relaxed max-w-md">
                Our tools build your API layer for you. Give us a spec file, and
                we give you a working, typed client.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { title: "No manual data typing", icon: Zap },
                  {
                    title: "Sync with your backend in seconds",
                    icon: RefreshCw,
                  },
                  { title: "Supports OpenAPI / Swagger", icon: Download },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-card/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold tracking-tight mb-4">
              Modular By Design
            </h2>
            <p className="text-foreground max-w-md mx-auto">
              Install only what you need. Every adapter is a separate package.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { pkg: "@simple-api/core", desc: "The main library and rules" },
              {
                pkg: "@simple-api/react",
                desc: "Hooks for React applications",
              },
              {
                pkg: "@simple-api/svelte",
                desc: "State management for Svelte",
              },
              { pkg: "@simple-api/zustand", desc: "Zustand store integration" },
              {
                pkg: "@simple-api/react-native",
                desc: "Optimized for mobile apps",
              },
            ].map((p, i) => (
              <motion.div
                key={p.pkg}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-none border bg-card p-4 flex items-center gap-4 hover:border-foreground/20 transition-all cursor-default"
              >
                <div className="h-10 w-10 rounded-none bg-foreground/5 flex items-center justify-center shrink-0">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-sm font-bold truncate">
                    {p.pkg}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-sm relative z-10">
          <div className="flex items-center gap-2">
            <img
              src="/simplewhite.png"
              alt="simple-api logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-display font-bold text-lg">simple-api</span>
          </div>
          <p className="text-muted-foreground">
            Built for developers who care about their network layer.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Internal Helper Components for icons
const RefreshCw = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

export default LandingPage;
