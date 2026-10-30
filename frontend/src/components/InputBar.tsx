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
      borderTop: "1px solid #E2E8F0",
      position: "relative",
      background: "#FFFFFF"
    }}>
      {/* Live Speech Recognition Transcript Overlay */}
      {isListening && transcript && (
        <div style={{
          position: "absolute",
          top: "-44px",
          left: "20px",
          right: "20px",
          background: "#FFF1F2",
          border: "1px solid #FECDD3",
          borderRadius: "8px",
          padding: "7px 14px",
          fontSize: "0.8rem",
          color: "#9F1239",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 12px rgba(225, 29, 72, 0.15)"
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#E11D48",
            animation: "pulse 1s infinite"
          }} />
          <span style={{ fontWeight: 600, color: "#E11D48" }}>Hearing:</span>
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
          background: "#FEF2F2",
          border: "1px solid #FCA5A5",
          color: "#DC2626",
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
              ? "linear-gradient(135deg, #E11D48, #BE123C)"
              : "linear-gradient(135deg, #0284C7, #0369A1)",
            border: "none",
            color: "#FFF",
            transition: "all 0.25s ease",
            boxShadow: isListening
              ? "0 0 20px rgba(225, 29, 72, 0.4)"
              : "0 0 14px rgba(2, 132, 199, 0.3)",
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
              background: "#F8FAFC",
              border: "1px solid #CBD5E1",
              borderRadius: "12px",
              color: "#0F172A",
              fontSize: "0.88rem",
              outline: "none",
              transition: "all 0.2s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#0284C7";
              e.target.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#CBD5E1";
              e.target.style.boxShadow = "none";
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
              ? "#F1F5F9"
              : "linear-gradient(135deg, #0284C7, #0369A1)",
            border: `1px solid ${!inputText.trim() || isLoading ? "#E2E8F0" : "#0284C7"}`,
            color: !inputText.trim() || isLoading ? "#94A3B8" : "#FFFFFF",
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
        color: "#64748B",
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
