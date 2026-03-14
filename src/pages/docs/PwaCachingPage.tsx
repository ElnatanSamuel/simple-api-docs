import React from "react";

const PwaCachingPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>PWA Caching (Stale-While-Revalidate)</h1>
    <p className="text-lg !text-foreground mb-8">
      The <code>@simple-api/core</code> package includes a specialized{" "}
      <code>createCacheMiddleware</code> that leverages the Web Cache API. This
      enables PWA-style offline capabilities and instant data loading.
    </p>

    <h2>Setup</h2>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`import { createApi, createCacheMiddleware } from "@simple-api/core";

const api = createApi({
  baseUrl: "https://api.example.com",
  middleware: [
    createCacheMiddleware({
      name: "my-app-cache",
      ttl: 60 * 60 * 1000, // 1 hour
      swr: true,           // Enable Stale-While-Revalidate
    })
  ],
  services: { ... }
});`}
      </code>
    </pre>

    <h2>Strategies</h2>

    <h3>1. Stale-While-Revalidate (SWR)</h3>
    <p>
      If <code>swr</code> is enabled (default), the engine will:
    </p>
    <ol>
      <li>Immediately return the cached data if it exists.</li>
      <li>Fire a network request in the background.</li>
      <li>Update the cache with the fresh response.</li>
      <li>Subsequent calls will receive the updated data.</li>
    </ol>

    <h3>2. Cache-First (with TTL)</h3>
    <p>
      If <code>swr</code> is disabled, the engine will return cached data until
      the TTL expires. After expiration, it will perform a network request.
    </p>

    <h2>Limitations</h2>
    <ul>
      <li>
        <strong>GET only</strong>: The cache middleware only intercepts{" "}
        <code>GET</code> requests.
      </li>
      <li>
        <strong>Environment</strong>: Requires the global <code>caches</code>{" "}
        object (Browser or PWA environment). It will be transparently ignored in
        Node.js or older environments.
      </li>
    </ul>
  </div>
);

export default PwaCachingPage;
