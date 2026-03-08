import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ReactNativePage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Adapters</p>
    <h1>React Native Adapter</h1>
    <p>The <code>@simple-api/react-native</code> package is a mobile-optimized version of our React adapter. It focuses on battery efficiency and handling mobile-specific environment constraints.</p>

    <h2>Installation</h2>
    <CodeBlock language="bash" filename="terminal" code="npm install @simple-api/react-native @simple-api/core @tanstack/react-query" />

    <h2>Mobile Optimizations</h2>

    <h3>Battery Efficiency</h3>
    <p>Mobile radios consume significant power. By leveraging the core engine's request deduplication, we ensure that duplicate requests are never sent over the air, saving both data and battery.</p>

    <h3>Request Cancellation</h3>
    <p>When a screen is unmounted on a mobile device, the adapter automatically cancels any pending network requests using <code>AbortController</code>, preventing useless work and potential memory leaks.</p>

    <h2>Usage</h2>
    <p>Usage is identical to the standard React Adapter. We recommend creating a shared API definition that can be used across both your web and mobile codebases.</p>
    <CodeBlock language="typescript" filename="mobile-api.ts" code={`// Shared definition
export const apiDef = createApi({ ... });

// Mobile usage
import { createReactAdapter } from "@simple-api/react-native";
export const useMobileApi = createReactAdapter(apiDef);`} />

    <h2>Best Practices</h2>

    <h3>Network State Handling</h3>
    <p>Use the <code>enabled</code> option in <code>hookOptions</code> to prevent requests when the device is known to be offline.</p>

    <h3>Background Fetching</h3>
    <p>TanStack Query provides excellent support for background fetching. On mobile, be mindful of <code>staleTime</code> to avoid excessive background activity that might trigger system throttling.</p>
  </div>
);

export default ReactNativePage;
