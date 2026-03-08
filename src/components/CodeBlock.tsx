import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

interface Token {
  text: string;
  type: "plain" | "keyword" | "string" | "comment" | "number";
}

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "import", "from", "export",
  "default", "if", "else", "for", "while", "new", "async", "await",
  "try", "catch", "type", "interface", "extends", "implements", "enum",
  "class", "throw", "of", "in", "true", "false", "null", "undefined",
  "npm", "npx", "yarn", "pnpm", "bun", "cd", "mkdir", "install", "add",
]);

const tokenizeLine = (line: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;
  let buf = "";

  const flush = () => {
    if (buf) {
      // Split buffer into words and check for keywords/numbers
      const wordRegex = /(\b\w+\b|\S)/g;
      let match: RegExpExecArray | null;
      let lastIndex = 0;

      while ((match = wordRegex.exec(buf)) !== null) {
        // Add any gap before this match
        if (match.index > lastIndex) {
          tokens.push({ text: buf.slice(lastIndex, match.index), type: "plain" });
        }
        const word = match[0];
        if (KEYWORDS.has(word)) {
          tokens.push({ text: word, type: "keyword" });
        } else if (/^\d+\.?\d*$/.test(word)) {
          tokens.push({ text: word, type: "number" });
        } else {
          tokens.push({ text: word, type: "plain" });
        }
        lastIndex = match.index + match[0].length;
      }
      // Remaining
      if (lastIndex < buf.length) {
        tokens.push({ text: buf.slice(lastIndex), type: "plain" });
      }
      buf = "";
    }
  };

  while (i < line.length) {
    // Check for line comment
    if (line[i] === "/" && line[i + 1] === "/") {
      // Make sure we're not inside a string (check if we have an odd number of quotes before)
      // Simple heuristic: if the // is preceded by a : and space, it's likely a URL protocol comment false positive
      // Actually just check if we're inside a string context by looking at the tokens so far
      flush();
      tokens.push({ text: line.slice(i), type: "comment" });
      return tokens;
    }

    // Check for strings
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      flush();
      const quote = line[i];
      let str = quote;
      i++;
      while (i < line.length) {
        if (line[i] === "\\" && i + 1 < line.length) {
          str += line[i] + line[i + 1];
          i += 2;
          continue;
        }
        str += line[i];
        if (line[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      tokens.push({ text: str, type: "string" });
      continue;
    }

    buf += line[i];
    i++;
  }

  flush();
  return tokens;
};

const isTerminal = (language?: string) =>
  ["bash", "sh", "shell", "terminal", "zsh"].includes(language?.toLowerCase() ?? "");

const TokenSpan: React.FC<{ token: Token }> = ({ token }) => {
  const classMap: Record<string, string> = {
    keyword: "token-keyword",
    string: "token-string",
    comment: "token-comment",
    number: "token-number",
    plain: "",
  };
  const cls = classMap[token.type];
  if (cls) {
    return <span className={cls}>{token.text}</span>;
  }
  return <>{token.text}</>;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "typescript", filename }) => {
  const [copied, setCopied] = useState(false);
  const terminal = isTerminal(language);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

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
          {lines.map((line, i) => {
            const tokens = tokenizeLine(line);
            return (
              <div key={i} className="flex">
                {!terminal && (
                  <span className="token-line-number select-none inline-block w-8 text-right mr-4 shrink-0">
                    {i + 1}
                  </span>
                )}
                {terminal && (
                  <span className="token-prompt select-none inline-block mr-3 shrink-0">$</span>
                )}
                <span>
                  {tokens.length > 0 ? tokens.map((t, j) => <TokenSpan key={j} token={t} />) : " "}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
