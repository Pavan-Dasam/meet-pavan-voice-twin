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
          borderBottom: isMinimized ? "none" : "1px solid #E2E8F0",
          background: "#F8FAFC"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={16} color="#0284C7" />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", letterSpacing: "0.03em" }}>
            100x ASSESSMENT PROMPTS
          </span>
          <span style={{
            fontSize: "0.68rem",
            color: "#0284C7",
            background: "#E0F2FE",
            border: "1px solid #BAE6FD",
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
            color: "#64748B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.75rem",
            fontWeight: 500
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
          gap: "8px",
          background: "#FFFFFF"
        }}>
          <p style={{ fontSize: "0.74rem", color: "#64748B", marginBottom: "4px" }}>
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
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                color: "#1E293B",
                fontSize: "0.82rem",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.background = "#F0F9FF";
                  e.currentTarget.style.borderColor = "#BAE6FD";
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.background = "#F8FAFC";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#0284C7",
                  background: "#E0F2FE",
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {q.num}
                </span>
                <span style={{ color: "#1E293B", fontWeight: 500 }}>{q.query}</span>
              </div>
              <Play size={13} color="#0284C7" style={{ flexShrink: 0, opacity: 0.9 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
