import React from "react";
import { Construction } from "lucide-react";

interface ComingSoonPageProps {
  section: string;
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ section, title }) => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>{section}</p>
    <h1>{title}</h1>
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center mb-4">
        <Construction className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-lg font-medium mb-1">Coming Soon</p>
      <p className="text-sm text-muted-foreground max-w-sm">
        This page is currently being written. Check back soon for the full documentation.
      </p>
    </div>
  </div>
);

export default ComingSoonPage;
