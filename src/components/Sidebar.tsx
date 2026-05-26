import {
  MessageSquare,
  Shield,
  Folder,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">J</h2>

        <button className="new-chat">
          + New Chat
        </button>

        <div className="sidebar-section">
          <p>Workspace</p>

          <div className="sidebar-item">
            <MessageSquare size={18} />
            Chats
          </div>

          <div className="sidebar-item">
            <Shield size={18} />
            Security
          </div>

          <div className="sidebar-item">
            <Folder size={18} />
            Files
          </div>

          <div className="sidebar-item">
            <Settings size={18} />
            Settings
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        CYBER AI SYSTEM
      </div>
    </aside>
  );
}