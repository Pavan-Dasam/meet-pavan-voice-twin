from typing import List, Dict, Any


class RecursiveTextSplitter:
    def __init__(
        self,
        chunk_size: int = 600,
        chunk_overlap: int = 120,
        separators: List[str] = None
    ):
        if chunk_overlap >= chunk_size:
            raise ValueError("chunk_overlap must be strictly less than chunk_size")
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.separators = separators or ["\n\n", "\n", ". ", "? ", "! ", "; ", ", ", " ", ""]

    def _split_text(self, text: str, separators: List[str]) -> List[str]:
        final_chunks: List[str] = []
        if not separators:
            # Fallback to character chunking
            return [text[i:i + self.chunk_size] for i in range(0, len(text), self.chunk_size - self.chunk_overlap)] or [""]

        separator = separators[0]
        next_separators = separators[1:]

        if separator == "":
            splits = list(text)
        else:
            splits = text.split(separator)

        good_splits: List[str] = []
        for s in splits:
            if not s:
                continue
            if len(s) < self.chunk_size:
                good_splits.append(s)
            else:
                if good_splits:
                    merged = self._merge_splits(good_splits, separator)
                    final_chunks.extend(merged)
                    good_splits = []
                other_splits = self._split_text(s, next_separators)
                final_chunks.extend(other_splits)

        if good_splits:
            merged = self._merge_splits(good_splits, separator)
            final_chunks.extend(merged)

        return final_chunks

    def _merge_splits(self, splits: List[str], separator: str) -> List[str]:
        docs: List[str] = []
        current_doc: List[str] = []
        total = 0

        for d in splits:
            _len = len(d)
            if total + _len + (len(separator) if current_doc else 0) > self.chunk_size:
                if current_doc:
                    doc = separator.join(current_doc).strip()
                    if doc:
                        docs.append(doc)
                    # Keep overlap
                    while total > self.chunk_overlap and current_doc:
                        popped = current_doc.pop(0)
                        total -= len(popped) + (len(separator) if current_doc else 0)
                current_doc = [d]
                total = _len
            else:
                current_doc.append(d)
                total += _len + (len(separator) if len(current_doc) > 1 else 0)

        if current_doc:
            doc = separator.join(current_doc).strip()
            if doc:
                docs.append(doc)

        return docs

    def split_text_with_metadata(
        self,
        text: str,
        doc_id: str,
        file_name: str,
        base_metadata: Dict[str, Any] = None
    ) -> List[Dict[str, Any]]:
        if not text or not text.strip():
            return []

        raw_chunks = self._split_text(text.strip(), self.separators)
        results = []

        for idx, chunk in enumerate(raw_chunks):
            chunk_clean = chunk.strip()
            if not chunk_clean:
                continue
            chunk_meta = dict(base_metadata or {})
            chunk_meta.update({
                "doc_id": doc_id,
                "file_name": file_name,
                "chunk_index": idx,
                "chunk_count": len(raw_chunks),
                "char_length": len(chunk_clean)
            })
            results.append({
                "chunk_id": f"{doc_id}_chunk_{idx}",
                "text": chunk_clean,
                "metadata": chunk_meta
            })

        return results
