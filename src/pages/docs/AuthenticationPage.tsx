import React from "react";
import CodeBlock from "@/components/CodeBlock";

const AuthenticationPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">API Reference</p>
    <h1>Authentication</h1>
    <p>All API requests require authentication via API keys or OAuth2 tokens.</p>

    <h2>API Keys</h2>
    <p>Pass your API key in the Authorization header:</p>
    <CodeBlock language="bash" filename="terminal" code={`curl -H "Authorization: Bearer fl_live_abc123" \\
  https://api.farminglabs.io/v2/sensors`} />

    <h2>SDK Authentication</h2>
    <CodeBlock language="typescript" filename="src/index.ts" code={`import { FarmingLabs } from '@farming-labs/core'

// Using environment variable (recommended)
const farm = new FarmingLabs({
  apiKey: process.env.FARM_API_KEY,
})

// Using OAuth2 token
const farm2 = new FarmingLabs({
  accessToken: await getOAuthToken(),
})`} />

    <h2>Key Scopes</h2>
    <ul>
      <li><strong>read:sensors</strong> — Read sensor data and configuration</li>
      <li><strong>write:sensors</strong> — Configure and manage sensors</li>
      <li><strong>read:analytics</strong> — Access dashboard and reports</li>
      <li><strong>write:automations</strong> — Deploy and manage automations</li>
      <li><strong>admin</strong> — Full account access</li>
    </ul>
  </div>
);

export default AuthenticationPage;
