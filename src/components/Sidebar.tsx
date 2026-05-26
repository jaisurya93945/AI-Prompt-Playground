
export default function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        background: "#0a0a0a",
        borderRight: "1px solid rgba(0,255,120,0.15)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h1
          style={{
            color: "#00ff88",
            fontSize: "24px",
            fontWeight: 800,
            textShadow: "0 0 18px #00ff88",
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
          marginTop: "30px",
          background: "#00ff88",
          border: "none",
          color: "#000",
          padding: "14px",
          borderRadius: "14px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        + New Chat
      </button>

      <div
        style={{
          marginTop: "40px",
          color: "#666",
          fontSize: "13px",
        }}
      >
        RECENT CHATS
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            background: "#111",
            padding: "12px",
            borderRadius: "12px",
          }}
        >
          React Security
        </div>

        <div
          style={{
            background: "#111",
            padding: "12px",
            borderRadius: "12px",
          }}
        >
          Kali Linux
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          color: "#555",
          fontSize: "12px",
        }}
      >
        developed by JAISURYA ⚡
      </div>
    </div>
  );
}