import React from "react";

const FileUploadsPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>File Uploads (Multi-Part)</h1>
    <p className="text-lg !text-foreground mb-8">
      simple-api simplifies file uploads by automatically converting your
      request body into <code>FormData</code> and managing the necessary HTTP
      headers.
    </p>

    <h2>Usage</h2>
    <p>
      Set the <code>upload: true</code> flag in your request options.
    </p>

    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm mb-6">
      <code className="text-foreground">
        {`const handleUpload = async (file: File) => {
  await api.users.uploadAvatar({
    upload: true,
    body: {
      userId: 42,
      avatar: file, // Can be File, Blob, or FileList
    },
  });
};`}
      </code>
    </pre>

    <h2>Supported Types</h2>
    <p>
      The <code>upload</code> helper automatically detects and handles:
    </p>
    <ul>
      <li>
        <strong>File</strong>: Standard browser file objects.
      </li>
      <li>
        <strong>Blob</strong>: Binary data blobs.
      </li>
      <li>
        <strong>FileList</strong>: Multiple files from an{" "}
        <code>{`<input type="file" multiple>`}</code>.
      </li>
      <li>
        <strong>Primitives</strong>: Strings and numbers (converted to strings
        in the FormData).
      </li>
    </ul>

    <h2>Headers</h2>
    <p>
      When <code>upload: true</code> is set, the engine automatically{" "}
      <strong>removes</strong> the default{" "}
      <code>Content-Type: application/json</code> header. This allows the
      browser to set the correct <code>multipart/form-data</code> header with
      the unique boundary string required by the server.
    </p>
  </div>
);

export default FileUploadsPage;
