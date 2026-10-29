import React, { useRef, useEffect } from "react";
import { Play, Pause, Square, FileText, User, Bot } from "lucide-react";
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
      {messages.length === 0 && (
        <div style={{
          margin: "auto",
          textAlign: "center",
          maxWidth: "460px",
          padding: "30px",
          borderRadius: "16px",
          background: "rgba(10, 14, 26, 0.6)",
          border: "1px dashed rgba(148, 163, 184, 0.2)"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            margin: "0 auto 16px auto",
            borderRadius: "50%",
            background: "rgba(0, 163, 255, 0.1)",
            border: "1px solid rgba(0, 163, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Bot size={30} color="#00A3FF" />
          </div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>
            Welcome! I'm Pavan Dasam's AI Voice Twin.
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Ask me anything about my 3.5+ years of enterprise AI engineering, LangGraph multi-agent systems,
            Model Context Protocol (MCP) integrations, or click any of the prompt pills below.
          </p>
        </div>
      )}

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
                marginTop: "4px"
              }}>
                <Bot size={20} color="#FFF" />
              </div>
            )}

            <div style={{
              maxWidth: "76%",
              borderRadius: "14px",
              padding: "14px 18px",
              background: isUser
                ? "linear-gradient(135deg, rgba(0, 163, 255, 0.25), rgba(2, 132, 199, 0.35))"
                : "rgba(10, 14, 26, 0.88)",
              border: `1px solid ${
                isUser ? "rgba(0, 163, 255, 0.45)" : isCurrentSpeech ? "#00A3FF" : "var(--border-subtle)"
              }`,
              boxShadow: isCurrentSpeech ? "0 0 20px rgba(0, 163, 255, 0.3)" : "none",
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
                  color: isUser ? "#38BDF8" : "#A78BFA"
                }}>
                  {isUser ? "You (Recruiter)" : "Pavan Dasam (AI Twin)"}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  {msg.timestamp}
                </span>
              </div>

              <div style={{
                fontSize: "0.92rem",
                lineHeight: 1.65,
                color: "#F8FAFC",
                whiteSpace: "pre-wrap"
              }}>
                {msg.content}
              </div>

              {/* Speech Controls for Assistant Messages */}
              {!isUser && (
                <div style={{
                  marginTop: "12px",
                  paddingTop: "8px",
                  borderTop: "1px solid rgba(148, 163, 184, 0.1)",
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
                              background: "rgba(0, 163, 255, 0.2)",
                              border: "1px solid #00A3FF",
                              color: "#00A3FF",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.75rem"
                            }}
                          >
                            <Play size={13} /> Resume
                          </button>
                        ) : (
                          <button
                            onClick={onPauseSpeech}
                            style={{
                              background: "rgba(255, 46, 147, 0.2)",
                              border: "1px solid #FF2E93",
                              color: "#FF2E93",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.75rem"
                            }}
                          >
                            <Pause size={13} /> Pause
                          </button>
                        )}
                        <button
                          onClick={onStopSpeech}
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid var(--border-subtle)",
                            color: "#CBD5E1",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.75rem"
                          }}
                        >
                          <Square size={12} /> Stop
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onPlaySpeech(msg)}
                        style={{
                          background: "rgba(0, 163, 255, 0.12)",
                          border: "1px solid rgba(0, 163, 255, 0.3)",
                          color: "#38BDF8",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "0.75rem",
                          fontWeight: 500
                        }}
                      >
                        <Play size={13} /> Listen to Voice
                      </button>
                    )}
                  </div>

                  {/* Grounding Source Citation Badges */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Grounded in:</span>
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          title={`Source: ${src.file_name} (Chunk ${src.chunk_index}) - Relevance ${(src.similarity * 100).toFixed(0)}%`}
                          style={{
                            fontSize: "0.68rem",
                            background: "rgba(0, 163, 255, 0.08)",
                            border: "1px solid rgba(0, 163, 255, 0.2)",
                            color: "#93C5FD",
                            padding: "2px 7px",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "3px"
                          }}
                        >
                          <FileText size={11} />
                          {src.file_name.length > 20
                            ? src.file_name.substring(0, 18) + "..."
                            : src.file_name}
                          <span style={{ color: "#38BDF8", fontWeight: 600 }}>
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
                marginTop: "4px"
              }}>
                <User size={20} color="#FFF" />
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
            background: "rgba(10, 14, 26, 0.8)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "0.85rem"
          }}>
            <div style={{
              width: "12px",
              height: "12px",
              border: "2px solid #00A3FF",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <span>Searching vector database & synthesizing answer via Claude...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
