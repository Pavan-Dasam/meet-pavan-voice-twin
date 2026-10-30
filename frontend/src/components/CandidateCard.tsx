import React from "react";
import { Mail, Phone, Award, ShieldCheck } from "lucide-react";

export const CandidateCard: React.FC = () => {
  return (
    <div className="glass-card" style={{
      borderRadius: "14px",
      padding: "20px",
      marginBottom: "16px",
      background: "#FFFFFF",
      border: "1px solid #E2E8F0"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#0284C7", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Candidate Credentials
          </span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", margin: "2px 0" }}>
            Pavan Dasam
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#0284C7", fontWeight: 600 }}>
            AI Engineer | Generative AI | Agentic AI | RAG
          </p>
        </div>
        <span style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          background: "#ECFDF5",
          border: "1px solid #A7F3D0",
          color: "#059669",
          padding: "3px 10px",
          borderRadius: "12px"
        }}>
          3.5+ Yrs Exp
        </span>
      </div>

      <p style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.55, marginBottom: "14px" }}>
        Specialized in enterprise Generative & Agentic AI across Financial Insurance (<strong>Voya Financial via Accenture</strong>) and Health Insurance (<strong>Anthem via TAO Digitals</strong>). Architect of production LangGraph multi-agent systems and MCP tool networks.
      </p>

      {/* Certification Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          background: "#EEF2FF",
          border: "1px solid #C7D2FE",
          color: "#4338CA",
          padding: "3px 9px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Award size={12} /> LangGraph Certified
        </span>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          background: "#EEF2FF",
          border: "1px solid #C7D2FE",
          color: "#4338CA",
          padding: "3px 9px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Award size={12} /> LangChain Certified
        </span>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          background: "#E0F2FE",
          border: "1px solid #BAE6FD",
          color: "#0369A1",
          padding: "3px 9px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <ShieldCheck size={12} /> Anthropic MCP Certified
        </span>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          background: "#FEF3C7",
          border: "1px solid #FDE68A",
          color: "#B45309",
          padding: "3px 9px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Award size={12} /> Databricks GenAI
        </span>
      </div>

      {/* Contact Quick Links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "0.76rem", borderTop: "1px solid #E2E8F0", paddingTop: "12px" }}>
        <a href="mailto:pavanwork2113@gmail.com" style={{ display: "flex", alignItems: "center", gap: "5px", color: "#475569", textDecoration: "none" }}>
          <Mail size={13} color="#0284C7" />
          <span>pavanwork2113@gmail.com</span>
        </a>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#475569" }}>
          <Phone size={13} color="#0284C7" />
          <span>+91 9640559197</span>
        </span>
      </div>
    </div>
  );
};
