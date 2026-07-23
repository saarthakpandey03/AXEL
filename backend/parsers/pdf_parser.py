from pypdf import PdfReader


def parse(file_path: str):

    reader = PdfReader(file_path)

    text = []

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    result = "\n".join(text).strip()

    if not result:
        raise Exception("Empty PDF")

    return result