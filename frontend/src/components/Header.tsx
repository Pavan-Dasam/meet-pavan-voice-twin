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
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      borderBottom: "1px solid var(--border-subtle)",
      background: "rgba(4, 6, 12, 0.92)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 40
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #00A3FF, #FF2E93)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 16px rgba(0, 163, 255, 0.4)"
        }}>
          <Sparkles size={24} color="#FFF" />
        </div>
        <div>
          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #FFFFFF 0%, #00A3FF 100%)",
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
          padding: "6px 12px",
          borderRadius: "20px",
          background: "rgba(0, 163, 255, 0.08)",
          border: "1px solid rgba(0, 163, 255, 0.25)",
          fontSize: "0.75rem",
          color: "#38BDF8"
        }}>
          <ShieldCheck size={14} color="#38BDF8" />
          <span>Grounded RAG Twin • Anti-Hallucination Active</span>
        </div>

        {/* Audio Mute / Unmute Button */}
        <button
          onClick={onToggleMute}
          title={isMuted ? "Unmute Voice" : "Mute Voice"}
          style={{
            background: isMuted ? "rgba(255, 46, 147, 0.15)" : "rgba(0, 163, 255, 0.12)",
            border: `1px solid ${isMuted ? "rgba(255, 46, 147, 0.4)" : "rgba(0, 163, 255, 0.3)"}`,
            color: isMuted ? "#FF2E93" : "#00A3FF",
            padding: "8px 12px",
            borderRadius: "8px",
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
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-subtle)",
            color: "#CBD5E1",
            padding: "8px 14px",
            borderRadius: "8px",
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
              background: "rgba(0, 163, 255, 0.2)",
              color: "#38BDF8",
              padding: "1px 6px",
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
