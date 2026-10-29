import os
import shutil
import uuid
from pathlib import Path
from typing import List, Optional, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.config import settings
from app.extraction import extract_document, validate_file
from app.vector_store import VectorStoreService
from app.claude_service import claude_rag_service
from app.security import verify_admin_key, rate_limiter


# Request / Response Schemas
class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=1000, description="Recruiter question for Pavan")
    history: Optional[List[Dict[str, str]]] = Field(default=[], description="Previous conversation turns")
    top_k: Optional[int] = Field(default=None, ge=1, le=10, description="Optional override for chunk retrieval count")


class SourceCitation(BaseModel):
    file_name: str
    chunk_index: int
    similarity: float


class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceCitation]
    has_retrieved_evidence: bool
    model: str
    retrieved_chunk_count: int


class RetrievalTestRequest(BaseModel):
    query: str
    top_k: Optional[int] = 4
    min_similarity: Optional[float] = 0.20


def auto_seed_initial_knowledge(vector_store: VectorStoreService):
    """Seed initial documents (Pavan's updated resume and profile) if the vector store is empty."""
    manifest = vector_store.list_documents()
    if manifest:
        return

    init_dir = Path(settings.INITIAL_KNOWLEDGE_DIRECTORY)
    if not init_dir.exists():
        return

    # Seed files in order
    seed_files = [
        "Pavan_Dasam_Resume_Updated.txt",
        "Pavan_Dasam_Professional_Profile.txt",
        "Pavan_Dasam_AI_Engineer_Resume.pdf"
    ]

    for filename in seed_files:
        file_path = init_dir / filename
        if not file_path.exists():
            continue

        try:
            # Also copy to uploads for administrative management
            upload_target = Path(settings.UPLOADS_DIRECTORY) / filename
            if not upload_target.exists():
                shutil.copy2(file_path, upload_target)

            text, meta = extract_document(file_path)
            doc_id = f"doc_{Path(filename).stem.lower().replace('-', '_').replace(' ', '_')}"
            vector_store.ingest_document(
                doc_id=doc_id,
                file_name=filename,
                text=text,
                metadata=meta,
                replace_existing=True
            )
            print(f"Auto-seeded initial knowledge: {filename}")
        except Exception as e:
            print(f"Notice: Could not auto-seed {filename}: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Vector Store & seed initial knowledge
    vs = VectorStoreService.get_instance()
    auto_seed_initial_knowledge(vs)
    yield


app = FastAPI(
    title="Meet Pavan — AI Voice Twin API",
    description="RAG-powered conversational voice agent representing Pavan Dasam for recruiter inquiries.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for local dev and frontend deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    vs = VectorStoreService.get_instance()
    doc_count = len(vs.list_documents())
    vector_count = vs.collection.count()
    claude_ready = claude_rag_service.is_configured()

    return {
        "status": "healthy",
        "service": "Meet Pavan — AI Voice Twin",
        "vector_store": {
            "status": "connected",
            "indexed_documents": doc_count,
            "total_vectors": vector_count,
            "embedding_model": settings.EMBEDDING_MODEL_NAME
        },
        "llm_service": {
            "configured": claude_ready,
            "model": settings.ANTHROPIC_MODEL if claude_ready else "not_configured"
        }
    }


@app.post("/api/chat", response_model=ChatResponse)
def public_chat(request: Request, payload: ChatRequest):
    # Rate limit public chat requests
    rate_limiter.check_rate_limit(request)

    vs = VectorStoreService.get_instance()
    if vs.collection.count() == 0:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Knowledge base is currently empty. Please wait for initial documents to be indexed or contact the admin."
        )

    # Step 1 & 2: Similarity search in ChromaDB
    retrieved_chunks = vs.similarity_search(
        query=payload.question,
        top_k=payload.top_k or settings.TOP_K,
        max_distance=settings.MAX_COSINE_DISTANCE,
        min_similarity=settings.MIN_SIMILARITY_SCORE
    )

    # Step 3: Call Claude with strict grounding and first-person persona
    try:
        result = claude_rag_service.generate_answer(
            question=payload.question,
            retrieved_chunks=retrieved_chunks,
            conversation_history=payload.history
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Claude AI service error: {str(e)}"
        )

    return ChatResponse(
        answer=result["answer"],
        sources=[SourceCitation(**s) for s in result["sources"]],
        has_retrieved_evidence=result["has_retrieved_evidence"],
        model=result["model_used"],
        retrieved_chunk_count=result["retrieved_chunk_count"]
    )


# Protected Admin Routes
@app.get("/api/admin/documents", dependencies=[Depends(verify_admin_key)])
def admin_list_documents():
    vs = VectorStoreService.get_instance()
    return {
        "documents": vs.list_documents(),
        "total_vectors": vs.collection.count()
    }


@app.post("/api/admin/documents/upload", dependencies=[Depends(verify_admin_key)])
async def admin_upload_documents(
    files: List[UploadFile] = File(...),
    replace_existing: bool = Form(False)
):
    vs = VectorStoreService.get_instance()
    upload_results = []

    for file in files:
        original_name = file.filename
        file_ext = Path(original_name).suffix.lower()

        # Validate extension
        if file_ext not in settings.ALLOWED_EXTENSIONS:
            upload_results.append({
                "file_name": original_name,
                "status": "FAILED",
                "error": f"Unsupported extension '{file_ext}'. Allowed: {settings.ALLOWED_EXTENSIONS}"
            })
            continue

        # Save to uploads directory
        safe_name = original_name.replace(" ", "_")
        dest_path = Path(settings.UPLOADS_DIRECTORY) / safe_name

        try:
            contents = await file.read()
            if len(contents) > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
                upload_results.append({
                    "file_name": original_name,
                    "status": "FAILED",
                    "error": f"File size exceeds {settings.MAX_FILE_SIZE_MB}MB limit."
                })
                continue

            with open(dest_path, "wb") as f:
                f.write(contents)

            # Extract text
            text, metadata = extract_document(dest_path)
            doc_id = f"doc_{uuid.uuid4().hex[:8]}"

            # Ingest into vector store
            ingest_res = vs.ingest_document(
                doc_id=doc_id,
                file_name=original_name,
                text=text,
                metadata=metadata,
                replace_existing=replace_existing
            )

            upload_results.append({
                "file_name": original_name,
                "doc_id": doc_id,
                "status": "INDEXED",
                "chunk_count": ingest_res["chunk_count"]
            })

        except Exception as e:
            upload_results.append({
                "file_name": original_name,
                "status": "FAILED",
                "error": str(e)
            })

    return {"results": upload_results}


@app.delete("/api/admin/documents/{doc_id}", dependencies=[Depends(verify_admin_key)])
def admin_delete_document(doc_id: str):
    vs = VectorStoreService.get_instance()
    try:
        res = vs.delete_document(doc_id)
        return res
    except KeyError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.post("/api/admin/documents/{doc_id}/reindex", dependencies=[Depends(verify_admin_key)])
def admin_reindex_document(doc_id: str):
    vs = VectorStoreService.get_instance()
    manifest = {d["doc_id"]: d for d in vs.list_documents()}
    if doc_id not in manifest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Document '{doc_id}' not found.")

    doc_info = manifest[doc_id]
    file_name = doc_info["file_name"]
    file_path = Path(settings.UPLOADS_DIRECTORY) / file_name.replace(" ", "_")

    if not file_path.exists():
        # Fallback to initial knowledge
        file_path = Path(settings.INITIAL_KNOWLEDGE_DIRECTORY) / file_name

    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Original document file '{file_name}' not found on disk to re-index."
        )

    try:
        text, meta = extract_document(file_path)
        res = vs.ingest_document(
            doc_id=doc_id,
            file_name=file_name,
            text=text,
            metadata=meta,
            replace_existing=True
        )
        return {"status": "SUCCESS", "details": res}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.post("/api/admin/retrieval-test", dependencies=[Depends(verify_admin_key)])
def admin_retrieval_test(payload: RetrievalTestRequest):
    vs = VectorStoreService.get_instance()
    chunks = vs.similarity_search(
        query=payload.query,
        top_k=payload.top_k,
        min_similarity=payload.min_similarity
    )
    return {
        "query": payload.query,
        "matched_count": len(chunks),
        "chunks": chunks
    }


# Mount built frontend if available
frontend_dist = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if frontend_dist.exists() and (frontend_dist / "index.html").exists():
    from fastapi.staticfiles import StaticFiles
    from starlette.responses import FileResponse

    assets_dir = frontend_dist / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        file_path = frontend_dist / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_dist / "index.html")

