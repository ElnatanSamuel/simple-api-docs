import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ZustandPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Middleware Library</p>
    <h1>Zustand Middleware</h1>
    <p>The <code>@simple-api/zustand</code> middleware provides a direct bridge between your network layer and your state management layer, eliminating the need for manual store dispatches.</p>

    <h2>Setup</h2>
    <CodeBlock language="typescript" filename="api.ts" code={`import { createApi } from "@simple-api/core";
import { createZustandMiddleware } from "@simple-api/zustand";
import { useAuthStore } from "./stores/auth";

const api = createApi({
  baseUrl: "https://api.example.com",
  middleware: [
    createZustandMiddleware({
      stores: {
        auth: (data) => useAuthStore.getState().setAuth(data)
      }
    })
  ],
  services: { ... }
});`} />

    <h2>Usage</h2>
    <p>To sync a request to a store, simply provide the <code>storeKey</code> in the request options.</p>
    <CodeBlock language="typescript" filename="login.ts" code={`await api.auth.login({
  body: { ... },
  storeKey: "auth"
});`} />

    <h2>How it works</h2>
    <ol>
      <li><strong>Request Execution</strong>: The API call is executed normally.</li>
      <li><strong>Success Interception</strong>: Upon a successful response, the middleware looks up the <code>storeKey</code> in its configuration.</li>
      <li><strong>Dispatch</strong>: It calls the configured function with the response data.</li>
      <li><strong>UI Sync</strong>: Any components subscribed to that store will update automatically.</li>
    </ol>

    <h2>Benefits</h2>
    <ul>
      <li><strong>Decoupled Architecture</strong>: Your components don't need to know about the store; the engine handles the sync.</li>
      <li><strong>Boilerplate Reduction</strong>: Removes the standard "Fetch → Await → Dispatch" pattern from your business logic.</li>
      <li><strong>Type Safety</strong>: Mappings ensure that the data shape matches your store's requirements.</li>
    </ul>
  </div>
);

export default ZustandPage;
