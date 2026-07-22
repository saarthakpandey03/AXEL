from pypdf import PdfReader


def load(file_path: str) -> str:
    """
    Extract text from a PDF.

    Args:
        file_path (str): Path of PDF

    Returns:
        str: Complete text from PDF
    """

    reader = PdfReader(file_path)

    full_text = ""

    for page in reader.pages:
        text = page.extract_text()

        if text:
            full_text += text + "\n"

    return full_text