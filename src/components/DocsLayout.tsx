import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, Search, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import DocSidebar from "./DocSidebar";
import TableOfContents from "./TableOfContents";
import DocsPrevNext from "./DocsPrevNext";

const DocsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
            <Link to="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-mono font-bold text-xs">S</span>
              </div>
              <span className="font-display font-bold text-lg">simple-api</span>
            </Link>
            <span className="hidden sm:inline-block text-[10px] font-mono bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
              docs
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center mr-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-muted/50 text-muted-foreground text-sm w-52">
                <Search className="h-3.5 w-3.5 shrink-0" />
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
          <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">
            <div className="flex-1 min-w-0 max-w-3xl">
              <Outlet key={location.pathname} />
              <DocsPrevNext />
            </div>
            </div>
            <TableOfContents key={location.pathname} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
