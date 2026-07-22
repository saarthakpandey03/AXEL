def create_chunks(
    text: str,
    chunk_size: int = 500,
    overlap: int = 100
) -> list[str]:
    """
    Split text into overlapping chunks.

    Args:
        text: Input text
        chunk_size: Size of each chunk
        overlap: Overlap between chunks

    Returns:
        List of text chunks
    """

    chunks = []

    start = 0

    while start < len(text):

        end = start + chunk_size

        chunks.append(text[start:end])

        start = end - overlap

    return chunks