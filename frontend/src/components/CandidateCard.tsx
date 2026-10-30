import React from "react";
import { Mail, Phone, Award, ShieldCheck } from "lucide-react";

export const CandidateCard: React.FC = () => {
  return (
    <div className="glass-card" style={{
      borderRadius: "14px",
      padding: "20px",
      marginBottom: "16px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#38BDF8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Candidate Credentials
          </span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#F8FAFC", margin: "2px 0" }}>
            Pavan Dasam
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#38BDF8", fontWeight: 500 }}>
            AI Engineer | Generative AI | Agentic AI | RAG
          </p>
        </div>
        <span style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#4ADE80",
          padding: "3px 10px",
          borderRadius: "12px"
        }}>
          3.5+ Yrs Exp
        </span>
      </div>

      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "14px" }}>
        Specialized in enterprise Generative & Agentic AI across Financial Insurance (<strong>Voya Financial via Accenture</strong>) and Health Insurance (<strong>Anthem via TAO Digitals</strong>). Architect of production LangGraph multi-agent systems and MCP tool networks.
      </p>

      {/* Certification Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
        <span style={{
          fontSize: "0.7rem",
          background: "rgba(99, 102, 241, 0.15)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          color: "#A5B4FC",
          padding: "2px 8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Award size={12} /> LangGraph Certified
        </span>
        <span style={{
          fontSize: "0.7rem",
          background: "rgba(99, 102, 241, 0.15)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          color: "#A5B4FC",
          padding: "2px 8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Award size={12} /> LangChain Certified
        </span>
        <span style={{
          fontSize: "0.7rem",
          background: "rgba(14, 165, 233, 0.15)",
          border: "1px solid rgba(14, 165, 233, 0.35)",
          color: "#7DD3FC",
          padding: "2px 8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <ShieldCheck size={12} /> Anthropic MCP Certified
        </span>
        <span style={{
          fontSize: "0.7rem",
          background: "rgba(245, 158, 11, 0.15)",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          color: "#FCD34D",
          padding: "2px 8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Award size={12} /> Databricks GenAI
        </span>
      </div>

      {/* Contact Quick Links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "0.76rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-glass)", paddingTop: "12px" }}>
        <a href="mailto:pavanwork2113@gmail.com" style={{ display: "flex", alignItems: "center", gap: "5px", color: "#CBD5E1", textDecoration: "none" }}>
          <Mail size={13} color="#00A3FF" />
          <span>pavanwork2113@gmail.com</span>
        </a>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#CBD5E1" }}>
          <Phone size={13} color="#00A3FF" />
          <span>+91 9640559197</span>
        </span>
      </div>
    </div>
  );
};
