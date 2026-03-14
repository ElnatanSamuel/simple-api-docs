import React from "react";

const InterceptorsPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Core
    </p>
    <h1>Interceptors</h1>
    <p className="text-lg !text-foreground mb-8">
      Interceptors provide a way to hook into the request lifecycle globally,
      without being part of the sequential middleware pipeline. They are ideal
      for cross-cutting concerns like global error handling, data
      transformation, or authentication header management.
    </p>

    <h2>Setup</h2>
    <p>
      Interceptors are defined in the root <code>createApi</code> configuration.
    </p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`const api = createApi({
  baseUrl: "https://api.example.com",
  interceptors: {
    onRequest: (ctx) => {
      console.log(\`Requesting \${ctx.service}.\${ctx.endpoint}\`);
      // You can return modified options
      return {
        ...ctx.options,
        headers: { ...ctx.options.headers, 'X-Client': 'simple-api' }
      };
    },
    onResponse: (data, ctx) => {
      // Globally wrap all responses if needed
      return { ...data, version: 'v1' };
    },
    onError: (error, ctx) => {
      // Global error tracking (e.g., Sentry)
      Sentry.captureException(error);
    }
  },
  services: { ... }
});`}
      </code>
    </pre>

    <h2>Lifecycle Hooks</h2>

    <h3>onRequest(context)</h3>
    <p>
      Called immediately before the network request is initiated. It receives
      the full <code>MiddlewareContext</code>. You can return a{" "}
      <code>RequestOptions</code> object to modify the request on the fly.
    </p>

    <h3>onResponse(data, context)</h3>
    <p>
      Called after a successful (2xx) JSON response is received. It receives the
      parsed JSON data and the context. You can return modified data to be
      passed to the caller.
    </p>

    <h3>onError(error, context)</h3>
    <p>
      Called when a request fails, either due to a network error or a non-2xx
      status code. It is triggered even if the error is caught by middleware
      later in the chain.
    </p>

    <h2>Interceptors vs Middleware</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left font-semibold">Feature</th>
            <th className="py-2 text-left font-semibold">Interceptors</th>
            <th className="py-2 text-left font-semibold">Middleware</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">Execution</td>
            <td className="py-2">Global hooks</td>
            <td className="py-2">Sequential pipeline</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Async</td>
            <td className="py-2">Supported</td>
            <td className="py-2">
              Supported (via <code>next()</code>)
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Purpose</td>
            <td className="py-2">Simple global hooks</td>
            <td className="py-2">Complex logic (retry, cache, etc.)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Modification</td>
            <td className="py-2">Can modify options/data</td>
            <td className="py-2">Can bypass requests entirely</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default InterceptorsPage;
