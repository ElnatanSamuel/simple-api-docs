import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight, BookOpen, Zap, Database, BarChart3, Terminal, Settings, Leaf, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
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
      { title: "Introduction", href: "/" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quickstart" },
    ],
  },
  {
    label: "Core Concepts",
    icon: Zap,
    items: [
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
  {
    label: "API Reference",
    icon: FileCode,
    items: [
      { title: "Endpoints", href: "/docs/endpoints" },
      { title: "Authentication", href: "/docs/authentication" },
    ],
  },
  {
    label: "Data & Analytics",
    icon: BarChart3,
    items: [
      { title: "Dashboard", href: "/docs/dashboard" },
      { title: "Metrics", href: "/docs/metrics" },
    ],
  },
  {
    label: "CLI & Scripts",
    icon: Terminal,
    items: [
      { title: "CLI Tools", href: "/docs/cli" },
      { title: "Automation", href: "/docs/automation" },
    ],
  },
];

interface DocSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ isOpen, onToggle }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    navigation.map((g) => g.label)
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={cn(
          "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 border-r bg-sidebar overflow-y-auto transition-transform duration-200 lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 space-y-1">
          {navigation.map((group) => {
            const isExpanded = expandedGroups.includes(group.label);
            const Icon = group.icon;
            return (
              <div key={group.label} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 mr-1 transition-transform",
                      isExpanded && "rotate-90"
                    )}
                  />
                  <Icon className="h-3.5 w-3.5 mr-1.5" />
                  {group.label}
                </button>
                {isExpanded && (
                  <div className="ml-4 border-l pl-2 space-y-0.5 mt-0.5">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end
                        className={({ isActive }) =>
                          cn(
                            "block px-2 py-1.5 text-sm rounded-md transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )
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
