import React from "react";
import { MessageSquare } from "lucide-react";

interface AssessmentChipsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

const QUESTIONS = [
  {
    tag: "Life Story",
    query: "What should we know about your life story in a few sentences?"
  },
  {
    tag: "#1 Superpower",
    query: "What's your #1 superpower?"
  },
  {
    tag: "Growth Areas",
    query: "What are the top 3 areas you'd like to grow in?"
  },
  {
    tag: "Coworker View",
    query: "What misconception do your coworkers have about you?"
  },
  {
    tag: "Pushing Limits",
    query: "How do you push your boundaries and limits?"
  },
  {
    tag: "Claims Agent",
    query: "Tell me about your Autonomous Claims Processing Agent at Voya Financial."
  }
];

export const AssessmentChips: React.FC<AssessmentChipsProps> = ({
  onSelectQuestion,
  disabled
}) => {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      justifyContent: "center",
      padding: "10px 20px"
    }}>
      {QUESTIONS.map((q, idx) => (
        <button
          key={idx}
          disabled={disabled}
          onClick={() => onSelectQuestion(q.query)}
          style={{
            background: "rgba(10, 14, 26, 0.7)",
            border: "1px solid rgba(0, 163, 255, 0.25)",
            borderRadius: "20px",
            padding: "6px 14px",
            color: "#E2E8F0",
            fontSize: "0.78rem",
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)"
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = "#00A3FF";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.background = "rgba(0, 163, 255, 0.12)";
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = "rgba(0, 163, 255, 0.25)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(10, 14, 26, 0.7)";
            }
          }}
        >
          <MessageSquare size={13} color="#00A3FF" />
          <span style={{ fontWeight: 600, color: "#38BDF8" }}>{q.tag}:</span>
          <span>{q.query}</span>
        </button>
      ))}
    </div>
  );
};
