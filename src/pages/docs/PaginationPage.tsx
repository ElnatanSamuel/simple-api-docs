import React from "react";

const PaginationPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>Pagination Helper</h1>
    <p className="text-lg !text-foreground mb-8">
      The <code>@simple-api/core</code> package includes a framework-agnostic
      pagination helper that works consistently across React, Svelte, React
      Native, and vanilla TypeScript.
    </p>

    <h2>Usage</h2>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`import { createPagination } from "@simple-api/core";

// Create a pager for a specific endpoint
const pager = createPagination(api.users.list, {
  pageSize: 15,
  pageParam: "p", // Custom query param name
});

// Fetch a specific page
const state = await pager.fetchPage(1);

console.log(state.data); // Array of items
console.log(state.hasNextPage); // Boolean`}
      </code>
    </pre>

    <h2>Configuration Options</h2>
    <ul>
      <li>
        <strong>pageSize</strong>: Number of items to request per call (default:
        20).
      </li>
      <li>
        <strong>pageParam</strong>: Name of the query parameter for the page
        number (default: "page").
      </li>
      <li>
        <strong>limitParam</strong>: Name of the query parameter for the page
        size (default: "limit").
      </li>
      <li>
        <strong>cursorParam</strong>: Name of the query parameter for
        cursor-based pagination (default: "cursor").
      </li>
    </ul>

    <h2>Helper Methods</h2>
    <ul>
      <li>
        <code>fetchPage(page)</code>: Jumps to a specific page.
      </li>
      <li>
        <code>nextPage()</code>: Increments and fetches the next page.
      </li>
      <li>
        <code>prevPage()</code>: Decrements and fetches the previous page.
      </li>
      <li>
        <code>fetchCursor(cursor)</code>: Fetches using a token (useful for
        infinite scrolling).
      </li>
      <li>
        <code>getState()</code>: Returns the current pagination state (data,
        currentPage, etc.).
      </li>
    </ul>

    <h2>Response Normalization</h2>
    <p>
      The helper automatically detects and normalizes common API response
      shapes:
    </p>
    <ul>
      <li>
        <code>data[]</code>
      </li>
      <li>
        <code>results[]</code>
      </li>
      <li>
        <code>items[]</code>
      </li>
      <li>Plain arrays</li>
    </ul>
    <p>
      If your server returns the total count, <code>hasNextPage</code> will be
      calculated accurately. Otherwise, it defaults to checking if the returned
      array length matches the <code>pageSize</code>.
    </p>
  </div>
);

export default PaginationPage;
