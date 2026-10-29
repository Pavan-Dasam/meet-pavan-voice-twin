import type { HealthStatus, AdminDocInfo, SourceCitation } from "../types";

export function getApiBase(): string {
  const custom = typeof window !== "undefined" ? localStorage.getItem("pavan_api_url") : null;
  if (custom && custom.trim()) {
    return custom.trim().replace(/\/+$/, "");
  }
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:8000/api";
  }
  return "/api";
}

export function setApiBase(url: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("pavan_api_url", url.trim());
  }
}

export async function fetchHealth(): Promise<HealthStatus> {
  const res = await fetch(`${getApiBase()}/health`);
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return res.json();
}

export async function sendChatMessage(
  question: string,
  history: Array<{ role: string; content: string }>,
  topK?: number
): Promise<{
  answer: string;
  sources: SourceCitation[];
  has_retrieved_evidence: boolean;
  model: string;
  retrieved_chunk_count: number;
}> {
  const res = await fetch(`${getApiBase()}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history, top_k: topK })
  });

  if (!res.ok) {
    let errorDetail = "Failed to communicate with AI Twin service.";
    try {
      const data = await res.json();
      if (data.detail) errorDetail = data.detail;
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }

  return res.json();
}

export async function adminListDocs(adminKey: string): Promise<{
  documents: AdminDocInfo[];
  total_vectors: number;
}> {
  const res = await fetch(`${getApiBase()}/admin/documents`, {
    headers: { "X-Admin-Key": adminKey }
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Invalid admin key. Access denied.");
    }
    throw new Error(`Failed to list documents (Status ${res.status})`);
  }
  return res.json();
}

export async function adminUploadDocs(
  files: File[],
  replaceExisting: boolean,
  adminKey: string
): Promise<{ results: any[] }> {
  const formData = new FormData();
  files.forEach(f => formData.append("files", f));
  formData.append("replace_existing", String(replaceExisting));

  const res = await fetch(`${getApiBase()}/admin/documents/upload`, {
    method: "POST",
    headers: { "X-Admin-Key": adminKey },
    body: formData
  });

  if (!res.ok) {
    throw new Error(`Upload failed with status ${res.status}`);
  }
  return res.json();
}

export async function adminDeleteDoc(docId: string, adminKey: string): Promise<any> {
  const res = await fetch(`${getApiBase()}/admin/documents/${docId}`, {
    method: "DELETE",
    headers: { "X-Admin-Key": adminKey }
  });

  if (!res.ok) {
    throw new Error(`Delete failed with status ${res.status}`);
  }
  return res.json();
}

export async function adminReindexDoc(docId: string, adminKey: string): Promise<any> {
  const res = await fetch(`${getApiBase()}/admin/documents/${docId}/reindex`, {
    method: "POST",
    headers: { "X-Admin-Key": adminKey }
  });

  if (!res.ok) {
    throw new Error(`Reindex failed with status ${res.status}`);
  }
  return res.json();
}

export async function adminRetrievalTest(
  query: string,
  adminKey: string,
  topK: number = 4
): Promise<any> {
  const res = await fetch(`${getApiBase()}/admin/retrieval-test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey
    },
    body: JSON.stringify({ query, top_k: topK })
  });

  if (!res.ok) {
    throw new Error(`Diagnostic query failed with status ${res.status}`);
  }
  return res.json();
}
