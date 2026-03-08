import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { Leaf, Zap, Shield, BarChart3 } from "lucide-react";

const IntroductionPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
        <Leaf className="h-4 w-4" />
        Getting Started
      </div>
      <h1>Introduction to Farming Labs</h1>
      <p className="text-lg !text-foreground/70 mb-8">
        Farming Labs is an open-source platform for precision agriculture analytics,
        sensor data processing, and farm automation workflows.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 not-prose">
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Sub-millisecond data ingestion from IoT sensors" },
          { icon: Shield, title: "Secure by Default", desc: "End-to-end encrypted data pipeline" },
          { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards for crop monitoring" },
          { icon: Leaf, title: "Sustainable", desc: "Optimize resource usage across your farm" },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-lg border bg-card p-4 hover:border-primary/30 transition-colors"
          >
            <f.icon className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-display font-semibold text-sm mb-1">{f.title}</h4>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <h2>Quick Install</h2>
      <p>Get started with Farming Labs in seconds:</p>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`npm install @farming-labs/core @farming-labs/cli
npx farming-labs init my-farm-project
cd my-farm-project
npm run dev`}
      />

      <h2>Basic Usage</h2>
      <p>Here's a minimal example to connect to a sensor and start collecting data:</p>
      <CodeBlock
        language="typescript"
        filename="src/index.ts"
        code={`import { FarmingLabs, SensorConfig } from '@farming-labs/core'

const config: SensorConfig = {
  apiKey: process.env.FARM_API_KEY,
  region: 'us-east-1',
  sensors: ['soil-moisture', 'temperature', 'humidity']
}

const farm = new FarmingLabs(config)

// Start collecting data
const stream = await farm.connect()
stream.on('data', (reading) => {
  console.log(\`[\${reading.sensor}] \${reading.value}\${reading.unit}\`)
})

// Query historical data
const history = await farm.query({
  sensor: 'soil-moisture',
  from: '2024-01-01',
  to: '2024-03-01',
  interval: '1h'
})`}
      />

      <h2>What's Next?</h2>
      <p>
        Check out the Installation guide for detailed setup instructions,
        or jump straight to the Quick Start for a hands-on tutorial.
      </p>
    </div>
  );
};

export default IntroductionPage;
