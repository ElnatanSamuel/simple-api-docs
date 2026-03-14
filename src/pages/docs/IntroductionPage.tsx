import React from "react";
import {
  Zap,
  Shield,
  Terminal,
  Layers,
  Network,
  Repeat,
  Globe,
  Smartphone,
  ArrowRight,
  Cpu,
  Workflow,
  Box,
  Key,
  Infinity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IntroductionPage: React.FC = () => (
  <div className="doc-prose pb-20">
    {/* Page Header */}
    <div className="mb-10">
      <h1>Introduction</h1>
      <p className="text-base text-muted-foreground leading-relaxed mt-4">
        simple-api is a production grade, type safe API client builder designed
        for high scale TypeScript applications. It provides a structured,
        service-oriented architecture with built in resilience.
      </p>
    </div>

    {/* Integrated Quick Start */}
    <div className="px-6 py-1 my-10 bg-muted/30 border border-border flex flex-col md:flex-row items-start md:items-center justify-between">
      <div>
        <h3 className="text-lg font-bold tracking-tight">Rapid Integration</h3>
        <p className="text-sm text-muted-foreground">
          Get up and running in your project in less than 5 minutes.
        </p>
      </div>
      <Link to="/docs/getting-started" className="no-underline">
        <Button className="rounded-none px-6 h-10 bg-foreground text-background hover:bg-foreground/90 font-bold transition-all border border-foreground/10">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>

    {/* Technical Core Architecture */}
    <h2 className="border-b-0 mt-16 mb-6">Core Architecture</h2>
    <p className="text-muted-foreground mb-10">
      Unlike standard fetch wrappers, simple-api follows a strict architectural
      blueprint to ensure scalability and maintainability.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-16">
      {[
        {
          title: "Service Factoring",
          desc: "Endpoints are organized into logical services. This creates a clear hierarchy and allows for service-level configuration (baseUrls, default headers).",
          icon: Box,
        },
        {
          title: "Middleware Pipeline",
          desc: "A sequential execution chain for request/response logic. Every request passes through a series of handlers that can mutate, delay, or log operations.",
          icon: Layers,
        },
        {
          title: "Singleton Context",
          desc: "Every network call shares a unified context object, making it easy to track request IDs, timing, and metadata across the entire lifecycle.",
          icon: Key,
        },
        {
          title: "Interception Layer",
          desc: "Parallel to the middleware pipeline, interceptors provide global entry and exit points that cannot be bypassed by local service logic.",
          icon: Infinity,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 bg-background hover:bg-muted/10 transition-colors"
        >
          <h4 className="flex items-center gap-2 m-0 font-bold text-base">
            <item.icon className="h-4 w-4 text-muted-foreground" />
            {item.title}
          </h4>
          <p className="text-sm text-muted-foreground m-0 mt-3 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Comparison: Middleware vs Interceptors */}
    <h3 className="mt-16 mb-6">Middleware vs Interceptors</h3>
    <div className="overflow-x-auto border border-border">
      <table className="w-full border-collapse m-0">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">
              Feature
            </th>
            <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">
              Middleware
            </th>
            <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">
              Interceptors
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="border-b border-border">
            <td className="p-4 font-bold">Execution</td>
            <td className="p-4 text-muted-foreground">
              Sequential pipeline (chains)
            </td>
            <td className="p-4 text-muted-foreground">
              Global hooks (observers)
            </td>
          </tr>
          <tr className="border-b border-border">
            <td className="p-4 font-bold">Scope</td>
            <td className="p-4 text-muted-foreground">
              Service or Endpoint level
            </td>
            <td className="p-4 text-muted-foreground">
              Always Global (App-wide)
            </td>
          </tr>
          <tr className="border-b border-border">
            <td className="p-4 font-bold">Power</td>
            <td className="p-4 text-muted-foreground">
              Can abort or short-circuit
            </td>
            <td className="p-4 text-muted-foreground">
              Observation and decoration
            </td>
          </tr>
          <tr>
            <td className="p-4 font-bold">Complexity</td>
            <td className="p-4 text-muted-foreground">
              High (requires next())
            </td>
            <td className="p-4 text-muted-foreground">
              Low (native callbacks)
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Refined Enterprise Stack */}
    <h2 className="border-b-0 mt-24 mb-2">Enterprise Capabilities</h2>
    <p className="text-muted-foreground mb-10">
      Advanced operational tools for managing high-volume network traffic and
      state.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        {
          title: "Global Interceptors",
          desc: "Pre-request and post-response hooks that execute outside the middleware pipeline for absolute consistency.",
          icon: Infinity,
        },
        {
          title: "Industrial Pager",
          desc: "A specialized class that wraps endpoints to manage index, limit, or cursor-based state automatically.",
          icon: Repeat,
        },
        {
          title: "Smart Polling",
          desc: "Reactive request scheduling with built-in jitter and backoff to protect your backend from spikes.",
          icon: Network,
        },
        {
          title: "PWA SWR",
          desc: "Stale-While-Revalidate caching that hydrates the UI instantly from the Web Cache API.",
          icon: Globe,
        },
        {
          title: "OpenAPI CLI",
          desc: "Automation tools to scaffold type-safe definitions directly from OpenAPI 3.0 schema files.",
          icon: Terminal,
        },
        {
          title: "Operational Queue",
          desc: "A persistent, serializable mutation queue that survives app restarts on unreliable mobile networks.",
          icon: Smartphone,
        },
      ].map((feature) => (
        <div
          key={feature.title}
          className="p-6 border border-border bg-card/50 hover:border-foreground/20 transition-all flex flex-col gap-4"
        >
          <div className="h-8 w-8 rounded bg-background border border-border flex items-center justify-center shrink-0">
            <feature.icon className="h-4 w-4 text-foreground/60" />
          </div>
          <div>
            <h4 className="m-0 text-sm font-bold uppercase tracking-wider">
              {feature.title}
            </h4>
            <p className="m-0 mt-2 text-xs text-muted-foreground leading-relaxed">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Ecosystem Section */}
    <h2 className="border-b-0 mt-16 mb-6">Ecosystem packages</h2>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {["core", "react", "react-native", "svelte", "zustand"].map((pkg) => (
        <div
          key={pkg}
          className="text-[10px] font-mono p-3 border border-border text-center bg-muted/10 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all cursor-default uppercase font-bold tracking-tight"
        >
          @{pkg}
        </div>
      ))}
    </div>
  </div>
);

export default IntroductionPage;
