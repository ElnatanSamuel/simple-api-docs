import React from "react";

const CliToolsPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>Command Line Tools</h1>
    <p className="text-lg !text-foreground mb-8">
      simple-api provides several CLI utilities to automate your workflow, from
      code generation to Postman integration.
    </p>

    <h2>OpenAPI Generator</h2>
    <p>
      Generate a typed <code>api.ts</code> definition directly from a
      Swagger/OpenAPI spec.
    </p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`# Usage
npx tsx scripts/openapi-gen.ts <path-to-swagger.json>`}
      </code>
    </pre>

    <p>The script will:</p>
    <ol>
      <li>Parse every route and HTTP method.</li>
      <li>Group routes into services based on their path structure.</li>
      <li>
        Convert path parameters (e.g., <code>{`{id}`}</code>) to simple-api
        format (<code>:id</code>).
      </li>
      <li>
        Output a ready-to-use definition at <code>src/api.generated.ts</code>.
      </li>
    </ol>

    <hr className="my-10" />

    <h2>Postman Collection Generator</h2>
    <p>
      Export your simple-api definition into a Postman Collection (v2.1) for
      easy testing and sharing with your team.
    </p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`# Usage
npx tsx scripts/postman-gen.ts <path-to-api.ts>`}
      </code>
    </pre>

    <p>The script will:</p>
    <ol>
      <li>
        Extract the <code>baseUrl</code> and all services/endpoints.
      </li>
      <li>Create folders for each service.</li>
      <li>Generate sample request bodies for mutations.</li>
      <li>
        Output a <code>postman_collection.json</code> file.
      </li>
    </ol>
  </div>
);

export default CliToolsPage;
