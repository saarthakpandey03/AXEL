from docx import Document


def parse(file_path: str):

    document = Document(file_path)

    text = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            text.append(paragraph.text)

    result = "\n".join(text).strip()

    if not result:
        raise Exception("Empty document")

    return result