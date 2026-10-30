import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Play } from "lucide-react";

interface AssessmentChipsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

const QUESTIONS = [
  {
    num: "1",
    tag: "Life Story",
    query: "What should we know about your life story in a few sentences?"
  },
  {
    num: "2",
    tag: "Superpower",
    query: "What’s your #1 superpower?"
  },
  {
    num: "3",
    tag: "Growth Areas",
    query: "What are the top 3 areas you’d like to grow in?"
  },
  {
    num: "4",
    tag: "Coworker View",
    query: "What misconception do your coworkers have about you?"
  },
  {
    num: "5",
    tag: "Pushing Limits",
    query: "How do you push your boundaries and limits?"
  },
  {
    num: "★",
    tag: "Claims Agent",
    query: "Tell me about your Autonomous Claims Processing Agent at Voya Financial."
  },
  {
    num: "★",
    tag: "MCP Tools",
    query: "How did you use Model Context Protocol (MCP) in your enterprise systems?"
  }
];

export const AssessmentChips: React.FC<AssessmentChipsProps> = ({
  onSelectQuestion,
  disabled
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="glass-card" style={{
      borderRadius: "14px",
      overflow: "hidden",
      marginBottom: "16px"
    }}>
      {/* Header with Minimize / Expand toggle */}
      <div
        onClick={() => setIsMinimized(!isMinimized)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          cursor: "pointer",
          borderBottom: isMinimized ? "none" : "1px solid var(--border-glass)",
          background: "rgba(255, 255, 255, 0.02)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={16} color="#00A3FF" />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#F8FAFC", letterSpacing: "0.03em" }}>
            100x ASSESSMENT PROMPTS
          </span>
          <span style={{
            fontSize: "0.68rem",
            color: "#38BDF8",
            background: "rgba(0, 163, 255, 0.15)",
            padding: "2px 8px",
            borderRadius: "12px",
            fontWeight: 600
          }}>
            1-Click Test
          </span>
        </div>

        <button
          type="button"
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.75rem"
          }}
        >
          <span>{isMinimized ? "Expand" : "Minimize"}</span>
          {isMinimized ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
        </button>
      </div>

      {/* Questions List */}
      {!isMinimized && (
        <div style={{
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <p style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: "4px" }}>
            Click any prompt below to watch Pavan's AI Twin formulate and speak the grounded response:
          </p>
          {QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => onSelectQuestion(q.query)}
              className="prompt-item"
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                color: "#E2E8F0",
                fontSize: "0.82rem",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.background = "rgba(0, 163, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(0, 163, 255, 0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#00A3FF",
                  background: "rgba(0, 163, 255, 0.15)",
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {q.num}
                </span>
                <span style={{ color: "#F1F5F9" }}>{q.query}</span>
              </div>
              <Play size={13} color="#38BDF8" style={{ flexShrink: 0, opacity: 0.8 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
