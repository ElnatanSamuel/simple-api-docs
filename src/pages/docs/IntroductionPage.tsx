import React from "react";
import CodeBlock from "@/components/CodeBlock";

const IntroductionPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Overview</p>
    <h1>Introduction</h1>
    <p className="text-lg !text-foreground/70 mb-8">
      simple-api is a production-grade, type-safe API client builder designed for high-scale TypeScript applications. It abstracts away the boilerplate of the native fetch API, providing a structured, service-oriented architecture with built-in resilience, performance, and multi-framework support.
    </p>

    <h2>Why simple-api?</h2>
    <p>
      Modern web and mobile applications often struggle with disorganized API calls, inconsistent error handling, and redundant network requests. simple-api was built to solve these problems by providing a centralized engine that manages every aspect of your network layer.
    </p>

    <h3>Core Principles</h3>
    <ol>
      <li><strong>Extreme Type Safety</strong>: End-to-end TypeScript inference ensures that your parameters, query strings, and response bodies are always correctly typed without manual casting.</li>
      <li><strong>Modular Resilience</strong>: A tiered middleware system allows you to inject logic (retries, logging, auth) at the global, service, or endpoint level.</li>
      <li><strong>Performance by Default</strong>: Integrated request deduplication for GET requests prevents redundant network calls, saving bandwidth and battery life on mobile.</li>
      <li><strong>Framework Agnostic Core</strong>: The core engine has zero dependencies and runs in any environment (Node.js, Browser, React Native).</li>
    </ol>

    <h2>Project Structure</h2>
    <p>The project is organized into several modular packages:</p>
    <ul>
      <li><strong>@simple-api/core</strong>: The main engine and middleware library.</li>
      <li><strong>@simple-api/react</strong>: TanStack Query adapter for React applications.</li>
      <li><strong>@simple-api/svelte</strong>: TanStack Query adapter for Svelte applications.</li>
      <li><strong>@simple-api/zustand</strong>: Specialized middleware for store synchronization.</li>
      <li><strong>@simple-api/react-native</strong>: Optimized adapter for mobile environments.</li>
    </ul>
  </div>
);

export default IntroductionPage;
