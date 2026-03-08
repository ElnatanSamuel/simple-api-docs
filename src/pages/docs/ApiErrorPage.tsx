import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ApiErrorPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Core</p>
    <h1>ApiError</h1>
    <p>simple-api provides a dedicated <code>ApiError</code> class to handle failed network requests in a structured way. Whenever the server returns a non-2xx status code, the engine throws an instance of <code>ApiError</code>.</p>

    <h2>The ApiError Properties</h2>
    <p>The <code>ApiError</code> class extends the native <code>Error</code> class and adds several useful properties:</p>

    <h3>status</h3>
    <ul>
      <li><strong>Type</strong>: <code>number</code></li>
      <li><strong>Description</strong>: The HTTP status code returned by the server (e.g., 404, 500).</li>
    </ul>

    <h3>statusText</h3>
    <ul>
      <li><strong>Type</strong>: <code>string</code></li>
      <li><strong>Description</strong>: The status message returned by the server (e.g., "Not Found").</li>
    </ul>

    <h3>data</h3>
    <ul>
      <li><strong>Type</strong>: <code>any</code></li>
      <li><strong>Description</strong>: The full JSON response body returned by the server. This often contains specific error messages or validation details.</li>
    </ul>

    <h2>Handling Errors</h2>
    <p>You should use standard <code>try/catch</code> blocks to handle errors when calling endpoints manually.</p>
    <CodeBlock language="typescript" filename="error-handling.ts" code={`import { ApiError } from "@simple-api/core";

try {
  await api.users.get({ params: { id: "999" } });
} catch (error) {
  if (error instanceof ApiError) {
    // Handle structured API error
    console.error(\`Status: \${error.status}\`);
    console.error(\`Payload:\`, error.data);
  } else {
    // Handle network failures or other unexpected errors
    console.error("Network error:", error.message);
  }
}`} />

    <h2>Logger Integration</h2>
    <p>The <code>createLoggerMiddleware</code> is pre-configured to detect <code>ApiError</code> instances. When a request fails, it will automatically expand the log group to show the status code and the full error body returned by your server, making debugging significantly easier.</p>

    <h2>React & Svelte Integration</h2>
    <p>Framework adapters automatically catch these errors and expose them through the <code>error</code> state in their respective hooks and stores.</p>
    <CodeBlock language="tsx" filename="ErrorComponent.tsx" code={`const { error } = users().get({ params: { id } });

if (error instanceof ApiError) {
  return <div>Server Error: {error.data.detail}</div>;
}`} />
  </div>
);

export default ApiErrorPage;
