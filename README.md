# Meet Pavan — AI Voice Twin 🎙️🤖

🌐 **Live Web Application (GitHub Pages):** [https://pavan-dasam.github.io/meet-pavan-voice-twin/](https://pavan-dasam.github.io/meet-pavan-voice-twin/)  
📦 **GitHub Repository:** [https://github.com/Pavan-Dasam/meet-pavan-voice-twin](https://github.com/Pavan-Dasam/meet-pavan-voice-twin)

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-22C55E?logo=github&logoColor=white)](https://pavan-dasam.github.io/meet-pavan-voice-twin/)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![ChromaDB](https://img.shields.io/badge/Vector_DB-ChromaDB-FF6600)](https://www.trychroma.com/)
[![Anthropic Claude](https://img.shields.io/badge/LLM-Anthropic_Claude-D97706?logo=anthropic&logoColor=white)](https://www.anthropic.com/)
[![MCP Certified](https://img.shields.io/badge/Certified-Anthropic_MCP-4B5563)](https://github.com/anthropics)

> **Meet Pavan** is an enterprise-grade, RAG-powered AI Voice Twin built for recruiter evaluations and technical interviews. It speaks in the first-person as **Pavan Dasam**, answering questions with verified facts retrieved from a private knowledge base containing his updated resume, production project dossiers, and candidate perspectives.

---

## 🌟 Key Features

- **🎙️ Real-time Voice & Text Interaction:**
  - Speech-to-Text via Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`) with live transcription streaming.
  - Text-to-Speech via Web SpeechSynthesis API with real-time Play, Pause, and Stop controls.
  - Full keyboard fallback when speech recognition is unavailable or denied.
- **🧠 Retrieval-Augmented Generation (RAG) Architecture:**
  - Does **not** pass full documents to the LLM on every turn.
  - Chunks text semantically with configurable recursive character splitting and contextual overlaps.
  - Generates dense vector embeddings locally using `sentence-transformers/all-MiniLM-L6-v2`.
  - Persists vectors and metadata in **ChromaDB**.
  - Retrieves top-K relevant chunks with cosine similarity filtering to reject irrelevant queries.
- **🛡️ Strict Grounding & Anti-Hallucination Guardrails:**
  - Speaks strictly in the first-person ("I", "my") as Pavan Dasam.
  - Sanitizes retrieved context to neutralize prompt injection directives.
  - Gracefully acknowledges knowledge gaps if documents do not contain evidence—never invents employment history, metrics, or personal claims.
  - Displays unobtrusive clickable source citations (file name, chunk index, relevance score %).
- **🔒 Protected Knowledge-Base Admin Portal:**
  - Separate protected admin dashboard secured via API Key (`X-Admin-Key`).
  - Supports multi-file upload for **PDF** (PyMuPDF), **DOCX** (python-docx), and **TXT** files.
  - Prevents accidental duplicates and supports re-indexing and document deletion.
  - Built-in Vector Retrieval Diagnostic Inspector for live verification of embeddings without LLM calls.
- **⚡ Pre-optimized Assessment Queries:**
  - Quick-start chips for the 5 100x assessment questions:
    1. *What should we know about your life story in a few sentences?*
    2. *What's your #1 superpower?*
    3. *What are the top 3 areas you'd like to grow in?*
    4. *What misconception do your coworkers have about you?*
    5. *How do you push your boundaries and limits?*

---

## 🏗️ System Architecture

```
[ Recruiter Browser ] 
       │  ▲
       │  │ (Spoken Audio / Text Stream)
       ▼  │
┌────────────────────────────────────────────────────────┐
│ React 18 + TypeScript Frontend (Vite)                  │
│ • Web Speech API (Live STT) & SpeechSynthesis (TTS)    │
│ • Cybernetic Theme (Jet Black, Cerulean & Rose)        │
│ • Unobtrusive Source Citations & Audio Controls        │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP POST /api/chat
                           ▼
┌────────────────────────────────────────────────────────┐
│ FastAPI Backend Engine (Python 3.11)                   │
│ 1. Rate Limiter & Security Gatekeeper                  │
│ 2. Dense Query Embedding (SentenceTransformers)        │
│ 3. Semantic Similarity Search (ChromaDB Persistent)    │
│ 4. Prompt Sanitization & Anti-Injection Guardrail      │
│ 5. Claude RAG Synthesis (Anthropic Python SDK)         │
└──────────────────────────┬─────────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
┌───────────────────────────────┐   ┌────────────────────────────┐
│ ChromaDB Persistent Store     │   │ Anthropic Claude           │
│ • Cosine Distance HNSW Index  │   │ • 1st-person Voice Twin    │
│ • all-MiniLM-L6-v2 Embeddings │   │ • Strict Evidence Grounding│
│ • Multi-format Chunks & Meta  │   │ • Concise 30-60s Responses │
└───────────────────────────────┘   └────────────────────────────┘
```

---

## 📂 Repository Structure

```
Pavan AI Voice Assistant/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py             # Pydantic Settings (.env, paths, thresholds)
│   │   ├── extraction.py         # PyMuPDF, python-docx, and TXT extractors
│   │   ├── chunking.py           # RecursiveTextSplitter with semantic separators
│   │   ├── vector_store.py       # ChromaDB Persistent Client & SentenceTransformer
│   │   ├── claude_service.py     # Anthropic SDK RAG synthesis & anti-hallucination
│   │   ├── security.py           # Admin authentication, rate limiter, injection defense
│   │   └── main.py               # FastAPI application & REST endpoints
│   ├── data/
│   │   ├── uploads/              # Persistent document storage
│   │   ├── chroma_db/            # Persistent ChromaDB vector database
│   │   └── initial_knowledge/    # Initial seed documents (Resume & profile)
│   ├── tests/
│   │   ├── test_extraction.py    # Document parsing and size validation tests
│   │   ├── test_chunking.py      # Recursive splitter & overlap tests
│   │   ├── test_vector_store.py  # Ingestion, deduplication, search & deletion tests
│   │   ├── test_claude_service.py# Grounding, first-person style & hallucination guards
│   │   └── test_api.py           # Endpoint validation & admin authorization tests
│   ├── requirements.txt          # Python dependencies
│   └── .env.example              # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx        # Navigation, AI disclosure, mute toggle, admin link
│   │   │   ├── VoiceVisualizer.tsx# Glowing pulse & waveform voice visualizer
│   │   │   ├── ChatInterface.tsx # Chat stream, audio play/pause, source citations
│   │   │   ├── InputBar.tsx      # Speech-to-text mic, live transcription, text input
│   │   │   ├── AssessmentChips.tsx# 1-click test pills for the 5 assessment questions
│   │   │   └── AdminModal.tsx    # Multi-file upload, document list, re-index, delete
│   │   ├── hooks/
│   │   │   ├── useSpeechRecognition.ts # Web Speech API voice capture hook
│   │   │   └── useSpeechSynthesis.ts   # SpeechSynthesis voice output hook
│   │   ├── services/api.ts       # Type-safe API client
│   │   ├── types.ts              # Data contracts and TypeScript interfaces
│   │   ├── App.tsx               # Root component
│   │   └── index.css             # Cybernetic design system
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .github/workflows/
│   └── ci-cd.yml                 # Automated testing and build workflow
├── Dockerfile                    # Production multi-stage Dockerfile
├── docker-compose.yml            # Docker Compose orchestration
├── pytest.ini                    # Pytest configuration
├── .gitignore                    # Excludes .env, secrets, ChromaDB, uploads
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.11+**
- **Node.js 20+** and **npm**
- **Anthropic API Key**

---

### Step 1: Clone and Configure Environment

```bash
git clone https://github.com/Pavan-Dasam/meet-pavan-voice-twin.git
cd meet-pavan-voice-twin
```

Copy the `.env.example` in `backend/`:
```bash
cp backend/.env.example backend/.env
```

Configure `backend/.env`:
```env
ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
ANTHROPIC_MODEL=claude-haiku-5-5
ADMIN_API_KEY=your_secure_admin_password_here

CHUNK_SIZE=800
CHUNK_OVERLAP=150
EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2
TOP_K=5
MIN_SIMILARITY_SCORE=0.15
MAX_COSINE_DISTANCE=0.85
```

---

### Step 2: Install and Run the Backend

```bash
# 1. Install dependencies
cd backend
pip install -r requirements.txt

# 2. Start the FastAPI server (from repository root)
cd ..
set PYTHONPATH=backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> **Note:** On first startup, the backend will automatically seed Pavan's updated resume and candidate profile from `backend/data/initial_knowledge/` into ChromaDB.

Verify the server is running at:
- **API Health:** [http://localhost:8000/api/health](http://localhost:8000/api/health)
- **Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Step 3: Run the Frontend (Development Mode)

In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Open your browser at **http://localhost:5173**.

---

### Step 4: Run the Full Test Suite

Run the 17 unit and integration tests across extraction, chunking, ChromaDB, Claude RAG grounding, and API security:

```bash
# From repository root
python -m pytest backend/tests -v
```

---

## 🐳 Docker Deployment

To build and run the entire unified stack (Frontend + Backend + ChromaDB) with persistent volume storage:

```bash
docker-compose up --build -d
```

Access the application at **http://localhost:8000**.
The vector database and uploaded files will persist across restarts in `./backend/data/chroma_db` and `./backend/data/uploads`.

---

## ☁️ Deployment Instructions (Render / Railway / Hugging Face)

### Deploying to Render
1. Create a **New Web Service** connected to your GitHub repository.
2. Select **Docker** environment.
3. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key.
   - `ANTHROPIC_MODEL`: `claude-haiku-5-5` (or `claude-3-5-sonnet-20241022`).
   - `ADMIN_API_KEY`: Your private admin key.
4. Under **Disks**, attach a persistent disk mounted at `/app/backend/data` (e.g. 1 GB) so that ChromaDB embeddings and uploads persist across redeployments.

---

## 🔒 Security & Privacy

1. **API Key Isolation:** The Anthropic API key is strictly maintained on the backend server. It is never transmitted to the frontend or exposed in logs.
2. **Admin Route Protection:** All document upload, replacement, deletion, and diagnostic inspection routes require the `X-Admin-Key` header.
3. **Prompt Injection Defense:** Retrieved chunks are sanitized to disarm system-prompt override attempts before being passed to Claude.
4. **Rate Limiting:** Public `/api/chat` calls are bounded to prevent abuse and denial-of-service.

---

## 👤 Candidate Context

- **Candidate:** Pavan Dasam
- **Role:** AI Engineer / Generative AI & Agentic Systems Architect
- **Experience:** 3.5+ Years (Financial & Health Insurance)
- **Certifications:**
  - Certified in Model Context Protocol (MCP) – Anthropic
  - Databricks Certified Generative AI Engineer
  - LangChain Certified (LangChain Academy)
  - LangGraph Certified (LangChain Academy)
- **Email:** pavanwork2113@gmail.com
- **LinkedIn:** [https://www.linkedin.com/in/pavan-kumar-dasam-2574893b9/](https://www.linkedin.com/in/pavan-kumar-dasam-2574893b9/)
- **GitHub:** [https://github.com/Pavan-Dasam](https://github.com/Pavan-Dasam)
