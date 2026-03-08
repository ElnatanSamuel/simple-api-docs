import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Leaf, Menu, Search, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import DocSidebar from "./DocSidebar";

const DocsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-sm">
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
            <Link to="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">Farming Labs</span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
              v2.4.0
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center mr-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-muted/50 text-muted-foreground text-sm w-56">
                <Search className="h-3.5 w-3.5" />
                <span className="text-xs">Search docs...</span>
                <kbd className="ml-auto text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border">⌘K</kbd>
              </div>
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <DocSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
