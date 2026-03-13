import React from "react";
import CodeBlock from "@/components/CodeBlock";

const MiddlewarePage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Core
    </p>
    <h1>Middleware System</h1>
    <p>
      simple-api features a powerful, tiered middleware system inspired by Koa.
      Middleware allows you to intercept and modify requests and responses
      throughout the execution pipeline.
    </p>

    <h2>The Middleware Signature</h2>
    <p>
      A middleware is a function that receives a context and a <code>next</code>{" "}
      function.
    </p>
    <CodeBlock
      language="typescript"
      filename="types.ts"
      code={`type Middleware = (
  context: MiddlewareContext,
  next: (options: RequestOptions) => Promise<any>,
) => Promise<any>;`}
    />

    <h3>MiddlewareContext</h3>
    <ul>
      <li>
        <strong>service</strong>: The name of the service being called.
      </li>
      <li>
        <strong>endpoint</strong>: The name of the endpoint being called.
      </li>
      <li>
        <strong>config</strong>: The static configuration of the endpoint.
      </li>
      <li>
        <strong>options</strong>: The dynamic options provided for this specific
        call.
      </li>
    </ul>

    <h2>Tiered Execution</h2>
    <p>
      Middleware is applied at three different levels, executing in sequence
      from the most broad to the most specific:
    </p>
    <ol>
      <li>
        <strong>Global Middleware</strong>: Applied to every request in the
        entire API.
      </li>
      <li>
        <strong>Service Middleware</strong>: Applied to all endpoints within a
        specific service.
      </li>
      <li>
        <strong>Endpoint Middleware</strong>: Applied only to a specific
        endpoint.
      </li>
    </ol>
    <p>
      The execution order is always:{" "}
      <strong>Global → Service → Endpoint</strong>.
    </p>

    <h2>Writing Custom Middleware</h2>

    <h3>1. Simple Logging</h3>
    <CodeBlock
      language="typescript"
      filename="logger.ts"
      code={`const logger: Middleware = async ({ service, endpoint }, next) => {
  console.log(\`Starting \${service}.\${endpoint}\`);
  const result = await next();
  console.log(\`Finished \${service}.\${endpoint}\`);
  return result;
};`}
    />

    <h3>2. Injecting Headers</h3>
    <CodeBlock
      language="typescript"
      filename="auth.ts"
      code={`const auth: Middleware = async ({ options }, next) => {
  options.headers = {
    ...options.headers,
    Authorization: "Bearer TOKEN",
  };
  return next(options);
};`}
    />

    <h3>3. Response Transformation</h3>
    <CodeBlock
      language="typescript"
      filename="transform.ts"
      code={`const transformer: Middleware = async (ctx, next) => {
  const data = await next();
  return {
    ...data,
    processedAt: new Date().toISOString(),
  };
};`}
    />

    <h2>Built in Middleware</h2>
    <p>
      The core package includes several high quality middlewares for common
      tasks:
    </p>
    <ul>
      <li>
        <strong>Logger</strong>: Beautifully grouped console logs with timing
        and request IDs.
      </li>
      <li>
        <strong>Retry</strong>: Exponential backoff for handling network
        failures.
      </li>
      <li>
        <strong>Transformer</strong>: Automatic case conversion (snake_case ↔
        camelCase).
      </li>
      <li>
        <strong>Mock</strong>: Intercept requests and return predefined mock
        data during development.
      </li>
    </ul>
  </div>
);

export default MiddlewarePage;
