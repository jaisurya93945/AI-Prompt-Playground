import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (prompt: string) => void;
}

export default function PromptBar({
  onSend,
}: Props) {
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <div className="prompt-bar">
      <textarea
        placeholder="Ask anything..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();
            send();
          }
        }}
      />

      <button onClick={send}>
        <Send size={18} />
      </button>
    </div>
  );
}