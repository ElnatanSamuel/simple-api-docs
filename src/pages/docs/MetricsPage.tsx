import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const tempData = [
  { day: "Mon", indoor: 22, outdoor: 15, soil: 18 },
  { day: "Tue", indoor: 23, outdoor: 18, soil: 19 },
  { day: "Wed", indoor: 21, outdoor: 12, soil: 17 },
  { day: "Thu", indoor: 24, outdoor: 20, soil: 21 },
  { day: "Fri", indoor: 22, outdoor: 16, soil: 18 },
  { day: "Sat", indoor: 25, outdoor: 22, soil: 22 },
  { day: "Sun", indoor: 23, outdoor: 19, soil: 20 },
];

const MetricsPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm text-primary font-medium mb-2">Data & Analytics</p>
    <h1>Metrics</h1>
    <p>Monitor key performance metrics across your farm operations.</p>

    <h2>Temperature Comparison</h2>
    <p>Weekly temperature readings across indoor, outdoor, and soil sensors.</p>
    <div className="not-prose rounded-lg border bg-card p-4 mb-6">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={tempData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 10%, 85%)" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="indoor" stroke="hsl(142, 50%, 32%)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="outdoor" stroke="hsl(80, 55%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="soil" stroke="hsl(25, 80%, 45%)" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <h2>Custom Metrics</h2>
    <CodeBlock language="typescript" filename="metrics.ts" code={`import { defineMetric } from '@farming-labs/core'

export const waterEfficiency = defineMetric({
  name: 'Water Efficiency',
  unit: 'L/kg',
  calculate: (data) => {
    const totalWater = data.sum('water-usage')
    const totalYield = data.sum('crop-yield')
    return totalWater / totalYield
  },
  alert: {
    threshold: 500,
    direction: 'above',
    message: 'Water usage per kg is too high',
  },
})`} />
  </div>
);

export default MetricsPage;
