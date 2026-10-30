import React from "react";
import { ShieldCheck, Sparkles, Sliders, Volume2, VolumeX } from "lucide-react";
import type { HealthStatus } from "../types";

interface HeaderProps {
  health: HealthStatus | null;
  onOpenAdmin: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  health,
  onOpenAdmin,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="glass-panel" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 28px",
      borderBottom: "1px solid var(--border-glass)",
      position: "sticky",
      top: 0,
      zIndex: 40
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(0, 163, 255, 0.9), rgba(255, 46, 147, 0.85))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(0, 163, 255, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
        }}>
          <Sparkles size={24} color="#FFF" />
        </div>
        <div>
          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #FFFFFF 0%, #38BDF8 50%, #FF65B2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Meet Pavan — AI Voice Twin
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            3.5+ Years Exp • Anthropic MCP & LangGraph Certified • Financial & Health Insurance
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Grounding & AI Assistant Disclosure Badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "20px",
          background: "rgba(0, 163, 255, 0.12)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 163, 255, 0.35)",
          fontSize: "0.75rem",
          color: "#38BDF8",
          boxShadow: "0 2px 10px rgba(0, 163, 255, 0.15)"
        }}>
          <ShieldCheck size={14} color="#38BDF8" />
          <span>Full Resume RAG Active</span>
        </div>

        {/* Audio Mute / Unmute Button */}
        <button
          onClick={onToggleMute}
          title={isMuted ? "Unmute Voice" : "Mute Voice"}
          className="glass-pill"
          style={{
            background: isMuted ? "rgba(255, 46, 147, 0.2)" : "rgba(0, 163, 255, 0.18)",
            border: `1px solid ${isMuted ? "rgba(255, 46, 147, 0.5)" : "rgba(0, 163, 255, 0.45)"}`,
            color: isMuted ? "#FF65B2" : "#38BDF8",
            padding: "8px 14px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            fontWeight: 600,
            transition: "all 0.2s"
          }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? "Muted" : "Voice On"}</span>
        </button>

        {/* Admin Portal Toggle */}
        <button
          onClick={onOpenAdmin}
          title="Open Knowledge Base Administration"
          className="glass-pill"
          style={{
            color: "#CBD5E1",
            padding: "8px 14px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            fontWeight: 500,
            transition: "all 0.2s"
          }}
        >
          <Sliders size={15} />
          <span>Admin Portal</span>
          {health && (
            <span style={{
              fontSize: "0.7rem",
              background: "rgba(0, 163, 255, 0.25)",
              color: "#38BDF8",
              padding: "2px 7px",
              borderRadius: "10px"
            }}>
              {health.vector_store.indexed_documents} docs
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
