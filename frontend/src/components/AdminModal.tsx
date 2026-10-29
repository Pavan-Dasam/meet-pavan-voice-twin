import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  RefreshCw,
  Trash2,
  Key,
  Database,
  FileCheck,
  AlertCircle,
  Search,
  CheckCircle2
} from "lucide-react";
import type { AdminDocInfo } from "../types";
import {
  adminListDocs,
  adminUploadDocs,
  adminDeleteDoc,
  adminReindexDoc,
  adminRetrievalTest
} from "../services/api";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocsChanged?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onDocsChanged
}) => {
  const [adminKey, setAdminKey] = useState(
    localStorage.getItem("pavan_admin_key") || "pavan-admin-secret-key-2026"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [documents, setDocuments] = useState<AdminDocInfo[]>([]);
  const [totalVectors, setTotalVectors] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // File Upload State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Diagnostic Test State
  const [testQuery, setTestQuery] = useState("");
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isOpen && adminKey) {
      loadDocuments();
    }
  }, [isOpen]);

  const loadDocuments = async () => {
    if (!adminKey) return;
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const data = await adminListDocs(adminKey);
      setDocuments(data.documents);
      setTotalVectors(data.total_vectors);
      setIsAuthenticated(true);
      localStorage.setItem("pavan_admin_key", adminKey);
    } catch (err: any) {
      setIsAuthenticated(false);
      setStatusMessage({ type: "error", text: err.message || "Admin authentication failed." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeySave = (e: React.FormEvent) => {
    e.preventDefault();
    loadDocuments();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    setStatusMessage(null);

    try {
      const res = await adminUploadDocs(selectedFiles, replaceExisting, adminKey);
      const errors = res.results.filter((r) => r.status === "FAILED");
      const successes = res.results.filter((r) => r.status === "INDEXED");

      if (errors.length > 0) {
        setStatusMessage({
          type: "error",
          text: `Indexed ${successes.length} file(s). Errors: ${errors.map((e) => `${e.file_name}: ${e.error}`).join("; ")}`
        });
      } else {
        setStatusMessage({
          type: "success",
          text: `Successfully indexed ${successes.length} document(s) into ChromaDB!`
        });
      }

      setSelectedFiles([]);
      loadDocuments();
      if (onDocsChanged) onDocsChanged();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Upload failed." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (docId: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete '${fileName}' and all its vector embeddings?`)) {
      return;
    }
    setIsLoading(true);
    try {
      await adminDeleteDoc(docId, adminKey);
      setStatusMessage({ type: "success", text: `Deleted '${fileName}'.` });
      loadDocuments();
      if (onDocsChanged) onDocsChanged();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Failed to delete document." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReindex = async (docId: string, fileName: string) => {
    setIsLoading(true);
    try {
      await adminReindexDoc(docId, adminKey);
      setStatusMessage({ type: "success", text: `Re-indexed '${fileName}' successfully.` });
      loadDocuments();
      if (onDocsChanged) onDocsChanged();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Failed to re-index document." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiagnosticSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery.trim()) return;
    setIsTesting(true);
    try {
      const res = await adminRetrievalTest(testQuery.trim(), adminKey);
      setTestResults(res.chunks);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Diagnostic search failed." });
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(8px)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(10, 14, 26, 0.98)",
        border: "1px solid rgba(0, 163, 255, 0.35)",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "800px",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 40px rgba(0, 163, 255, 0.2)",
        overflow: "hidden"
      }}>
        {/* Modal Header */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Database size={20} color="#00A3FF" />
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Knowledge Base Administration
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Admin Auth Form */}
          <form onSubmit={handleKeySave} style={{
            background: "rgba(4, 6, 12, 0.6)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <Key size={18} color="#FF2E93" />
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block" }}>
                Admin Secret Key (Protected Route Token)
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter ADMIN_API_KEY..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  color: "#FFF",
                  fontSize: "0.88rem",
                  outline: "none"
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: "rgba(0, 163, 255, 0.15)",
                border: "1px solid #00A3FF",
                color: "#00A3FF",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Authenticate
            </button>
          </form>

          {/* Status Alert Banner */}
          {statusMessage && (
            <div style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: statusMessage.type === "success" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
              border: `1px solid ${statusMessage.type === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              color: statusMessage.type === "success" ? "#6EE7B7" : "#FCA5A5",
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {statusMessage.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {isAuthenticated && (
            <>
              {/* Document Upload Section */}
              <div style={{
                background: "rgba(4, 6, 12, 0.6)",
                border: "1px dashed rgba(0, 163, 255, 0.3)",
                borderRadius: "12px",
                padding: "18px"
              }}>
                <h3 style={{ fontSize: "0.92rem", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Upload size={16} color="#00A3FF" />
                  Upload Documents (PDF, DOCX, TXT)
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "14px" }}>
                  Documents will be automatically parsed with PyMuPDF/python-docx, chunked with recursive splitting, and indexed into persistent ChromaDB.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    style={{ fontSize: "0.82rem", color: "#CBD5E1" }}
                  />
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#94A3B8", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={replaceExisting}
                      onChange={(e) => setReplaceExisting(e.target.checked)}
                    />
                    <span>Overwrite if file already exists</span>
                  </label>
                  <button
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || isUploading}
                    style={{
                      background: selectedFiles.length === 0 || isUploading
                        ? "rgba(148, 163, 184, 0.1)"
                        : "linear-gradient(135deg, #00A3FF, #0284C7)",
                      border: "none",
                      color: "#FFF",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: selectedFiles.length === 0 || isUploading ? "not-allowed" : "pointer"
                    }}
                  >
                    {isUploading ? "Extracting & Indexing..." : `Index ${selectedFiles.length} File(s)`}
                  </button>
                </div>
              </div>

              {/* Indexed Documents Table */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <h3 style={{ fontSize: "0.92rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileCheck size={16} color="#38BDF8" />
                    Indexed Documents ({documents.length} files • {totalVectors} vector chunks)
                  </h3>
                  <button
                    onClick={loadDocuments}
                    disabled={isLoading}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#38BDF8",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <RefreshCw size={12} /> Refresh
                  </button>
                </div>

                <div style={{
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                    <thead>
                      <tr style={{ background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                        <th style={{ padding: "10px 14px", color: "var(--text-muted)" }}>Document</th>
                        <th style={{ padding: "10px 14px", color: "var(--text-muted)" }}>Chunks</th>
                        <th style={{ padding: "10px 14px", color: "var(--text-muted)" }}>Indexed At</th>
                        <th style={{ padding: "10px 14px", color: "var(--text-muted)", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.doc_id} style={{ borderBottom: "1px solid rgba(148, 163, 184, 0.08)" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 500, color: "#F8FAFC" }}>
                            {doc.file_name}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#38BDF8" }}>
                            {doc.chunk_count} chunks
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-muted)", fontSize: "0.74rem" }}>
                            {new Date(doc.indexed_at).toLocaleString()}
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "right" }}>
                            <button
                              onClick={() => handleReindex(doc.doc_id, doc.file_name)}
                              title="Re-index document"
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#00A3FF",
                                cursor: "pointer",
                                marginRight: "10px"
                              }}
                            >
                              <RefreshCw size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(doc.doc_id, doc.file_name)}
                              title="Delete document and vector records"
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#EF4444",
                                cursor: "pointer"
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Retrieval Diagnostic Verification Tool */}
              <div style={{
                background: "rgba(4, 6, 12, 0.6)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
                padding: "16px"
              }}>
                <h3 style={{ fontSize: "0.92rem", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Search size={16} color="#A78BFA" />
                  Vector Retrieval Diagnostic Inspector
                </h3>
                <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                  Verify that queries retrieve the expected document chunks and view similarity scores without making an LLM call.
                </p>

                <form onSubmit={handleDiagnosticSearch} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="Enter test search query (e.g. 'Model Context Protocol')..."
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      background: "rgba(10, 14, 26, 0.9)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "0.82rem"
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isTesting || !testQuery.trim()}
                    style={{
                      background: "rgba(167, 139, 250, 0.15)",
                      border: "1px solid #A78BFA",
                      color: "#A78BFA",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {isTesting ? "Searching..." : "Test Retrieval"}
                  </button>
                </form>

                {testResults && (
                  <div style={{ marginTop: "12px", maxHeight: "180px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {testResults.length === 0 ? (
                      <div style={{ fontSize: "0.78rem", color: "#F87171" }}>
                        No chunks matched the relevance threshold.
                      </div>
                    ) : (
                      testResults.map((chunk, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "rgba(10, 14, 26, 0.8)",
                            border: "1px solid rgba(148, 163, 184, 0.15)",
                            borderRadius: "6px",
                            padding: "8px 12px",
                            fontSize: "0.75rem"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontWeight: 600, color: "#38BDF8" }}>
                              {chunk.file_name} (Chunk #{chunk.chunk_index})
                            </span>
                            <span style={{ color: "#4ADE80" }}>
                              Sim: {(chunk.similarity * 100).toFixed(1)}% (Dist: {chunk.distance})
                            </span>
                          </div>
                          <div style={{ color: "var(--text-muted)", maxHeight: "60px", overflow: "hidden" }}>
                            {chunk.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
