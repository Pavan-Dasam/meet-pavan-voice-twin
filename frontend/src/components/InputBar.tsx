import React, { useState } from "react";
import { Mic, MicOff, Send, AlertTriangle } from "lucide-react";

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isListening: boolean;
  transcript: string;
  isSpeechSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  speechError: string | null;
}

export const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  isLoading,
  isListening,
  transcript,
  isSpeechSupported,
  onStartListening,
  onStopListening,
  speechError
}) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query || isLoading) return;
    onSendMessage(query);
    setInputText("");
  };

  const handleMicToggle = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  return (
    <div className="glass-panel" style={{
      padding: "16px 24px",
      borderTop: "1px solid var(--border-glass)",
      position: "relative"
    }}>
      {/* Live Speech Recognition Transcript Overlay */}
      {isListening && transcript && (
        <div style={{
          position: "absolute",
          top: "-46px",
          left: "24px",
          right: "24px",
          background: "rgba(255, 46, 147, 0.2)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 46, 147, 0.5)",
          borderRadius: "10px",
          padding: "8px 16px",
          fontSize: "0.82rem",
          color: "#FFF",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 8px 24px rgba(255, 46, 147, 0.25)"
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#FF2E93",
            animation: "pulse 1s infinite"
          }} />
          <span style={{ fontWeight: 600, color: "#FF65B2" }}>Hearing:</span>
          <span style={{ fontStyle: "italic", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            "{transcript}"
          </span>
        </div>
      )}

      {/* Speech Error Banner */}
      {speechError && (
        <div style={{
          marginBottom: "10px",
          padding: "8px 12px",
          borderRadius: "8px",
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#FCA5A5",
          fontSize: "0.78rem",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <AlertTriangle size={14} />
          <span>{speechError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleMicToggle}
          disabled={!isSpeechSupported || isLoading}
          title={
            !isSpeechSupported
              ? "Speech recognition is not supported in this browser (use Chrome or Edge)"
              : isListening
              ? "Stop listening"
              : "Ask question by voice"
          }
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: !isSpeechSupported || isLoading ? "not-allowed" : "pointer",
            background: isListening
              ? "linear-gradient(135deg, #FF2E93, #E11D48)"
              : "rgba(0, 163, 255, 0.16)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isListening ? "#FF2E93" : "rgba(0, 163, 255, 0.4)"}`,
            color: isListening ? "#FFF" : "#38BDF8",
            transition: "all 0.25s ease",
            boxShadow: isListening
              ? "0 0 25px rgba(255, 46, 147, 0.6)"
              : "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
            flexShrink: 0
          }}
        >
          {isListening ? <MicOff size={22} /> : <Mic size={22} />}
        </button>

        {/* Text Input Fallback */}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isSpeechSupported
                ? "Ask anything about my resume, projects, tech stack, or click a topic above..."
                : "Ask anything about my resume, projects, or experience..."
            }
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "13px 18px",
              background: "rgba(15, 23, 42, 0.55)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--border-glass)",
              borderRadius: "14px",
              color: "#F8FAFC",
              fontSize: "0.92rem",
              outline: "none",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
              transition: "all 0.25s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00A3FF";
              e.target.style.boxShadow = "0 0 16px rgba(0, 163, 255, 0.35), inset 0 2px 4px rgba(0, 0, 0, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border-glass)";
              e.target.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.3)";
            }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: !inputText.trim() || isLoading
              ? "rgba(255, 255, 255, 0.05)"
              : "linear-gradient(135deg, #00A3FF, #0284C7)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: !inputText.trim() || isLoading ? "#64748B" : "#FFF",
            cursor: !inputText.trim() || isLoading ? "not-allowed" : "pointer",
            transition: "all 0.25s ease",
            boxShadow: !inputText.trim() || isLoading ? "none" : "0 0 20px rgba(0, 163, 255, 0.5)",
            flexShrink: 0
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
