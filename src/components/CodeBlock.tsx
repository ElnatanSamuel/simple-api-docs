import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const tokenize = (code: string, language: string) => {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let tokenized = line;
    // Comments
    tokenized = tokenized.replace(/(\/\/.*$|#.*$)/gm, '<span class="token-comment">$1</span>');
    // Strings
    tokenized = tokenized.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="token-string">$1</span>');
    // Keywords
    const keywords = ["const", "let", "var", "function", "return", "import", "from", "export", "default", "if", "else", "for", "while", "class", "new", "async", "await", "try", "catch", "npm", "npx", "yarn", "bun", "cd", "mkdir", "echo", "sudo", "pip", "python"];
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      tokenized = tokenized.replace(regex, '<span class="token-keyword">$1</span>');
    });
    // Numbers
    tokenized = tokenized.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');
    return tokenized;
  });
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "typescript", filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = tokenize(code, language);

  return (
    <div className="code-block my-4">
      <div className="code-header">
        <span>{filename || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="text-[13px] leading-6">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="token-comment select-none inline-block w-8 text-right mr-4 opacity-50">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: line || " " }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
