import { Shield } from "lucide-react";

export default function Topbar() {
  return (
    <div
      style={{
        height: "70px",
        borderBottom: "1px solid rgba(0,255,100,0.1)",
        display: "flex",
        alignItems: "center",
        padding: "0 30px",
        backdropFilter: "blur(10px)",
      }}
    >
      <Shield size={24} color="#00ff88" />

      <div style={{ marginLeft: "12px" }}>
        <div
          style={{
            color: "#00ff88",
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
  );
}