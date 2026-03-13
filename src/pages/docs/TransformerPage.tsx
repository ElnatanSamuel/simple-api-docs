import React from "react";
import CodeBlock from "@/components/CodeBlock";

const TransformerPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Middleware Library
    </p>
    <h1>Transformer Middleware</h1>
    <p>
      The Transformer Middleware automatically handles case conversions between
      your JavaScript code (typically camelCase) and your backend API (often
      snake_case or others).
    </p>

    <h2>Setup</h2>
    <CodeBlock
      language="typescript"
      filename="api.ts"
      code={`import { createApi, createTransformerMiddleware } from "@simple-api/core";

const api = createApi({
  baseUrl: "https://api.example.com",
  middleware: [
    createTransformerMiddleware({
      request: "snake_case",
      response: "camelCase"
    })
  ],
  services: { ... }
});`}
    />

    <h2>Why use this?</h2>
    <p>
      Naming conventions often differ between frontend and backend. Manually
      mapping objects before every request and after every response is error
      prone and tedious. This middleware automates that process.
    </p>

    <h2>Deep Transformation</h2>
    <p>
      The middleware recursively walks through your request bodies and response
      payloads. It handles:
    </p>
    <ul>
      <li>Nested Objects</li>
      <li>Arrays of Objects</li>
      <li>Primitive Keys</li>
    </ul>

    <h2>Custom Mappings</h2>
    <p>
      You can provide custom mapping functions if your API uses a convention not
      covered by the builtin transformations.
    </p>
  </div>
);

export default TransformerPage;
