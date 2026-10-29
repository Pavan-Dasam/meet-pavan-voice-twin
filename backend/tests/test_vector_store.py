import pytest
from app.vector_store import VectorStoreService


@pytest.fixture(scope="module")
def vs_service():
    service = VectorStoreService.get_instance()
    # Clean test collection
    service.clear_all()
    yield service
    service.clear_all()


def test_ingest_and_similarity_search(vs_service):
    sample_text = (
        "Pavan Dasam is an Agentic AI Engineer at Accenture. "
        "He specializes in LangGraph multi-agent workflows, RAG, and Azure AI Search. "
        "He holds certifications in LangChain and Anthropic Model Context Protocol."
    )

    res = vs_service.ingest_document(
        doc_id="doc_test_1",
        file_name="pavan_profile.txt",
        text=sample_text,
        replace_existing=True
    )
    assert res["status"] == "INDEXED"
    assert res["chunk_count"] >= 1

    # Search for relevant topic
    results = vs_service.similarity_search("What certifications does Pavan hold?", top_k=2)
    assert len(results) > 0
    assert "Anthropic Model Context Protocol" in results[0]["text"] or "LangChain" in results[0]["text"]
    assert results[0]["similarity"] > 0.30


def test_duplicate_prevention(vs_service):
    with pytest.raises(ValueError, match="already indexed"):
        vs_service.ingest_document(
            doc_id="doc_test_1",
            file_name="pavan_profile.txt",
            text="Duplicate content attempt",
            replace_existing=False
        )


def test_document_deletion(vs_service):
    del_res = vs_service.delete_document("doc_test_1")
    assert del_res["status"] == "DELETED"

    # Search should now return empty
    results = vs_service.similarity_search("What certifications does Pavan hold?")
    assert len(results) == 0
