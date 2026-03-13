import React from "react";
import CodeBlock from "@/components/CodeBlock";

const MockPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Middleware Library
    </p>
    <h1>Mock Middleware</h1>
    <p>
      The Mock Middleware allows you to simulate your backend API during
      development. This is incredibly useful for building frontend features
      before the backend endpoints are ready or for writing reliable integration
      tests.
    </p>

    <h2>Setup</h2>
    <CodeBlock
      language="typescript"
      filename="api.ts"
      code={`import { createApi, createMockMiddleware } from "@simple-api/core";

const mocks = [
  {
    path: "/users/1",
    response: { id: 1, name: "John Doe" },
    delay: 500
  },
  {
    path: "/users/1",
    method: "PATCH",
    response: { success: true },
    delay: 200
  }
];

const api = createApi({
  baseUrl: "...",
  middleware: [
    process.env.NODE_ENV === "development"
      && createMockMiddleware(mocks)
  ].filter(Boolean),
  services: { ... }
});`}
    />

    <h2>Features</h2>
    <h3>Path Matching</h3>
    <p>
      The middleware matches requests based on their path and HTTP method. It
      supports exact string matches.
    </p>

    <h3>Simulated Latency</h3>
    <p>
      Use the <code>delay</code> property to simulate realistic network latency,
      allowing you to debug and verify your loading states and skeleton screens.
    </p>

    <h3>Error Simulation</h3>
    <p>You can simulate API failures by providing an error response:</p>
    <CodeBlock
      language="typescript"
      filename="error-mock.ts"
      code={`{
  path: "/fail",
  status: 403,
  response: { message: "Permission Denied" }
}`}
    />

    <h2>Best Practices</h2>
    <p>
      Only enable the Mock Middleware during development. We recommend using
      conditional logic based on your environment variables to ensure it never
      reaches your production bundle.
    </p>
  </div>
);

export default MockPage;
