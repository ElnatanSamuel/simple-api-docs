import React from "react";
import CodeBlock from "@/components/CodeBlock";

const EndpointsPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">API Reference</p>
    <h1>Endpoints</h1>
    <p>The Farming Labs REST API provides full access to your farm data.</p>

    <h2>Base URL</h2>
    <CodeBlock language="bash" filename="base" code="https://api.farminglabs.io/v2" />

    <h2>GET /sensors</h2>
    <p>List all configured sensors.</p>
    <CodeBlock language="bash" filename="terminal" code={`curl -H "Authorization: Bearer \$FARM_API_KEY" \\
  https://api.farminglabs.io/v2/sensors`} />

    <h3>Response</h3>
    <CodeBlock language="json" filename="response.json" code={`{
  "sensors": [
    {
      "id": "soil-1",
      "type": "soil-moisture",
      "status": "active",
      "lastReading": {
        "value": 42.5,
        "unit": "%",
        "timestamp": "2024-03-01T12:00:00Z"
      }
    }
  ]
}`} />

    <h2>POST /sensors/:id/query</h2>
    <p>Query historical sensor data with aggregation.</p>
    <CodeBlock language="typescript" filename="example.ts" code={`const response = await fetch(
  'https://api.farminglabs.io/v2/sensors/soil-1/query',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: '2024-01-01',
      to: '2024-03-01',
      interval: '1h',
      aggregation: 'avg',
    }),
  }
)`} />
  </div>
);

export default EndpointsPage;
