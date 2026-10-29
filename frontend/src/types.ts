export interface SourceCitation {
  file_name: string;
  chunk_index: number;
  similarity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: SourceCitation[];
  hasRetrievedEvidence?: boolean;
}

export interface AdminDocInfo {
  doc_id: string;
  file_name: string;
  chunk_count: number;
  content_hash: string;
  status: string;
  indexed_at: string;
  total_collection_vectors?: number;
}

export interface HealthStatus {
  status: string;
  service: string;
  vector_store: {
    status: string;
    indexed_documents: number;
    total_vectors: number;
    embedding_model: string;
  };
  llm_service: {
    configured: boolean;
    model: string;
  };
}
