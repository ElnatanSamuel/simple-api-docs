import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const escapeHtml = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const tokenize = (code: string, language: string) => {
  const lines = code.split("\n");
  return lines.map((rawLine) => {
    // Store strings and comments separately to avoid highlighting inside them
    const placeholders: string[] = [];
    let line = escapeHtml(rawLine);

    // Extract comments first
    line = line.replace(/(\/\/.*)$/gm, (m) => {
      placeholders.push(`<span class="token-comment">${m}</span>`);
      return `__PH${placeholders.length - 1}__`;
    });

    // Extract strings
    line = line.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (m) => {
      placeholders.push(`<span class="token-string">${m}</span>`);
      return `__PH${placeholders.length - 1}__`;
    });

    // Keywords
    const keywords = [
      "const", "let", "var", "function", "return", "import", "from", "export",
      "default", "if", "else", "for", "while", "class", "new", "async", "await",
      "try", "catch", "type", "interface", "extends", "implements", "enum",
      "npm", "npx", "yarn", "pnpm", "bun", "cd", "mkdir", "install", "add",
    ];
    keywords.forEach((kw) => {
      const regex = new RegExp(`(?<![\\w-])\\b(${kw})\\b(?!__)`, "g");
      line = line.replace(regex, '<span class="token-keyword">$1</span>');
    });

    // Numbers
    line = line.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');

    // Restore placeholders
    line = line.replace(/__PH(\d+)__/g, (_, i) => placeholders[Number(i)]);

    return line;
  });
};

const isTerminal = (language?: string) =>
  ["bash", "sh", "shell", "terminal", "zsh"].includes(language?.toLowerCase() ?? "");

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "typescript", filename }) => {
  const [copied, setCopied] = useState(false);
  const terminal = isTerminal(language);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = tokenize(code, language);

  return (
    <div className={`code-block my-4 ${terminal ? "code-terminal" : ""}`}>
      <div className="code-header">
        <div className="flex items-center gap-2">
          {terminal && <Terminal className="h-3.5 w-3.5 opacity-60" />}
          <span>{filename || language}</span>
        </div>
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
              {!terminal && (
                <span className="token-line-number select-none inline-block w-8 text-right mr-4 shrink-0">
                  {i + 1}
                </span>
              )}
              {terminal && (
                <span className="token-prompt select-none inline-block mr-3 shrink-0">$</span>
              )}
              <span dangerouslySetInnerHTML={{ __html: line || " " }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
