import React from "react";
import { Mic, Volume2 } from "lucide-react";

interface VoiceVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isListening,
  isSpeaking,
  isPaused
}) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 0 8px 0"
    }}>
      <div style={{
        position: "relative",
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isListening
          ? "radial-gradient(circle, #FF2E93 0%, rgba(255, 46, 147, 0.2) 70%)"
          : isSpeaking
          ? "radial-gradient(circle, #00A3FF 0%, rgba(0, 163, 255, 0.2) 70%)"
          : "rgba(10, 14, 26, 0.9)",
        border: `2px solid ${
          isListening ? "#FF2E93" : isSpeaking ? "#00A3FF" : "rgba(148, 163, 184, 0.2)"
        }`,
        transition: "all 0.3s ease",
        boxShadow: isListening
          ? "0 0 35px rgba(255, 46, 147, 0.6)"
          : isSpeaking
          ? "0 0 35px rgba(0, 163, 255, 0.6)"
          : "0 0 10px rgba(0, 0, 0, 0.5)"
      }}>
        {/* Animated Sound Wave Bars when Speaking */}
        {isSpeaking && !isPaused ? (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {[14, 28, 42, 24, 36, 18].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "3.5px",
                  height: `${h}px`,
                  background: "#FFF",
                  borderRadius: "3px",
                  animation: `soundWave 0.8s infinite ease-in-out ${i * 0.12}s`
                }}
              />
            ))}
          </div>
        ) : isListening ? (
          <Mic size={30} color="#FFF" style={{ animation: "pulse 1s infinite" }} />
        ) : (
          <Volume2 size={28} color="rgba(148, 163, 184, 0.7)" />
        )}
      </div>

      <div style={{
        marginTop: "10px",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: isListening ? "#FF2E93" : isSpeaking ? "#38BDF8" : "var(--text-muted)"
      }}>
        {isListening
          ? "● Listening to your question... Speak naturally"
          : isSpeaking
          ? isPaused
            ? "❚❚ Voice output paused"
            : "▶ Speaking response as Pavan Dasam..."
          : "Voice Assistant Ready • Ask any recruiter question"}
      </div>
    </div>
  );
};
