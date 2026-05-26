import { Image, Send } from "lucide-react";

type Props = {
  prompt: string;
  setPrompt: (value: string) => void;
  handleSend: () => void;
  loading: boolean;
};

export default function PromptBar({
  prompt,
  setPrompt,
  handleSend,
  loading,
}: Props) {
  return (
    <div
      style={{
        padding: "24px",
        borderTop: "1px solid rgba(0,255,100,0.1)",
        background: "#050505",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "14px",
        }}
      >
        <button
          style={{
            width: "55px",
            borderRadius: "14px",
            border: "1px solid rgba(0,255,100,0.2)",
            background: "#111",
            color: "#00ff88",
          }}
        >
          <Image />
        </button>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            borderRadius: "16px",
            border: "1px solid rgba(0,255,100,0.15)",
            background: "#0d0d0d",
            color: "#fff",
            padding: "18px",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            width: "70px",
            borderRadius: "16px",
            border: "none",
            background: "#00ff88",
            color: "#000",
            cursor: "pointer",
          }}
        >
          <Send />
        </button>
      </div>
    </div>
  );
}