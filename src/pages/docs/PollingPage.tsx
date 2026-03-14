import React from "react";

const PollingPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>Polling and Auto-Refresh</h1>
    <p className="text-lg !text-foreground mb-8">
      The core engine supports built-in polling for any endpoint. This is ideal
      for dashboards, real-time counters, or monitoring long-running background
      tasks.
    </p>

    <h2>Usage</h2>
    <p>
      Simply pass a <code>pollingInterval</code> (in milliseconds) in the
      request options.
    </p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`// Fetch every 3 seconds
api.users.list({ pollingInterval: 3000 });`}
      </code>
    </pre>

    <h2>Behavior</h2>
    <ol>
      <li>The engine performs the initial request immediately.</li>
      <li>
        Once the request resolves (success or failure), a timer is set for the{" "}
        <code>pollingInterval</code>.
      </li>
      <li>
        When the timer fires, the endpoint is called again with the{" "}
        <strong>exact same options</strong>.
      </li>
      <li>
        Polling continues indefinitely until the page is closed or the request
        is aborted.
      </li>
    </ol>

    <h2>Stopping Polling</h2>
    <p>
      To stop a polling request, you should use the standard{" "}
      <code>AbortController</code> support.
    </p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`const controller = new AbortController();

api.users.list({
  pollingInterval: 5000,
  signal: controller.signal,
});

// Stop polling after 30 seconds
setTimeout(() => controller.abort(), 30000);`}
      </code>
    </pre>
  </div>
);

export default PollingPage;
