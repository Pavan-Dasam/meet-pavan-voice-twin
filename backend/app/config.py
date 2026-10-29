import os
from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Anthropic LLM Settings
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-3-5-sonnet-20241022"

    # Security & Admin
    ADMIN_API_KEY: str = "pavan-admin-secret-key-2026"
    RATE_LIMIT_PER_MINUTE: int = 30

    # Storage & Persistence Paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    CHROMA_PERSIST_DIRECTORY: str = str(Path(__file__).resolve().parent.parent / "data" / "chroma_db")
    UPLOADS_DIRECTORY: str = str(Path(__file__).resolve().parent.parent / "data" / "uploads")
    INITIAL_KNOWLEDGE_DIRECTORY: str = str(Path(__file__).resolve().parent.parent / "data" / "initial_knowledge")

    # Document Extraction & Ingestion
    MAX_FILE_SIZE_MB: int = 15
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".docx", ".txt"]

    # RAG & Chunking
    CHUNK_SIZE: int = 800
    CHUNK_OVERLAP: int = 150
    EMBEDDING_MODEL_NAME: str = "all-MiniLM-L6-v2"
    TOP_K: int = 5
    # For cosine distance, distance ranges [0, 2]. Similarity = 1 - distance.
    # Maximum allowed cosine distance for relevance (lower distance = higher similarity)
    MAX_COSINE_DISTANCE: float = 0.85
    MIN_SIMILARITY_SCORE: float = 0.15

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]

    model_config = SettingsConfigDict(
        env_file=str(Path(__file__).resolve().parent.parent / ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()

# Ensure directories exist
os.makedirs(settings.CHROMA_PERSIST_DIRECTORY, exist_ok=True)
os.makedirs(settings.UPLOADS_DIRECTORY, exist_ok=True)
os.makedirs(settings.INITIAL_KNOWLEDGE_DIRECTORY, exist_ok=True)
