import React from "react";

const RequestDeduplicationPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Advanced</p>
    <h1>Request Deduplication</h1>
    <p>Performance on the web and mobile is often bottlenecked by redundant network requests. simple-api solves this problem with an integrated request deduplication system for GET requests.</p>

    <h2>How it works</h2>
    <p>When you initiate a <code>GET</code> request, the engine generates a unique key derived from:</p>
    <ul>
      <li>The HTTP Method (GET)</li>
      <li>The Full URL (including search parameters)</li>
      <li>The Request Body (if any)</li>
    </ul>
    <p>If an identical request is already "in-flight" (still waiting for a server response), the engine does <strong>not</strong> make a second network call. Instead, it returns the same promise as the first caller.</p>

    <h2>Benefits</h2>

    <h3>Bandwidth Savings</h3>
    <p>Users on limited data plans or slow connections save bandwidth as the engine treats multiple components requesting the same data as a single transaction.</p>

    <h3>Battery Efficiency</h3>
    <p>On mobile devices, waking up the radio is one of the most power-consuming tasks. Deduplication minimizes radio activity by bundling concurrent work.</p>

    <h3>Consistency</h3>
    <p>Deduplication ensures that every part of your UI receives the exact same data payload for identical requests, preventing "state drift" where two components might render slightly different versions of the same entity.</p>

    <h2>Implementation Details</h2>
    <p>The engine maintains an internal <code>{"Map<string, Promise<any>>"}</code> of inflight requests. Once a request completes (either successfully or with an error), it is automatically removed from the map, allowing subsequent calls to trigger a fresh network request if needed.</p>
  </div>
);

export default RequestDeduplicationPage;
