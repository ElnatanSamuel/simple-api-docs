import React from "react";
import CodeBlock from "@/components/CodeBlock";

const LoggerPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Middleware Library
    </p>
    <h1>Logger Middleware</h1>
    <p>
      The Logger Middleware provides high visibility insights into your API
      calls directly in the browser console. It is an essential tool for
      debugging and monitoring network activity during development.
    </p>

    <h2>Setup</h2>
    <CodeBlock
      language="typescript"
      filename="api.ts"
      code={`import { createApi, createLoggerMiddleware } from "@simple-api/core";

const api = createApi({
  baseUrl: "https://api.example.com",
  middleware: [
    createLoggerMiddleware()
  ],
  services: { ... }
});`}
    />

    <h2>Features</h2>
    <h3>Beautiful Grouping</h3>
    <p>
      Requests and their subsequent responses or errors are grouped together
      using <code>console.group</code>. This keeps your console clean when
      multiple requests are happening simultaneously.
    </p>

    <h3>Detailed Metadata</h3>
    <p>Each log entry includes:</p>
    <ul>
      <li>
        <strong>Request ID</strong>: A unique identifier to link requests to
        responses.
      </li>
      <li>
        <strong>Method & URL</strong>: Clearly displayed at the start of the
        request.
      </li>
      <li>
        <strong>Timing</strong>: The exact duration of the network call in
        milliseconds.
      </li>
      <li>
        <strong>Context</strong>: Access to the full service and endpoint names.
      </li>
    </ul>

    <h3>Error Visibility</h3>
    <p>
      When a request fails, the logger detects <code>ApiError</code> instances
      and automatically logs the status code and the full JSON error payload
      returned by your server.
    </p>

    <h2>Color Coding</h2>
    <ul>
      <li>
        <strong>Request</strong>: Blue
      </li>
      <li>
        <strong>Success</strong>: Green
      </li>
      <li>
        <strong>Error</strong>: Red
      </li>
    </ul>
  </div>
);

export default LoggerPage;
