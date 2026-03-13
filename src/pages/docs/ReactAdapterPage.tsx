import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ReactAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Adapters
    </p>
    <h1>React Adapter</h1>
    <p>
      The <code>@simple-api/react</code> package provides a high performance
      adapter for React applications using TanStack Query. It transforms your
      API definition into a set of reactive hooks.
    </p>

    <h2>Installation</h2>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @simple-api/react @simple-api/core @tanstack/react-query"
    />

    <h2>Setup</h2>
    <p>First, initialize your core API and wrap it in the React adapter.</p>
    <CodeBlock
      language="typescript"
      filename="api.ts"
      code={`import { createApi } from "@simple-api/core";
import { createReactAdapter } from "@simple-api/react";

const api = createApi({ ... });
export const useApi = createReactAdapter(api);`}
    />

    <h2>Queries (GET)</h2>
    <p>
      Endpoints with the <code>GET</code> method are treated as queries. The
      hook manages caching, loading states, and automatic refetching.
    </p>
    <CodeBlock
      language="tsx"
      filename="UserProfile.tsx"
      code={`const { users } = useApi();
const { data, isLoading, error } = users().get({
  params: { id: "1" },
  hookOptions: {
    staleTime: 60000,
  },
});`}
    />

    <h3>Query Keys</h3>
    <p>
      The adapter automatically generates stable query keys for you, typically
      in the format: <code>[serviceName, endpointName, params, query]</code>.
      You never have to manually manage key strings.
    </p>

    <h2>Mutations (POST, PUT, DELETE, PATCH)</h2>
    <p>Endpoints with other HTTP methods are treated as mutations.</p>
    <CodeBlock
      language="tsx"
      filename="UpdateUser.tsx"
      code={`const { users } = useApi();
const { execute, isPending } = users().update({
  params: { id: "1" },
  invalidates: ["users"],
});

const handleSave = (newData) => {
  execute(newData);
};`}
    />

    <h3>Intelligent Invalidation</h3>
    <p>
      The <code>invalidates</code> property allows you to specify which queries
      should be refreshed after a successful mutation. You can provide an array
      of service names or specific endpoint paths.
    </p>

    <h2>Features</h2>
    <ol>
      <li>
        <strong>Auto generated Hooks</strong>: No need to write manual wrappers
        for every endpoint.
      </li>
      <li>
        <strong>Strict Typing</strong>: Every component knows exactly what data
        it's receiving.
      </li>
      <li>
        <strong>Conflict Resolution</strong>: Inherits request deduplication
        from the core engine.
      </li>
      <li>
        <strong>Optimistic UI Helper</strong>: Mutations expose the{" "}
        <code>variables</code> property, allowing you to render the "future"
        state while a request is in flight.
      </li>
    </ol>
  </div>
);

export default ReactAdapterPage;
