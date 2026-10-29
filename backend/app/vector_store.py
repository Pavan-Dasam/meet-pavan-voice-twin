import json
import os
import hashlib
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

import chromadb
from chromadb.config import Settings as ChromaSettings
from sentence_transformers import SentenceTransformer

from app.config import settings
from app.chunking import RecursiveTextSplitter


class VectorStoreService:
    _instance: Optional["VectorStoreService"] = None

    def __init__(self):
        self.persist_dir = settings.CHROMA_PERSIST_DIRECTORY
        os.makedirs(self.persist_dir, exist_ok=True)
        self.manifest_path = Path(self.persist_dir) / "document_manifest.json"

        # Initialize ChromaDB persistent client
        self.chroma_client = chromadb.PersistentClient(
            path=self.persist_dir,
            settings=ChromaSettings(anonymized_telemetry=False)
        )

        # Initialize Collection
        self.collection_name = "pavan_knowledge_base"
        self.collection = self.chroma_client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )

        # Lazy load or initialize embedding model
        self.embedding_model = SentenceTransformer(settings.EMBEDDING_MODEL_NAME)
        self.text_splitter = RecursiveTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )

    @classmethod
    def get_instance(cls) -> "VectorStoreService":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    # Manifest Management for tracking document indexing state
    def _load_manifest(self) -> Dict[str, Any]:
        if not self.manifest_path.exists():
            return {}
        try:
            with open(self.manifest_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}

    def _save_manifest(self, manifest: Dict[str, Any]) -> None:
        with open(self.manifest_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)

    @staticmethod
    def compute_hash(text: str) -> str:
        return hashlib.sha256(text.encode("utf-8")).hexdigest()

    def ingest_document(
        self,
        doc_id: str,
        file_name: str,
        text: str,
        metadata: Optional[Dict[str, Any]] = None,
        replace_existing: bool = False
    ) -> Dict[str, Any]:
        if not text or not text.strip():
            raise ValueError(f"Document '{file_name}' contains no readable text to index.")

        manifest = self._load_manifest()
        content_hash = self.compute_hash(text)

        # Check for duplicates
        if doc_id in manifest and not replace_existing:
            raise ValueError(
                f"Document '{file_name}' (ID: {doc_id}) is already indexed. "
                f"Set replace_existing=True to re-index."
            )

        # If replacing, purge existing chunks for this doc_id
        if doc_id in manifest or replace_existing:
            self._delete_chunks_by_doc_id(doc_id)

        # Split into semantic chunks
        base_meta = dict(metadata or {})
        chunks = self.text_splitter.split_text_with_metadata(
            text=text,
            doc_id=doc_id,
            file_name=file_name,
            base_metadata=base_meta
        )

        if not chunks:
            raise ValueError("Text chunking resulted in 0 valid chunks.")

        chunk_texts = [c["text"] for c in chunks]
        chunk_ids = [c["chunk_id"] for c in chunks]
        # Chroma metadata must be flat string/int/float/bool
        flat_metadatas = []
        for c in chunks:
            flat = {}
            for k, v in c["metadata"].items():
                if isinstance(v, (str, int, float, bool)):
                    flat[k] = v
                else:
                    flat[k] = str(v)
            flat_metadatas.append(flat)

        # Generate embeddings
        embeddings = self.embedding_model.encode(
            chunk_texts,
            show_progress_bar=False,
            convert_to_numpy=True
        ).tolist()

        # Add to ChromaDB
        self.collection.add(
            ids=chunk_ids,
            embeddings=embeddings,
            documents=chunk_texts,
            metadatas=flat_metadatas
        )

        # Update manifest
        now_iso = datetime.utcnow().isoformat() + "Z"
        manifest[doc_id] = {
            "doc_id": doc_id,
            "file_name": file_name,
            "chunk_count": len(chunks),
            "content_hash": content_hash,
            "status": "INDEXED",
            "indexed_at": now_iso,
            "metadata": base_meta
        }
        self._save_manifest(manifest)

        return {
            "doc_id": doc_id,
            "file_name": file_name,
            "chunk_count": len(chunks),
            "status": "INDEXED",
            "indexed_at": now_iso
        }

    def _delete_chunks_by_doc_id(self, doc_id: str) -> None:
        try:
            self.collection.delete(where={"doc_id": doc_id})
        except Exception:
            pass

    def delete_document(self, doc_id: str) -> Dict[str, Any]:
        manifest = self._load_manifest()
        if doc_id not in manifest:
            raise KeyError(f"Document with ID '{doc_id}' not found in knowledge base.")

        doc_info = manifest[doc_id]
        file_name = doc_info.get("file_name", "")

        # Delete from Chroma
        self._delete_chunks_by_doc_id(doc_id)

        # Delete from manifest
        del manifest[doc_id]
        self._save_manifest(manifest)

        # Delete from uploads directory if present
        upload_path = Path(settings.UPLOADS_DIRECTORY) / file_name
        if upload_path.exists() and upload_path.is_file():
            try:
                os.remove(upload_path)
            except Exception:
                pass

        return {
            "doc_id": doc_id,
            "file_name": file_name,
            "status": "DELETED",
            "message": f"Successfully deleted document '{file_name}' and its vector records."
        }

    def list_documents(self) -> List[Dict[str, Any]]:
        manifest = self._load_manifest()
        total_vectors = self.collection.count()
        results = []
        for doc_id, info in manifest.items():
            info_copy = dict(info)
            info_copy["total_collection_vectors"] = total_vectors
            results.append(info_copy)
        return results

    def similarity_search(
        self,
        query: str,
        top_k: Optional[int] = None,
        max_distance: Optional[float] = None,
        min_similarity: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        if not query or not query.strip():
            return []

        if self.collection.count() == 0:
            return []

        k = top_k or settings.TOP_K
        max_dist = max_distance if max_distance is not None else settings.MAX_COSINE_DISTANCE
        min_sim = min_similarity if min_similarity is not None else settings.MIN_SIMILARITY_SCORE

        # Encode query
        query_embedding = self.embedding_model.encode(
            [query.strip()],
            convert_to_numpy=True
        ).tolist()

        # Query ChromaDB
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=min(k, self.collection.count()),
            include=["documents", "metadatas", "distances"]
        )

        matched_chunks = []
        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0]

        for doc_text, meta, dist in zip(documents, metadatas, distances):
            # For cosine space in Chroma, dist is in range [0, 2].
            # Similarity can be computed as 1.0 - (dist / 2.0) or simply 1.0 - dist
            similarity = round(max(0.0, 1.0 - dist), 4)

            # Enforce relevance threshold
            if dist > max_dist or similarity < min_sim:
                continue

            matched_chunks.append({
                "text": doc_text,
                "metadata": meta,
                "distance": round(float(dist), 4),
                "similarity": similarity,
                "file_name": meta.get("file_name", "unknown"),
                "chunk_index": meta.get("chunk_index", 0)
            })

        # Sort by similarity descending
        matched_chunks.sort(key=lambda x: x["similarity"], reverse=True)
        return matched_chunks

    def clear_all(self) -> None:
        """Purge all documents (useful for test resets)."""
        try:
            self.chroma_client.delete_collection(self.collection_name)
        except Exception:
            pass
        self.collection = self.chroma_client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )
        self._save_manifest({})
