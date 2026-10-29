import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.vector_store import VectorStoreService


@pytest.fixture(scope="module")
def client():
    # Ensure vector store has some test knowledge
    vs = VectorStoreService.get_instance()
    vs.ingest_document(
        doc_id="doc_api_test",
        file_name="pavan_resume.txt",
        text="Pavan Dasam is an Agentic AI Engineer with 3.5+ years of experience across financial insurance and healthcare.",
        replace_existing=True
    )
    with TestClient(app) as test_client:
        yield test_client


def test_health_endpoint(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "vector_store" in data
    assert data["vector_store"]["indexed_documents"] >= 1


def test_admin_endpoints_require_auth(client):
    # Without header
    res = client.get("/api/admin/documents")
    assert res.status_code == 401

    # With invalid key
    res_bad = client.get("/api/admin/documents", headers={"X-Admin-Key": "wrong-secret"})
    assert res_bad.status_code == 401

    # With valid key
    res_good = client.get("/api/admin/documents", headers={"X-Admin-Key": settings.ADMIN_API_KEY})
    assert res_good.status_code == 200
    assert "documents" in res_good.json()


def test_chat_endpoint(client):
    payload = {
        "question": "What is Pavan's background?",
        "history": []
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "sources" in data
    assert len(data["answer"]) > 10
