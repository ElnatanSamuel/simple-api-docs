import React from "react";
import CodeBlock from "@/components/CodeBlock";

const AutomationPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">CLI & Scripts</p>
    <h1>Automation</h1>
    <p>Automate your farm workflows with event-driven scripts and scheduled tasks.</p>

    <h2>Scheduled Tasks</h2>
    <CodeBlock language="typescript" filename="automations/daily-report.ts" code={`import { defineSchedule, reports } from '@farming-labs/core'

export default defineSchedule({
  name: 'Daily Farm Report',
  cron: '0 8 * * *', // Every day at 8am

  async run(farm) {
    const report = await reports.generate({
      type: 'daily-summary',
      sections: ['weather', 'sensors', 'alerts', 'yield'],
      format: 'pdf',
    })

    await farm.notify({
      channel: 'email',
      to: ['farmer@example.com'],
      subject: 'Daily Farm Report',
      attachments: [report],
    })
  },
})`} />

    <h2>Event Triggers</h2>
    <CodeBlock language="typescript" filename="automations/frost-alert.ts" code={`import { defineAutomation, triggers, actions } from '@farming-labs/core'

export default defineAutomation({
  name: 'Frost Protection',

  trigger: triggers.sensorBelow({
    sensor: 'temperature',
    threshold: 2,
    duration: '5m',
  }),

  action: actions.parallel([
    actions.activateHeaters('greenhouse-1'),
    actions.notify({
      channel: 'sms',
      message: 'Frost warning: Temperature below 2°C',
      priority: 'urgent',
    }),
    actions.log('Frost protection activated'),
  ]),
})`} />

    <h2>Deploy Automations</h2>
    <CodeBlock language="bash" filename="terminal" code={`# Deploy all automations
farming-labs deploy automations/

# Check status
farming-labs automations list
# NAME              STATUS    LAST RUN
# Daily Farm Report active    2024-03-01 08:00
# Frost Protection  active    2024-02-28 03:22
# Smart Irrigation  paused    —`} />
  </div>
);

export default AutomationPage;
