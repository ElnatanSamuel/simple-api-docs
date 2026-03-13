import React from "react";
import CodeBlock from "@/components/CodeBlock";

const SvelteAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Adapters
    </p>
    <h1>Svelte Adapter</h1>
    <p>
      The <code>@simple-api/svelte</code> package brings type safe API
      consumption to Svelte applications. It leverages Svelte's native reactive
      stores and TanStack Query v5.
    </p>

    <h2>Installation</h2>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @simple-api/svelte @simple-api/core @tanstack/svelte-query"
    />

    <h2>Setup</h2>
    <CodeBlock
      language="typescript"
      filename="api.ts"
      code={`import { createApi } from "@simple-api/core";
import { createSvelteAdapter } from "@simple-api/svelte";

const api = createApi({ ... });
export const useApi = createSvelteAdapter(api);`}
    />

    <h2>Queries</h2>
    <p>
      The adapter returns Svelte stores. You can use the <code>$</code> prefix
      to subscribe to them reactively.
    </p>
    <CodeBlock
      language="typescript"
      filename="UserProfile.svelte"
      code={`<script>
  import { useApi } from './api';
  const { users } = useApi();
  const user = users().get({ params: { id: '1' } });
</script>

{#if $user.isLoading}
  <p>Loading...</p>
{:else}
  <h1>{$user.data.name}</h1>
{/if}`}
    />

    <h2>Mutations</h2>
    <p>
      Mutations in Svelte also provide a reactive store and an{" "}
      <code>execute</code> function.
    </p>
    <CodeBlock
      language="typescript"
      filename="UpdateUser.svelte"
      code={`<script>
  import { useApi } from './api';
  const { users } = useApi();
  const mutation = users().update({
    params: { id: '1' },
    invalidates: ['users']
  });
</script>

<button onClick={() => $mutation.execute({ name: 'New' })}>
  {$mutation.isPending ? 'Saving...' : 'Save'}
</button>`}
    />

    <h2>Reactivity Guidelines</h2>
    <p>
      In Svelte, the <code>$</code> subscription is vital. The stores returned
      by the adapter are compliant with the Svelte store contract, ensuring that
      they automatically clean up when the component is unmounted.
    </p>
  </div>
);

export default SvelteAdapterPage;
