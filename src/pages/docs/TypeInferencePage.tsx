import React from "react";
import CodeBlock from "@/components/CodeBlock";

const TypeInferencePage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Advanced</p>
    <h1>Advanced Type Inference</h1>
    <p>One of simple-api's core strengths is its deep TypeScript integration. Unlike traditional API clients that require manual type assertions or generic passing at the call site, simple-api infers the entire structure from your initial definition.</p>

    <h2>Contextual Inference</h2>
    <p>When you define your endpoints, the engine remembers the path parameters and HTTP methods.</p>
    <CodeBlock language="typescript" filename="api-definition.ts" code={`const api = createApi({
  services: {
    users: {
      get: { method: "GET", path: "/users/:id" },
    },
  },
});`} />
    <p>When you call <code>api.users.get()</code>, TypeScript knows exactly which parameters are required:</p>
    <ul>
      <li><strong>params</strong>: Since <code>:id</code> is in the path, the <code>params</code> object must contain an <code>id</code> property.</li>
      <li><strong>body</strong>: Since the method is <code>GET</code>, the <code>body</code> property is discouraged and correctly typed as such.</li>
    </ul>

    <h2>Framework Integration</h2>
    <p>This inference flows seamlessly into our adapters. In React or Svelte, the hooks provided by the adapter are fully typed based on the core definition.</p>
    <CodeBlock language="tsx" filename="TypedComponent.tsx" code={`// Inferred as (id: string) => Promise<UserData>
const { data } = users().get({ params: { id: "1" } });`} />

    <h2>Avoiding Explicit Casting</h2>
    <p>Historically, developers often had to use <code>as ServiceConfig</code> to satisfy TypeScript when using certain patterns. In recent versions, we have implemented a self-referential mapped type (<code>{"ApiEngine<T>"}</code>) that eliminates this need.</p>
    <p>Whether your service is a direct record of endpoints or a config object with middleware, the type system detects the structure automatically, giving you perfect autocompletion and error checking.</p>

    <h2>Type-Safe Middleware</h2>
    <p>Middleware contexts are also fully typed. When writing a middleware, you have access to the full configuration of the endpoint being intercepted, allowing you to write type-safe interception logic.</p>
  </div>
);

export default TypeInferencePage;
