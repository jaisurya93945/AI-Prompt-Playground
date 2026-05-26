import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";
import type { Message } from "../App";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "user" : "assistant"
      }`}
    >
      <div className="message-card">
        {message.type === "image" ? (
          <img
            src={message.imageUrl}
            className="generated-image"
          />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children } = props;

                return (
                  <CodeBlock
                    code={String(children)}
                  />
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}