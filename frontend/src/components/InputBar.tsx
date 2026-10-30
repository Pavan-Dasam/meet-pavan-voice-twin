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
    <div style={{
      padding: "16px 20px",
      borderTop: "1px solid var(--border-glass)",
      position: "relative",
      background: "rgba(17, 24, 39, 0.4)"
    }}>
      {/* Live Speech Recognition Transcript Overlay */}
      {isListening && transcript && (
        <div style={{
          position: "absolute",
          top: "-44px",
          left: "20px",
          right: "20px",
          background: "rgba(255, 46, 147, 0.2)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 46, 147, 0.5)",
          borderRadius: "8px",
          padding: "7px 14px",
          fontSize: "0.8rem",
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
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: !isSpeechSupported || isLoading ? "not-allowed" : "pointer",
            background: isListening
              ? "linear-gradient(135deg, #FF2E93, #E11D48)"
              : "linear-gradient(135deg, #00A3FF, #0284C7)",
            border: "none",
            color: "#FFF",
            transition: "all 0.25s ease",
            boxShadow: isListening
              ? "0 0 25px rgba(255, 46, 147, 0.6)"
              : "0 0 16px rgba(0, 163, 255, 0.4)",
            flexShrink: 0
          }}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Text Input Fallback */}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Pavan anything, or click the mic to speak..."
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px 18px",
              background: "rgba(11, 15, 25, 0.8)",
              border: "1px solid var(--border-glass)",
              borderRadius: "12px",
              color: "#F8FAFC",
              fontSize: "0.88rem",
              outline: "none",
              transition: "all 0.2s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00A3FF";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border-glass)";
            }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: !inputText.trim() || isLoading
              ? "rgba(255, 255, 255, 0.04)"
              : "rgba(0, 163, 255, 0.15)",
            border: `1px solid ${!inputText.trim() || isLoading ? "var(--border-glass)" : "rgba(0, 163, 255, 0.4)"}`,
            color: !inputText.trim() || isLoading ? "#475569" : "#38BDF8",
            cursor: !inputText.trim() || isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            flexShrink: 0
          }}
        >
          <Send size={16} />
        </button>
      </form>

      <div style={{
        marginTop: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.7rem",
        color: "var(--text-muted)",
        padding: "0 4px"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
          Zero API key setup • Web Speech API Powered
        </span>
        <span>100x.inc Candidate Evaluation</span>
      </div>
    </div>
  );
};
