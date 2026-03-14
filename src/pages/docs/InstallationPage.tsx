import React from "react";
import CodeBlock from "@/components/CodeBlock";

const InstallationPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Getting Started
    </p>
    <h1>Installation</h1>
    <p>
      simple-api is distributed as a set of scoped packages on NPM. Install the
      individual components based on your project requirements.
    </p>

    <h2>Core Engine</h2>
    <p>
      The core engine is required for all projects as it contains the base
      factory and global middleware definitions.
    </p>
    <CodeBlock
      language="bash"
      filename="npm"
      code="npm install @simple-api/core"
    />

    <h2>React Adapter</h2>
    <p>
      If you are building a React application, you will need the React adapter
      and TanStack Query.
    </p>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @simple-api/react @tanstack/react-query"
    />

    <h2>Svelte Adapter</h2>
    <p>For Svelte applications, install the Svelte-specific adapter.</p>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @simple-api/svelte @tanstack/svelte-query"
    />

    <h2>State Management</h2>
    <p>
      To synchronize your API responses with Zustand, install the Zustand
      middleware.
    </p>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @simple-api/zustand zustand"
    />

    <h2>Mobile (React Native)</h2>
    <p>The React Native adapter is optimized for mobile environments.</p>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @simple-api/react-native @tanstack/react-query"
    />

    <h2>Requirements</h2>
    <ul>
      <li>
        <strong>TypeScript</strong>: version 4.5 or higher is recommended for
        full inference support.
      </li>
      <li>
        <strong>Node.js</strong>: version 18 or higher (for the native fetch
        API).
      </li>
      <li>
        <strong>Browsers</strong>: Modern browsers with fetch and
        AbortController support.
      </li>
    </ul>
  </div>
);

export default InstallationPage;
