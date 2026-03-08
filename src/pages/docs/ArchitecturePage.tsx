import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ArchitecturePage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">Core Concepts</p>
    <h1>Architecture</h1>
    <p>Farming Labs follows a modular, event-driven architecture designed for scalability and reliability.</p>

    <h2>System Overview</h2>
    <div className="not-prose rounded-lg border bg-card p-6 mb-6 font-mono text-xs leading-6 overflow-x-auto">
      <pre className="text-muted-foreground">{`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Sensors   │────▶│  Data Ingest │────▶│  Time-Series│
│  (IoT/Edge) │     │   Gateway    │     │   Database  │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                    ┌──────────────┐     ┌───────▼──────┐
                    │  Automation  │◀────│   Analytics  │
                    │   Engine     │     │    Engine    │
                    └──────┬───────┘     └──────────────┘
                           │
                    ┌──────▼───────┐
                    │  Actions &   │
                    │ Notifications│
                    └──────────────┘
      `}</pre>
    </div>

    <h2>Core Modules</h2>
    <ul>
      <li><strong>Data Ingest Gateway</strong> — Handles incoming sensor data with buffering and deduplication</li>
      <li><strong>Time-Series Database</strong> — Optimized storage for chronological sensor readings</li>
      <li><strong>Analytics Engine</strong> — Real-time aggregation, anomaly detection, and trend analysis</li>
      <li><strong>Automation Engine</strong> — Trigger-based workflows and scheduled tasks</li>
    </ul>

    <h2>Plugin System</h2>
    <CodeBlock language="typescript" filename="plugins/weather.ts" code={`import { definePlugin } from '@farming-labs/core'

export default definePlugin({
  name: 'weather-integration',
  version: '1.0.0',
  
  async setup(farm) {
    farm.registerDataSource('weather', {
      poll: '30m',
      fetch: async () => {
        const res = await fetch(farm.config.weatherApiUrl)
        return res.json()
      }
    })
  }
})`} />
  </div>
);

export default ArchitecturePage;
