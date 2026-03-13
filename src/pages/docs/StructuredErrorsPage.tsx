import React from "react";
import CodeBlock from "@/components/CodeBlock";

const StructuredErrorsPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>Structured Error Handling Guide</h1>
    <p>
      Error handling is often treated as an afterthought in frontend
      development. simple-api promotes "errors as first class citizens" by
      providing a structured <code>ApiError</code> system.
    </p>

    <h2>The Problem with Plain Errors</h2>
    <p>
      Standard <code>fetch</code> only throws an error when a network failure
      occurs (e.g., DNS error). It does <strong>not</strong> throw for 4xx or
      5xx responses. This forces developers to manually check{" "}
      <code>response.ok</code> everywhere.
    </p>

    <h2>The simple-api Approach</h2>
    <p>
      Our core engine automatically detects failed status codes and throws a
      structured <code>ApiError</code>. This ensures that every network
      failure—whether it's a 404 from the server or a timeout from the client—is
      handled consistently in your <code>catch</code> blocks.
    </p>

    <h2>Best Practices</h2>

    <h3>Precise Checking</h3>
    <p>
      Use the <code>instanceof ApiError</code> check to separate server-side
      business errors from generic technical failures.
    </p>
    <CodeBlock
      language="typescript"
      filename="precise-check.ts"
      code={`try {
  await api.auth.login(...);
} catch (error) {
  if (error instanceof ApiError && error.status === 401) {
    // Specific logic for unauthorized
  }
}`}
    />

    <h3>Informative UI</h3>
    <p>
      The <code>data</code> property of <code>ApiError</code> contains the raw
      JSON response from your backend. Use this to display specific validation
      errors provided by your API.
    </p>
    <CodeBlock
      language="tsx"
      filename="ErrorList.tsx"
      code={`{error?.data?.errors?.map((err) => (
  <li key={err}>{err}</li>
))}`}
    />

    <h3>Integrated Logging</h3>
    <p>
      Always enable the <code>createLoggerMiddleware</code> during development.
      It captures these structured errors and prints them in a highly readable
      format, drastically reducing time spent in the "Network" tab of your
      developer tools.
    </p>
  </div>
);

export default StructuredErrorsPage;
