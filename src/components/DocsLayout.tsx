import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Github,
  FileText,
  Zap,
  Layers,
  Shield,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ThemeToggle from "./ThemeToggle";
import DocSidebar from "./DocSidebar";
import TableOfContents from "./TableOfContents";
import DocsPrevNext from "./DocsPrevNext";

const searchIndex = [
  {
    group: "Getting Started",
    items: [
      { title: "Introduction", path: "/docs", icon: FileText },
      { title: "Installation", path: "/docs/installation", icon: Layers },
      { title: "Getting Started", path: "/docs/getting-started", icon: Zap },
    ],
  },
  {
    group: "Core",
    items: [
      { title: "Create API", path: "/docs/core/create-api", icon: FileText },
      { title: "Middleware", path: "/docs/core/middleware", icon: Shield },
      { title: "API Error", path: "/docs/core/api-error", icon: Terminal },
      { title: "Interceptors", path: "/docs/core/interceptors", icon: Zap },
    ],
  },
  {
    group: "Adapters",
    items: [
      { title: "React Adapter", path: "/docs/adapters/react", icon: Layers },
      { title: "Svelte Adapter", path: "/docs/adapters/svelte", icon: Layers },
      {
        title: "React Native Adapter",
        path: "/docs/adapters/react-native",
        icon: Layers,
      },
      {
        title: "Offline Queue",
        path: "/docs/adapters/offline-queue",
        icon: Shield,
      },
    ],
  },
  {
    group: "Middleware Library",
    items: [
      { title: "Logger", path: "/docs/middleware/logger", icon: Terminal },
      { title: "Mock", path: "/docs/middleware/mock", icon: Shield },
      { title: "Retry", path: "/docs/middleware/retry", icon: Zap },
      {
        title: "Transformer",
        path: "/docs/middleware/transformer",
        icon: Layers,
      },
      { title: "Zustand", path: "/docs/middleware/zustand", icon: Layers },
    ],
  },
  {
    group: "Advanced",
    items: [
      {
        title: "Type Inference",
        path: "/docs/advanced/type-inference",
        icon: Zap,
      },
      {
        title: "Request Deduplication",
        path: "/docs/advanced/request-deduplication",
        icon: Shield,
      },
      {
        title: "Structured Errors",
        path: "/docs/advanced/structured-errors",
        icon: Terminal,
      },
      { title: "CLI Tools", path: "/docs/advanced/cli-tools", icon: Terminal },
      {
        title: "File Uploads",
        path: "/docs/advanced/file-uploads",
        icon: FileText,
      },
      { title: "Pagination", path: "/docs/advanced/pagination", icon: Layers },
      { title: "Polling", path: "/docs/advanced/polling", icon: Zap },
      {
        title: "PWA Caching",
        path: "/docs/advanced/pwa-caching",
        icon: Shield,
      },
    ],
  },
];

const DocsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelectResult = (path: string) => {
    navigate(path);
    setSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Link to="/" className="flex items-center gap-1">
              <img
                src="/simpleblack.png"
                alt="simple-api logo"
                className="h-7 w-auto block dark:hidden"
              />
              <img
                src="/simplewhite.png"
                alt="simple-api logo"
                className="h-7 w-auto hidden dark:block"
              />
              <span className="font-display font-bold text-lg">simple-api</span>
            </Link>
            <span className="hidden sm:inline-block text-[10px] font-mono bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
              docs
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center mr-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-muted/50 text-muted-foreground text-sm w-52 hover:bg-muted transition-colors"
              >
                <Search className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">Search docs...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
            <ThemeToggle />
            <a
              href="https://github.com/ElnatanSamuel/simple-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchIndex.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => onSelectResult(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      <div className="flex">
        <DocSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0">
          <div className="flex justify-between px-4 py-10 w-full min-h-[calc(100vh-3.5rem)]">
            <div className="flex-1 min-w-0 max-w-3xl lg:ml-8">
              <Outlet key={location.pathname} />
              <DocsPrevNext />
            </div>
            <div className="hidden xl:block w-64 shrink-0 pr-6">
              <div className="sticky top-24">
                <TableOfContents key={location.pathname} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
