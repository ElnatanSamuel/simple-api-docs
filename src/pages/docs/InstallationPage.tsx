import React from "react";
import CodeBlock from "@/components/CodeBlock";

const InstallationPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <p className="text-sm text-primary font-medium mb-2">Getting Started</p>
      <h1>Installation</h1>
      <p>Follow these steps to install Farming Labs and configure your environment.</p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js 18+ or Bun 1.0+</li>
        <li>A Farming Labs account (free tier available)</li>
        <li>Compatible IoT sensors (optional for development)</li>
      </ul>

      <h2>Package Manager</h2>
      <p>Install with your preferred package manager:</p>

      <CodeBlock language="bash" filename="npm" code="npm install @farming-labs/core" />
      <CodeBlock language="bash" filename="yarn" code="yarn add @farming-labs/core" />
      <CodeBlock language="bash" filename="pnpm" code="pnpm add @farming-labs/core" />
      <CodeBlock language="bash" filename="bun" code="bun add @farming-labs/core" />

      <h2>Environment Setup</h2>
      <p>Create a <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.env</code> file in your project root:</p>
      <CodeBlock
        language="bash"
        filename=".env"
        code={`FARM_API_KEY=your_api_key_here
FARM_REGION=us-east-1
FARM_LOG_LEVEL=info
FARM_SENSOR_POLL_INTERVAL=5000`}
      />

      <h2>Verify Installation</h2>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`npx farming-labs doctor
# ✓ Node.js 20.11.0
# ✓ @farming-labs/core 2.4.0
# ✓ API key configured
# ✓ Region: us-east-1
# ✓ All checks passed!`}
      />
    </div>
  );
};

export default InstallationPage;
