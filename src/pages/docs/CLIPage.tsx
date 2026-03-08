import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { Terminal } from "lucide-react";

const CLIPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
        <Terminal className="h-4 w-4" />
        CLI & Scripts
      </div>
      <h1>CLI Tools</h1>
      <p>
        The Farming Labs CLI provides powerful command-line tools to manage your farm,
        deploy automations, and query sensor data.
      </p>

      <h2>Global Installation</h2>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`npm install -g @farming-labs/cli

# Verify installation
farming-labs --version
# v2.4.0`}
      />

      <h2>Available Commands</h2>

      <h3>Initialize a Project</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`farming-labs init <project-name> [options]

# Options:
#   --template <name>    Use a starter template (default: basic)
#   --sensors <list>     Pre-configure sensors (comma-separated)
#   --region <region>    Set deployment region

# Example:
farming-labs init my-greenhouse \\
  --template greenhouse \\
  --sensors temperature,humidity,co2 \\
  --region eu-west-1`}
      />

      <h3>Deploy Automations</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`farming-labs deploy [options]

# Deploy all automation scripts
farming-labs deploy

# Deploy specific automation
farming-labs deploy --only irrigation

# Dry run
farming-labs deploy --dry-run`}
      />

      <h3>Query Sensor Data</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`farming-labs query <sensor> [options]

# Get latest reading
farming-labs query soil-moisture --latest

# Get time range
farming-labs query temperature \\
  --from "2024-01-01" \\
  --to "2024-03-01" \\
  --interval 1h \\
  --format csv > readings.csv

# Watch real-time data
farming-labs query humidity --watch`}
      />

      <h2>Automation Scripts</h2>
      <p>Create automation scripts to respond to sensor triggers:</p>
      <CodeBlock
        language="typescript"
        filename="automations/irrigation.ts"
        code={`import { defineAutomation, triggers, actions } from '@farming-labs/core'

export default defineAutomation({
  name: 'Smart Irrigation',
  description: 'Automatically water fields when soil moisture drops',

  trigger: triggers.sensorBelow({
    sensor: 'soil-moisture',
    threshold: 30,
    duration: '15m', // Must be below for 15 minutes
  }),

  conditions: [
    // Don't water if rain is expected
    triggers.weatherNot('rain', { within: '6h' }),
    // Only during daytime
    triggers.timeRange('06:00', '20:00'),
  ],

  action: actions.sequence([
    actions.log('Starting irrigation cycle'),
    actions.activateZone('irrigation-zone-1', {
      duration: '20m',
      flowRate: 2.5, // liters per minute
    }),
    actions.notify({
      channel: 'slack',
      message: 'Irrigation cycle completed for Zone 1',
    }),
  ]),
})`}
      />

      <h3>Running Scripts Locally</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Run an automation in test mode
farming-labs run automations/irrigation.ts --test

# Run with mock sensor data
farming-labs run automations/irrigation.ts \\
  --mock-sensor soil-moisture=25

# Schedule a cron job
farming-labs cron add "0 6 * * *" \\
  "farming-labs run automations/morning-check.ts"`}
      />
    </div>
  );
};

export default CLIPage;
