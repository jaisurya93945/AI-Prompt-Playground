import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

type Props = {
  role: "user" | "assistant";
  content?: string;
  image?: string;
  type: "text" | "image";
};

export default function ChatMessage({
  role,
  content,
  image,
  type,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          width: "fit-content",
          padding: "20px",
          borderRadius: "18px",
          background:
            role === "user"
              ? "#00ff88"
              : "rgba(0,0,0,0.75)",

          color: role === "user" ? "#000" : "#d4ffe8",

          border:
            role === "assistant"
              ? "1px solid rgba(0,255,100,0.2)"
              : "none",
        }}
      >
        {type === "image" && image && (
          <img
            src={image}
            alt="generated"
            style={{
              width: "100%",
              borderRadius: "14px",
            }}
          />
        )}

        {content && (
          <ReactMarkdown
            components={{
              code(props) {
                return (
                  <CodeBlock code={String(props.children)} />
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}