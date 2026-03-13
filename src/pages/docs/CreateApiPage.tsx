import React from "react";
import CodeBlock from "@/components/CodeBlock";

const CreateApiPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Core
    </p>
    <h1>createApi</h1>
    <p>
      The <code>createApi</code> function is the entry point of the simple-api
      engine. It generates a structured, type safe API client from your service
      and endpoint definitions.
    </p>

    <h2>Configuration Options</h2>
    <p>
      The <code>createApi</code> function accepts a configuration object with
      the following properties:
    </p>

    <h3>baseUrl</h3>
    <ul>
      <li>
        <strong>Type</strong>: <code>string</code>
      </li>
      <li>
        <strong>Required</strong>: Yes
      </li>
      <li>
        <strong>Description</strong>: The base URL for all endpoints. This can
        be overridden at the service or endpoint level.
      </li>
    </ul>

    <h3>services</h3>
    <ul>
      <li>
        <strong>Type</strong>:{" "}
        <code>{"Record<string, ServiceConfig | ServiceEndpoints>"}</code>
      </li>
      <li>
        <strong>Required</strong>: Yes
      </li>
      <li>
        <strong>Description</strong>: An object mapping service names to their
        configurations.
      </li>
    </ul>

    <h3>middleware</h3>
    <ul>
      <li>
        <strong>Type</strong>: <code>Middleware[]</code>
      </li>
      <li>
        <strong>Required</strong>: No
      </li>
      <li>
        <strong>Description</strong>: Global middleware that applies to every
        request made through this API instance.
      </li>
    </ul>

    <h2>Service Configuration</h2>
    <p>There are two ways to define a service:</p>

    <h3>1. Direct Endpoint Mapping</h3>
    <p>A simple object mapping endpoint names to their configuration.</p>
    <CodeBlock
      language="typescript"
      filename="direct-mapping.ts"
      code={`services: {
  users: {
    get: { method: "GET", path: "/users/:id" },
    list: { method: "GET", path: "/users" },
  }
}`}
    />

    <h3>2. Full Service Object</h3>
    <p>Allows you to define service level middleware.</p>
    <CodeBlock
      language="typescript"
      filename="full-service.ts"
      code={`services: {
  auth: {
    middleware: [authMiddleware],
    endpoints: {
      login: { method: "POST", path: "/auth/login" },
      profile: { method: "GET", path: "/me" },
    }
  }
}`}
    />

    <h2>Endpoint Definition</h2>
    <p>Each endpoint can have the following properties:</p>
    <ul>
      <li>
        <strong>method</strong>: <code>GET</code>, <code>POST</code>,{" "}
        <code>PUT</code>, <code>DELETE</code>, or <code>PATCH</code>.
      </li>
      <li>
        <strong>path</strong>: The URL path, supporting <code>:param</code>{" "}
        placeholders.
      </li>
      <li>
        <strong>baseUrl</strong>: (Optional) Override the global base URL for
        this specific endpoint.
      </li>
      <li>
        <strong>middleware</strong>: (Optional) Middleware that applies only to
        this endpoint.
      </li>
    </ul>

    <h2>Execution Flow</h2>
    <p>
      When you call an endpoint (e.g., <code>api.users.get()</code>), the engine
      performs the following steps:
    </p>
    <ol>
      <li>
        <strong>Parameter Injection</strong>: Replaces placeholders in the{" "}
        <code>path</code> with values from <code>options.params</code>.
      </li>
      <li>
        <strong>URL Construction</strong>: Combines <code>baseUrl</code>,{" "}
        <code>path</code>, and <code>options.query</code> into a final URL.
      </li>
      <li>
        <strong>Middleware Execution</strong>: Runs the middleware pipeline in
        the order: Global → Service → Endpoint.
      </li>
      <li>
        <strong>Fetch</strong>: Executes the network request using the native
        Fetch API.
      </li>
      <li>
        <strong>Deduplication</strong>: If it is a <code>GET</code> request and
        an identical request is already in flight, it returns the existing
        promise.
      </li>
      <li>
        <strong>Response Handling</strong>: Parses the JSON response or throws
        an <code>ApiError</code> for non 2xx status codes.
      </li>
    </ol>
  </div>
);

export default CreateApiPage;
