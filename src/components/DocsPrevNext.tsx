import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const flatPages = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Getting Started", href: "/docs/getting-started" },
  { title: "Create API", href: "/docs/core/create-api" },
  { title: "Middleware", href: "/docs/core/middleware" },
  { title: "API Error", href: "/docs/core/api-error" },
  { title: "React", href: "/docs/adapters/react" },
  { title: "Svelte", href: "/docs/adapters/svelte" },
  { title: "React Native", href: "/docs/adapters/react-native" },
  { title: "Logger", href: "/docs/middleware/logger" },
  { title: "Mock", href: "/docs/middleware/mock" },
  { title: "Retry", href: "/docs/middleware/retry" },
  { title: "Transformer", href: "/docs/middleware/transformer" },
  { title: "Zustand", href: "/docs/middleware/zustand" },
  { title: "Type Inference", href: "/docs/advanced/type-inference" },
  { title: "Request Deduplication", href: "/docs/advanced/request-deduplication" },
  { title: "Structured Errors", href: "/docs/advanced/structured-errors" },
];

const DocsPrevNext: React.FC = () => {
  const location = useLocation();
  const currentIndex = flatPages.findIndex((p) => p.href === location.pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const next = currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  return (
    <div className="flex items-stretch gap-3 mt-16 pt-6 border-t">
      {prev ? (
        <Link
          to={prev.href}
          className="flex-1 group flex items-center gap-3 rounded-lg border px-4 py-3 hover:border-accent/40 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Previous</p>
            <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          to={next.href}
          className="flex-1 group flex items-center justify-end gap-3 rounded-lg border px-4 py-3 hover:border-accent/40 transition-colors text-right"
        >
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Next</p>
            <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{next.title}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default DocsPrevNext;
