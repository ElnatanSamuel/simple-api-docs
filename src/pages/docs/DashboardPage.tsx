import React from "react";
import CodeBlock from "@/components/CodeBlock";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const moistureData = [
  { time: "6am", fieldA: 45, fieldB: 38, fieldC: 52 },
  { time: "8am", fieldA: 48, fieldB: 42, fieldC: 50 },
  { time: "10am", fieldA: 42, fieldB: 39, fieldC: 47 },
  { time: "12pm", fieldA: 38, fieldB: 35, fieldC: 43 },
  { time: "2pm", fieldA: 35, fieldB: 32, fieldC: 40 },
  { time: "4pm", fieldA: 40, fieldB: 36, fieldC: 44 },
  { time: "6pm", fieldA: 44, fieldB: 40, fieldC: 48 },
];

const yieldData = [
  { month: "Jan", yield: 2400 },
  { month: "Feb", yield: 1398 },
  { month: "Mar", yield: 5800 },
  { month: "Apr", yield: 3908 },
  { month: "May", yield: 4800 },
  { month: "Jun", yield: 3800 },
  { month: "Jul", yield: 6300 },
  { month: "Aug", yield: 5900 },
];

const cropData = [
  { name: "Wheat", value: 35 },
  { name: "Corn", value: 28 },
  { name: "Soybean", value: 22 },
  { name: "Rice", value: 15 },
];

const COLORS = [
  "hsl(142, 50%, 32%)",
  "hsl(80, 55%, 50%)",
  "hsl(25, 80%, 45%)",
  "hsl(210, 60%, 45%)",
];

const DashboardPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <p className="text-sm text-primary font-medium mb-2">Data & Analytics</p>
      <h1>Dashboard & Charts</h1>
      <p>
        Farming Labs provides real-time data visualizations for monitoring your farm.
        Below are examples of the built-in chart components.
      </p>

      <h2>Soil Moisture Over Time</h2>
      <p>Track soil moisture levels across different fields throughout the day.</p>
      <div className="not-prose rounded-lg border bg-card p-4 mb-6">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={moistureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 10%, 85%)" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(120, 12%, 89%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area type="monotone" dataKey="fieldA" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.3} />
            <Area type="monotone" dataKey="fieldB" stackId="2" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.3} />
            <Area type="monotone" dataKey="fieldC" stackId="3" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.3} />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h2>Monthly Yield</h2>
      <p>A bar chart showing monthly yield in kilograms.</p>
      <div className="not-prose rounded-lg border bg-card p-4 mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 10%, 85%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
            <Tooltip />
            <Bar dataKey="yield" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Crop Distribution</h2>
      <p>Breakdown of crop types across your farm.</p>
      <div className="not-prose rounded-lg border bg-card p-4 mb-6 flex justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={cropData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {cropData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h2>Code Example</h2>
      <p>Embed a dashboard chart in your app:</p>
      <CodeBlock
        language="typescript"
        filename="components/MoistureChart.tsx"
        code={`import { FarmChart } from '@farming-labs/ui'

export function MoistureChart({ farmId }) {
  return (
    <FarmChart
      type="area"
      sensor="soil-moisture"
      farmId={farmId}
      timeRange="24h"
      fields={['fieldA', 'fieldB', 'fieldC']}
      stacked
    />
  )
}`}
      />
    </div>
  );
};

export default DashboardPage;
