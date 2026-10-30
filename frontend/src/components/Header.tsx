import React from "react";
import { Download, Sliders } from "lucide-react";
import type { HealthStatus } from "../types";

// GitHub Brand Icon
const GithubIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// LinkedIn Brand Icon
const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface HeaderProps {
  health: HealthStatus | null;
  onOpenAdmin: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  health,
  onOpenAdmin
}) => {
  return (
    <header className="glass-panel" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 28px",
      borderBottom: "1px solid var(--border-glass)",
      position: "sticky",
      top: 0,
      zIndex: 40
    }}>
      {/* Brand & Identity */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #00A3FF 0%, #A855F7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 16px rgba(0, 163, 255, 0.4)"
        }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFF" }}>P</span>
        </div>
        <div>
          <h1 style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "#F8FAFC"
          }}>
            Meet Pavan <span style={{ color: "#00A3FF" }}>— AI Voice Twin</span>
          </h1>
          <p style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
            RAG-powered conversational twin for 100x AI Agent Team evaluation
          </p>
        </div>
      </div>

      {/* Action Buttons: Resume, GitHub, LinkedIn, Admin */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Download Resume Button */}
        <a
          href="./Pavan_Dasam_Resume.pdf"
          download="Pavan_Dasam_Resume.pdf"
          title="Download Pavan Dasam's Resume (PDF)"
          className="glass-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 14px",
            borderRadius: "10px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#38BDF8",
            textDecoration: "none",
            background: "rgba(0, 163, 255, 0.15)",
            border: "1px solid rgba(0, 163, 255, 0.35)",
            transition: "all 0.2s"
          }}
        >
          <Download size={15} />
          <span>Resume</span>
        </a>

        {/* GitHub Redirect */}
        <a
          href="https://github.com/Pavan-Dasam"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Pavan's GitHub Profile"
          className="glass-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 14px",
            borderRadius: "10px",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#F8FAFC",
            textDecoration: "none",
            transition: "all 0.2s"
          }}
        >
          <GithubIcon size={15} />
          <span>GitHub</span>
        </a>

        {/* LinkedIn Redirect */}
        <a
          href="https://www.linkedin.com/in/pavan-kumar-dasam-2574893b9/"
          target="_blank"
          rel="noopener noreferrer"
          title="Connect on LinkedIn"
          className="glass-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 14px",
            borderRadius: "10px",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#38BDF8",
            textDecoration: "none",
            transition: "all 0.2s"
          }}
        >
          <LinkedinIcon size={15} />
          <span>LinkedIn</span>
        </a>

        {/* Admin Portal Toggle */}
        <button
          onClick={onOpenAdmin}
          title="Knowledge Base Admin Portal"
          className="glass-pill"
          style={{
            color: "var(--text-muted)",
            padding: "8px 12px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            fontWeight: 500,
            transition: "all 0.2s"
          }}
        >
          <Sliders size={14} />
          {health && (
            <span style={{
              fontSize: "0.68rem",
              background: "rgba(0, 163, 255, 0.2)",
              color: "#38BDF8",
              padding: "1px 6px",
              borderRadius: "8px"
            }}>
              {health.vector_store.indexed_documents}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
