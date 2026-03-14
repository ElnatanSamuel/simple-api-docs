import React from "react";

const OfflineQueuePage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Mobile
    </p>
    <h1>Offline Queue (Mobile)</h1>
    <p className="text-lg !text-foreground mb-8">
      Available in the <code>@simple-api/react-native</code> package, the
      Offline Queue allows you to accumulate mutations while the device is
      offline and replay them automatically when the connection is restored.
    </p>

    <h2>Setup</h2>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`import { createOfflineQueue } from "@simple-api/react-native";

const queue = createOfflineQueue({
  maxRetries: 5,
  onSuccess: (id, data) => console.log(\`Item \${id} synced!\`),
});

// Use a network listener to flush
NetInfo.addEventListener((state) => {
  if (state.isConnected) queue.flush();
});`}
      </code>
    </pre>

    <h2>Adding Requests</h2>
    <p>Pass a function that returns a promise (the API call) to the queue.</p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`const id = queue.add(() =>
  api.posts.create({
    body: { content: "Offline post" },
  }),
);`}
      </code>
    </pre>

    <h2>API Reference</h2>
    <ul>
      <li>
        <code>add(executor)</code>: Adds a mutation to the queue.
      </li>
      <li>
        <code>flush()</code>: Attempts to replay all queued mutations in order.
      </li>
      <li>
        <code>pause()</code>: Stops replaying (mutations will still accumulate).
      </li>
      <li>
        <code>resume()</code>: Resumes replaying.
      </li>
      <li>
        <code>clear()</code>: Removes all items from the queue.
      </li>
    </ul>

    <h2>Ordering and Reliability</h2>
    <p>
      The queue maintains strict order of operations. If a mutation depends on a
      previous one, they will be executed in the sequence they were added. Each
      item tracks its own retry attempts, ensuring that a temporary network
      flicker doesn't lose data.
    </p>
  </div>
);

export default OfflineQueuePage;
