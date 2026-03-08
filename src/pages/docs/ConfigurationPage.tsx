import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ConfigurationPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">Core Concepts</p>
    <h1>Configuration</h1>
    <p>Farming Labs uses a single configuration file to manage your entire setup.</p>

    <h2>Configuration File</h2>
    <CodeBlock language="typescript" filename="farm.config.ts" code={`import { defineConfig } from '@farming-labs/core'

export default defineConfig({
  // Project metadata
  name: 'Green Valley Farm',
  region: 'us-east-1',

  // Database settings
  database: {
    retention: '90d',
    compression: true,
    replication: 2,
  },

  // Sensor configuration
  sensors: {
    pollInterval: 5000,
    batchSize: 100,
    retryAttempts: 3,
  },

  // Alert thresholds
  alerts: {
    soilMoisture: { min: 25, max: 75 },
    temperature: { min: -5, max: 45 },
    humidity: { min: 30, max: 90 },
  },

  // Integrations
  integrations: {
    slack: { webhook: process.env.SLACK_WEBHOOK },
    email: { smtp: process.env.SMTP_URL },
  },
})`} />

    <h2>Environment Variables</h2>
    <CodeBlock language="bash" filename=".env" code={`FARM_API_KEY=fl_live_abc123
FARM_REGION=us-east-1
SLACK_WEBHOOK=https://hooks.slack.com/services/...
SMTP_URL=smtp://user:pass@smtp.example.com:587`} />
  </div>
);

export default ConfigurationPage;
