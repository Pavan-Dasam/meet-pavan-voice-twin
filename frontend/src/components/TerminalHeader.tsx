import React from "react";
import { Square, RotateCcw } from "lucide-react";

interface TerminalHeaderProps {
  isListening: boolean;
  isSpeaking: boolean;
  isPaused?: boolean;
  onInterrupt: () => void;
  onReset: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  isListening,
  isSpeaking,
  onInterrupt,
  onReset
}) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 18px",
      borderBottom: "1px solid var(--border-glass)",
      background: "rgba(255, 255, 255, 0.02)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: isListening ? "#FF2E93" : isSpeaking ? "#00A3FF" : "#10B981",
          boxShadow: `0 0 10px ${isListening ? "#FF2E93" : isSpeaking ? "#00A3FF" : "#10B981"}`
        }} />
        <div>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#F8FAFC" }}>
            {isListening
              ? "Listening to your voice..."
              : isSpeaking
              ? "Speaking response as Pavan Dasam..."
              : "Ready for Questions"}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
            Tap mic to speak or select a prompt
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Animated Audio Equalizer Bars */}
        {isSpeaking && (
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginRight: "6px" }}>
            {[10, 20, 30, 18, 26, 14].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: `${h}px`,
                  background: "#00A3FF",
                  borderRadius: "2px",
                  animation: `soundWave 0.7s infinite ease-in-out ${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Interrupt / Stop Audio Button */}
        {isSpeaking && (
          <button
            onClick={onInterrupt}
            title="Interrupt Voice Output"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              borderRadius: "6px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#FCA5A5",
              fontSize: "0.74rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <Square size={11} />
            <span>Interrupt</span>
          </button>
        )}

        {/* Reset Conversation Button */}
        <button
          onClick={onReset}
          title="Reset Conversation"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border-glass)",
            color: "var(--text-muted)",
            cursor: "pointer"
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};
