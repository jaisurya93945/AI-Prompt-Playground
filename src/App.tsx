import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Shield, Copy, Image as ImageIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Message = {
  role: "user" | "assistant";
  content?: string;
  image?: string;
  type: "text" | "image";
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      type: "text",
      content:
        "👋 Welcome to AI Security Helper.\n\nAsk me about:\n- coding\n- cybersecurity\n- hacking labs\n- image generation\n- debugging\n- AI tools",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const generateImage = async (promptText: string) => {
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      promptText
    )}`;

    return imageUrl;
  };

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompt;

    setPrompt("");
    setLoading(true);

    try {
      // IMAGE REQUEST
      if (
        currentPrompt.toLowerCase().includes("generate image") ||
        currentPrompt.toLowerCase().includes("create image") ||
        currentPrompt.toLowerCase().includes("draw")
      ) {
        const image = await generateImage(currentPrompt);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "image",
            image,
          },
        ]);

        setLoading(false);
        return;
      }

      // OPENROUTER API
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_OPENROUTER_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324:free",

            messages: [
              {
                role: "system",
                content: `
You are AI Security Helper 😈

You are:
- professional
- smart
- hacker style
- cybersecurity focused
- premium AI assistant

Rules:
- format code properly
- use markdown
- explain clearly
- keep responses modern
- use hacker/cyber tone lightly
- never act childish
                `,
              },
              {
                role: "user",
                content: currentPrompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const aiText =
        data.choices?.[0]?.message?.content ||
        "⚠ No response received.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiText,
          type: "text",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "text",
          content: "❌ Error connecting to AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#050505",
        color: "#00ff88",
        display: "flex",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* SIDEBAR */}

      <div
        style={{
          width: "260px",
          borderRight: "1px solid rgba(0,255,100,0.15)",
          background: "#080808",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "22px",
              color: "#00ff88",
              textShadow: "0 0 20px #00ff88",
            }}
          >
            AI Security Helper 😈
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "8px",
              fontSize: "13px",
            }}
          >
            Cyberpunk AI Assistant
          </p>
        </div>

        <button
          style={{
            background: "#00ff88",
            color: "#000",
            border: "none",
            padding: "14px",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          + New Chat
        </button>

        <div
          style={{
            marginTop: "20px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Recent Chats
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              padding: "12px",
              background: "#111",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            React Security
          </div>

          <div
            style={{
              padding: "12px",
              background: "#111",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Kali Linux Tips
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: "12px",
            color: "#555",
          }}
        >
          developed by JAISURYA ⚡
        </div>
      </div>

      {/* MAIN CHAT */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background:
            "linear-gradient(to bottom, rgba(0,255,100,0.03), transparent)",
        }}
      >
        {/* MATRIX GRID */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(rgba(0,255,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* TOPBAR */}

        <div
          style={{
            height: "70px",
            borderBottom: "1px solid rgba(0,255,100,0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
            backdropFilter: "blur(10px)",
            zIndex: 10,
          }}
        >
          <Shield size={24} />

          <div style={{ marginLeft: "12px" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              AI Security Helper
            </div>

            <div
              style={{
                color: "#666",
                fontSize: "12px",
              }}
            >
              Premium Cyber Assistant
            </div>
          </div>
        </div>

        {/* MESSAGES */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            zIndex: 2,
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "800px",
                  width: "fit-content",
                  padding: "20px",
                  borderRadius: "20px",
                  background:
                    msg.role === "user"
                      ? "#00ff88"
                      : "rgba(0,0,0,0.75)",

                  color: msg.role === "user" ? "#000" : "#d2ffe8",

                  border:
                    msg.role === "assistant"
                      ? "1px solid rgba(0,255,100,0.2)"
                      : "none",

                  backdropFilter: "blur(14px)",
                  boxShadow:
                    msg.role === "assistant"
                      ? "0 0 20px rgba(0,255,100,0.08)"
                      : "none",
                }}
              >
                {/* IMAGE */}

                {msg.type === "image" && msg.image && (
                  <img
                    src={msg.image}
                    alt="generated"
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                    }}
                  />
                )}

                {/* TEXT */}

                {msg.content && (
                  <ReactMarkdown
                    components={{
                      code(props) {
                        const { children } = props;

                        const codeString = String(children);

                        return (
                          <div
                            style={{
                              marginTop: "16px",
                              position: "relative",
                            }}
                          >
                            <button
                              onClick={() => copyCode(codeString)}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "10px",
                                zIndex: 20,
                                background: "#00ff88",
                                border: "none",
                                padding: "6px 10px",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              <Copy size={14} />
                            </button>

                            <SyntaxHighlighter
                              language="tsx"
                              style={atomDark}
                            >
                              {codeString}
                            </SyntaxHighlighter>
                          </div>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                color: "#00ff88",
                opacity: 0.7,
              }}
            >
              AI is thinking...
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* INPUT */}

        <div
          style={{
            padding: "24px",
            borderTop: "1px solid rgba(0,255,100,0.1)",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(20px)",
            zIndex: 10,
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
                borderRadius: "16px",
                border: "1px solid rgba(0,255,100,0.2)",
                background: "#101010",
                color: "#00ff88",
                cursor: "pointer",
              }}
            >
              <ImageIcon />
            </button>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything..."
              rows={1}
              style={{
                flex: 1,
                resize: "none",
                borderRadius: "18px",
                border: "1px solid rgba(0,255,100,0.15)",
                background: "#0c0c0c",
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
                borderRadius: "18px",
                border: "none",
                background: "#00ff88",
                color: "#000",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;