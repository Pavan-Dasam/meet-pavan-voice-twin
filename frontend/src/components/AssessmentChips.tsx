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
    tag: "Superpower",
    query: "What’s your #1 superpower?"
  },
  {
    tag: "Growth Areas",
    query: "What are the top 3 areas you’d like to grow in?"
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
    tag: "Claims Multi-Agent",
    query: "Explain your Autonomous Claims Processing Agent in LangGraph at Voya Financial."
  },
  {
    tag: "MCP Tools",
    query: "How did you use Model Context Protocol (MCP) in your enterprise systems?"
  },
  {
    tag: "Tech Stack",
    query: "What is your core tech stack across Python, Java, RAG, and Cloud?"
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
          className="glass-pill"
          style={{
            borderRadius: "20px",
            padding: "7px 15px",
            color: "#E2E8F0",
            fontSize: "0.78rem",
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.25s ease",
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
