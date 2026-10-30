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
      borderBottom: "1px solid #E2E8F0",
      background: "#F8FAFC"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: isListening ? "#E11D48" : isSpeaking ? "#0284C7" : "#10B981",
          boxShadow: `0 0 10px ${isListening ? "rgba(225, 29, 72, 0.4)" : isSpeaking ? "rgba(2, 132, 199, 0.4)" : "rgba(16, 185, 129, 0.4)"}`
        }} />
        <div>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}>
            {isListening
              ? "Listening to your voice..."
              : isSpeaking
              ? "Speaking response as Pavan Dasam..."
              : "Ready for Questions"}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#64748B" }}>
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
                  background: "#0284C7",
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
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              color: "#DC2626",
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
            background: "#F1F5F9",
            border: "1px solid #E2E8F0",
            color: "#64748B",
            cursor: "pointer"
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};
