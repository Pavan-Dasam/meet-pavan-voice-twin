import React, { useRef, useEffect } from "react";
import { Play, Pause, Square, FileText, Bot, Volume2 } from "lucide-react";
import type { ChatMessage } from "../types";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  activeSpeechId: string | null;
  isSpeaking: boolean;
  isPaused: boolean;
  onPlaySpeech: (msg: ChatMessage) => void;
  onPauseSpeech: () => void;
  onResumeSpeech: () => void;
  onStopSpeech: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  activeSpeechId,
  isSpeaking,
  isPaused,
  onPlaySpeech,
  onPauseSpeech,
  onResumeSpeech,
  onStopSpeech
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "18px"
    }}>
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const isCurrentSpeech = activeSpeechId === msg.id && isSpeaking;

        return (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: isUser ? "flex-end" : "flex-start",
              gap: "12px"
            }}
          >
            {!isUser && (
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00A3FF, #0284C7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
                boxShadow: "0 4px 12px rgba(0, 163, 255, 0.3)"
              }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFF" }}>PD</span>
              </div>
            )}

            <div style={{
              maxWidth: "80%",
              borderRadius: "14px",
              padding: "16px 20px",
              background: isUser
                ? "linear-gradient(135deg, #0284C7, #0369A1)"
                : "#F8FAFC",
              border: `1px solid ${
                isUser
                  ? "#0284C7"
                  : isCurrentSpeech
                  ? "#0284C7"
                  : "#E2E8F0"
              }`,
              boxShadow: isCurrentSpeech
                ? "0 0 18px rgba(2, 132, 199, 0.2)"
                : "0 2px 10px rgba(0, 0, 0, 0.04)",
              transition: "all 0.2s"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "6px",
                gap: "8px"
              }}>
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: isUser ? "#E0F2FE" : "#64748B"
                }}>
                  {isUser ? "You (Recruiter)" : "Pavan Dasam • Candidate AI Voice Twin"}
                </span>
                <span style={{ fontSize: "0.7rem", color: isUser ? "#BAE6FD" : "#94A3B8" }}>
                  {msg.timestamp}
                </span>
              </div>

              <div style={{
                fontSize: "0.92rem",
                lineHeight: 1.65,
                color: isUser ? "#FFFFFF" : "#0F172A",
                whiteSpace: "pre-wrap"
              }}>
                {msg.content}
              </div>

              {/* Spoken Audio Controls & Grounding Badges */}
              {!isUser && (
                <div style={{
                  marginTop: "12px",
                  paddingTop: "10px",
                  borderTop: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {isCurrentSpeech ? (
                      <>
                        {isPaused ? (
                          <button
                            onClick={onResumeSpeech}
                            style={{
                              background: "#E0F2FE",
                              border: "1px solid #BAE6FD",
                              color: "#0284C7",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.74rem",
                              fontWeight: 600
                            }}
                          >
                            <Play size={12} /> Resume
                          </button>
                        ) : (
                          <button
                            onClick={onPauseSpeech}
                            style={{
                              background: "#FEE2E2",
                              border: "1px solid #FCA5A5",
                              color: "#DC2626",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.74rem",
                              fontWeight: 600
                            }}
                          >
                            <Pause size={12} /> Pause
                          </button>
                        )}
                        <button
                          onClick={onStopSpeech}
                          style={{
                            background: "#F1F5F9",
                            border: "1px solid #CBD5E1",
                            color: "#475569",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.74rem",
                            fontWeight: 500
                          }}
                        >
                          <Square size={11} /> Stop
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onPlaySpeech(msg)}
                        style={{
                          background: "#F0F9FF",
                          border: "1px solid #BAE6FD",
                          color: "#0284C7",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "0.74rem",
                          fontWeight: 600
                        }}
                      >
                        <Volume2 size={13} /> Listen aloud
                      </button>
                    )}
                  </div>

                  {/* Grounding Source Citation Badges */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.68rem", color: "#64748B" }}>Grounded in:</span>
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          title={`Source: ${src.file_name} (Chunk ${src.chunk_index}) - Relevance ${(src.similarity * 100).toFixed(0)}%`}
                          style={{
                            fontSize: "0.68rem",
                            background: "#F1F5F9",
                            border: "1px solid #E2E8F0",
                            color: "#334155",
                            padding: "2px 7px",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "3px"
                          }}
                        >
                          <FileText size={10} color="#0284C7" />
                          {src.file_name.length > 20
                            ? src.file_name.substring(0, 18) + "..."
                            : src.file_name}
                          <span style={{ color: "#0284C7", fontWeight: 600 }}>
                            {(src.similarity * 100).toFixed(0)}%
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {isUser && (
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #FF2E93, #BE185D)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
                boxShadow: "0 4px 12px rgba(255, 46, 147, 0.3)"
              }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFF" }}>You</span>
              </div>
            )}
          </div>
        );
      })}

      {isLoading && (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #00A3FF, #0284C7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Bot size={20} color="#FFF" />
          </div>
          <div style={{
            padding: "12px 18px",
            borderRadius: "14px",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#64748B",
            fontSize: "0.85rem"
          }}>
            <div style={{
              width: "12px",
              height: "12px",
              border: "2px solid #0284C7",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <span>Searching vector database & synthesizing grounded answer...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
