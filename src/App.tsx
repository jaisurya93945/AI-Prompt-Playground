import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const generateResponse = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {
      setLoading(true);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_OPENROUTER_API_KEY
            }`,

            "Content-Type": "application/json",

            "HTTP-Referer":
              "https://ai-prompt-playground-6m2sd6du3-rhdgcjpgxy-6309s-projects.vercel.app",

            "X-Title": "AI Security Helper",
          },

          body: JSON.stringify({
            model: "deepseek/deepseek-chat",

            messages: [
              {
                role: "system",
                content:
                  "You are a professional AI cybersecurity assistant. Give clean, smart and hacker-style responses.",
              },

              ...messages,

              {
                role: "user",
                content: currentInput,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiReply =
        data?.choices?.[0]?.message?.content ||
        "No response received.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);
    } catch (err: any) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `ERROR: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="matrix"></div>

      <header className="topbar">
        <div>
          <h1>AI Security Helper</h1>
          <p>Cyber Intelligence Assistant</p>
        </div>
      </header>

      <main className="chat-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.role === "user" ? "user" : "assistant"
            }`}
          >
            <div className="bubble">
              <ReactMarkdown
                components={{
                  code(props) {
                    return (
                      <pre className="code-block">
                        <button
                          className="copy-btn"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              String(props.children)
                            )
                          }
                        >
                          Copy
                        </button>

                        <code>{props.children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </main>

      <div className="input-area">
        <textarea
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              generateResponse();
            }
          }}
        />

        <button onClick={generateResponse}>
          Send
        </button>
      </div>
    </div>
  );
}