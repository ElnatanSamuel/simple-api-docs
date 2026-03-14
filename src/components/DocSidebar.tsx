import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronRight,
  BookOpen,
  Zap,
  FileCode,
  Layers,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
}

interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    label: "Getting Started",
    icon: BookOpen,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Getting Started", href: "/docs/getting-started" },
    ],
  },
  {
    label: "Core",
    icon: Zap,
    items: [
      { title: "Create API", href: "/docs/core/create-api" },
      { title: "Middleware", href: "/docs/core/middleware" },
      { title: "API Error", href: "/docs/core/api-error" },
      { title: "Interceptors", href: "/docs/core/interceptors" },
    ],
  },
  {
    label: "Adapters",
    icon: Layers,
    items: [
      { title: "React", href: "/docs/adapters/react" },
      { title: "Svelte", href: "/docs/adapters/svelte" },
      { title: "React Native", href: "/docs/adapters/react-native" },
      { title: "Offline Queue", href: "/docs/adapters/offline-queue" },
    ],
  },
  {
    label: "Middleware Library",
    icon: Terminal,
    items: [
      { title: "Logger", href: "/docs/middleware/logger" },
      { title: "Mock", href: "/docs/middleware/mock" },
      { title: "Retry", href: "/docs/middleware/retry" },
      { title: "Transformer", href: "/docs/middleware/transformer" },
      { title: "Zustand", href: "/docs/middleware/zustand" },
    ],
  },
  {
    label: "Advanced",
    icon: FileCode,
    items: [
      { title: "Type Inference", href: "/docs/advanced/type-inference" },
      {
        title: "Request Deduplication",
        href: "/docs/advanced/request-deduplication",
      },
      { title: "Structured Errors", href: "/docs/advanced/structured-errors" },
      { title: "CLI Tools", href: "/docs/advanced/cli-tools" },
      { title: "File Uploads", href: "/docs/advanced/file-uploads" },
      { title: "Pagination", href: "/docs/advanced/pagination" },
      { title: "Polling", href: "/docs/advanced/polling" },
      { title: "PWA Caching", href: "/docs/advanced/pwa-caching" },
    ],
  },
];

interface DocSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ isOpen, onToggle }) => {
  const { pathname } = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "Getting Started",
  ]);

  useEffect(() => {
    // Find which group contains the current pathname
    const activeGroup = navigation.find((group) =>
      group.items.some((item) => item.href === pathname),
    );
    if (activeGroup && !expandedGroups.includes(activeGroup.label)) {
      setExpandedGroups((prev) => [...prev, activeGroup.label]);
    }
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={cn(
          "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-60 border-r bg-sidebar overflow-y-auto transition-transform duration-200 lg:sticky lg:top-14 lg:translate-x-0 lg:shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-3 space-y-0.5">
          {navigation.map((group) => {
            const isExpanded = expandedGroups.includes(group.label);
            const Icon = group.icon;
            return (
              <div key={group.label} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center w-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 mr-1 transition-transform duration-150",
                      isExpanded && "rotate-90",
                    )}
                  />
                  <Icon className="h-3 w-3 mr-1.5 opacity-60" />
                  {group.label}
                </button>
                {isExpanded && (
                  <div className="ml-[18px] border-l pl-2 space-y-0.5 mt-0.5">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end
                        className={({ isActive }) =>
                          cn(
                            "block px-2 py-1 text-[13px] rounded-md transition-colors",
                            isActive
                              ? "bg-accent/10 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted",
                          )
                        }
                        style={({ isActive }) =>
                          isActive ? { color: "hsl(var(--accent))" } : {}
                        }
                        onClick={() => {
                          if (window.innerWidth < 1024) onToggle();
                        }}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default DocSidebar;
