import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import PromptBar from "./components/PromptBar";
import ChatMessage from "./components/ChatMessage";

export interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "code" | "image";
  imageUrl?: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "AI Security Assistant online.\n\nAsk me anything about code, security, AI, or image generation.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(prompt: string) {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      // IMAGE GENERATION
      if (
  prompt.toLowerCase().includes("generate image") ||
  prompt.toLowerCase().includes("create image")
) {

  const imagePrompt = prompt
    .replace("generate image", "")
    .replace("create image", "")
    .trim();

  const imageUrl =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(
      imagePrompt
    )}`;

  const imageResponse: Message = {
    role: "assistant",
    type: "image",
    content: imagePrompt,
    imageUrl,
  };

  setMessages((prev) => [
    ...prev,
    imageResponse,
  ]);

  return;
}

      // API CALL
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
            model: "openai/gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional cybersecurity AI assistant.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const aiText =
        data?.choices?.[0]?.message?.content ||
        "No response received.";

      const aiMessage: Message = {
        role: "assistant",
        content: aiText,
        type: aiText.includes("```") ? "code" : "text",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection failed.",
        },
      ]);
    }
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="chat-layout">
        <div className="chat-header">
          <h1>AI Security Helper</h1>
          <p>Cyber Intelligence Assistant</p>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}

          <div ref={messagesEndRef} />
        </div>

        <PromptBar onSend={handleSend} />
      </main>
    </div>
  );
}
