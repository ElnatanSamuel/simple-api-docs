import React from "react";
import CodeBlock from "@/components/CodeBlock";

const QuickStartPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">Getting Started</p>
    <h1>Quick Start</h1>
    <p>Get a working Farming Labs project running in under 5 minutes.</p>

    <h2>Step 1: Create Your Project</h2>
    <CodeBlock language="bash" filename="terminal" code={`npx farming-labs init my-farm
cd my-farm`} />

    <h2>Step 2: Configure Sensors</h2>
    <CodeBlock language="typescript" filename="farm.config.ts" code={`export default {
  name: 'My Farm',
  sensors: [
    { id: 'soil-1', type: 'soil-moisture', pin: 'A0' },
    { id: 'temp-1', type: 'temperature', pin: 'D2' },
  ],
  dashboard: {
    port: 3000,
    refreshInterval: 5000,
  },
}`} />

    <h2>Step 3: Start the Dev Server</h2>
    <CodeBlock language="bash" filename="terminal" code={`npm run dev
# ✓ Dashboard running at http://localhost:3000
# ✓ Connected to 2 sensors
# ✓ Data streaming active`} />

    <h2>Step 4: Deploy</h2>
    <CodeBlock language="bash" filename="terminal" code={`farming-labs deploy --production`} />
    <p>Your farm dashboard is now live! Visit the Dashboard docs to learn about the available chart components.</p>
  </div>
);

export default QuickStartPage;
