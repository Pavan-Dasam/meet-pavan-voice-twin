import pytest
from app.chunking import RecursiveTextSplitter


def test_chunking_overlap_and_size():
    splitter = RecursiveTextSplitter(chunk_size=100, chunk_overlap=30)
    text = (
        "Paragraph 1: Pavan Dasam is an AI Engineer specializing in Generative AI. "
        "Paragraph 2: He architects multi-agent LangGraph workflows for financial insurance. "
        "Paragraph 3: He also builds high-throughput FastAPI and Java microservices."
    )

    chunks = splitter.split_text_with_metadata(
        text=text,
        doc_id="doc_1",
        file_name="test.txt"
    )

    assert len(chunks) > 1
    for chunk in chunks:
        assert len(chunk["text"]) <= 120  # allow margin for sentence boundaries
        assert chunk["metadata"]["doc_id"] == "doc_1"
        assert chunk["metadata"]["file_name"] == "test.txt"
        assert "chunk_index" in chunk["metadata"]


def test_chunking_empty_text():
    splitter = RecursiveTextSplitter(chunk_size=200, chunk_overlap=50)
    chunks = splitter.split_text_with_metadata(
        text="   ",
        doc_id="doc_empty",
        file_name="empty.txt"
    )
    assert chunks == []


def test_invalid_overlap_raises():
    with pytest.raises(ValueError, match="strictly less than chunk_size"):
        RecursiveTextSplitter(chunk_size=100, chunk_overlap=150)
