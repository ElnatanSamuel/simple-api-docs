import React from "react";
import CodeBlock from "@/components/CodeBlock";

const RetryPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Middleware Library
    </p>
    <h1>Retry Middleware</h1>
    <p>
      The Retry Middleware adds resilience to your API client by automatically
      retrying failed requests. It is designed to handle transient network
      issues or temporary server unavailability.
    </p>

    <h2>Setup</h2>
    <CodeBlock
      language="typescript"
      filename="api.ts"
      code={`import { createApi, createRetryMiddleware } from "@simple-api/core";

const api = createApi({
  baseUrl: "https://api.example.com",
  middleware: [
    createRetryMiddleware({
      maxRetries: 3,
      baseDelay: 1000,
    })
  ],
  services: { ... }
});`}
    />

    <h2>Configuration</h2>
    <p>
      The <code>createRetryMiddleware</code> accepts several options to tune the
      retry behavior:
    </p>
    <ul>
      <li>
        <strong>maxRetries</strong>: The maximum number of attempts before
        throwing the final error (default: 3).
      </li>
      <li>
        <strong>baseDelay</strong>: The initial delay in milliseconds before the
        first retry (default: 1000).
      </li>
      <li>
        <strong>maxDelay</strong>: The maximum wait time between retries
        (default: 10000).
      </li>
    </ul>

    <h2>Exponential Backoff</h2>
    <p>
      The middleware uses an exponential backoff strategy:{" "}
      <code>baseDelay * (2 ^ attempt)</code>. This prevents "thundering herd"
      problems by giving your server more time to recover as retry attempts
      increase.
    </p>

    <h2>Smart Retrying</h2>
    <p>
      By default, the middleware only retries requests that result in network
      failures or specific 5xx server errors. It does <strong>not</strong> retry
      4xx errors (client errors) like "Not Found" or "Unauthorized", as those
      are typically not transient.
    </p>
  </div>
);

export default RetryPage;
