import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const collectHeadings = () => {
      const prose = document.querySelector(".doc-prose");
      if (!prose) return;

      const elements = prose.querySelectorAll("h2, h3");
      const items: TocItem[] = [];

      elements.forEach((el) => {
        const text = el.textContent || "";
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        el.id = id;
        items.push({
          id,
          text,
          level: el.tagName === "H2" ? 2 : 3,
        });
      });

      setHeadings(items);
    };

    // Small delay to let page render
    const timer = setTimeout(collectHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 w-52 shrink-0 self-start">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="space-y-1 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "block text-[13px] py-0.5 transition-colors border-l -ml-px",
                h.level === 3 ? "pl-6" : "pl-3",
                activeId === h.id
                  ? "border-accent text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              style={activeId === h.id ? { borderColor: "hsl(var(--accent))" } : {}}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
