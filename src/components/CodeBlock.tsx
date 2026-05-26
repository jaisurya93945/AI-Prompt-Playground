import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "16px",
      }}
    >
      <button
        onClick={copyCode}
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          zIndex: 10,
          background: "#00ff88",
          border: "none",
          borderRadius: "8px",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        <Copy size={14} />
      </button>

      <SyntaxHighlighter language="tsx" style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}