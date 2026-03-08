import React from "react";
import CodeBlock from "@/components/CodeBlock";

const GettingStartedPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Getting Started</p>
    <h1>Getting Started</h1>
    <p>This guide will walk you through setting up your first simple-api instance and making your first type-safe request.</p>

    <h2>1. Create your API Definition</h2>
    <p>Start by defining your services and endpoints using the <code>createApi</code> factory.</p>
    <CodeBlock language="typescript" filename="api.ts" code={`import { createApi } from "@simple-api/core";

export const api = createApi({
  baseUrl: "https://api.example.com",
  services: {
    users: {
      get: { method: "GET", path: "/users/:id" },
      list: { method: "GET", path: "/users" },
    },
    auth: {
      login: { method: "POST", path: "/auth/login" },
    },
  },
});`} />

    <h2>2. Consume the API</h2>
    <p>Once defined, your API is available as a structured object with full autocompletion.</p>
    <CodeBlock language="typescript" filename="usage.ts" code={`// Making a request with path parameters
const user = await api.users.get({
  params: { id: "123" },
});

console.log(user.name);

// Making a request with a body
const response = await api.auth.login({
  body: {
    email: "user@example.com",
    password: "secure-password",
  },
});`} />

    <h2>3. Adding Middleware</h2>
    <p>Middleware allows you to add cross-cutting concerns like logging or authentication to your requests.</p>
    <CodeBlock language="typescript" filename="api-with-middleware.ts" code={`import { createApi, createLoggerMiddleware } from "@simple-api/core";

export const api = createApi({
  baseUrl: "https://api.example.com",
  middleware: [
    createLoggerMiddleware(),
    async ({ options }, next) => {
      // Inject auth token
      options.headers = {
        ...options.headers,
        Authorization: "Bearer your-token-here"
      };
      return next(options);
    }
  ],
  services: { ... },
});`} />

    <h2>4. Integration with Frameworks</h2>
    <p>If you are using a framework like React, you can wrap your API instance in an adapter to get reactive hooks.</p>
    <CodeBlock language="tsx" filename="ProfileComponent.tsx" code={`import { createReactAdapter } from "@simple-api/react";
import { api } from "./api-definition";

const useApi = createReactAdapter(api);

function ProfileComponent({ id }) {
  const { users } = useApi();
  const { data, isLoading } = users().get({ params: { id } });

  if (isLoading) return <p>Loading...</p>;
  return <h1>{data.name}</h1>;
}`} />

    <h2>Next Steps</h2>
    <ul>
      <li>Explore <strong>Middleware</strong> to learn about the tiered execution pipeline.</li>
      <li>Dive into <strong>Type Inference</strong> to see how deep typing works.</li>
      <li>Learn about <strong>API Error</strong> for structured error handling.</li>
    </ul>
  </div>
);

export default GettingStartedPage;
