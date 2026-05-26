import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
}

export default function CodeBlock({
  code,
}: Props) {
  async function copyCode() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <div className="code-wrapper">
      <div className="code-topbar">
        <span>CODE</span>

        <button onClick={copyCode}>
          <Copy size={15} />
        </button>
      </div>

      <SyntaxHighlighter
        language="tsx"
        style={atomDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}