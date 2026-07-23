import os

from backend.parsers.pdf_parser import parse as parse_pdf
from backend.parsers.docx_parser import parse as parse_docx
from backend.parsers.pptx_parser import parse as parse_pptx
from backend.parsers.excel_parser import parse as parse_excel
from backend.parsers.csv_parser import parse as parse_csv
from backend.parsers.text_parser import parse as parse_text


def load(file_path: str):

    extension = os.path.splitext(
        file_path
    )[1].lower()

    if extension == ".pdf":
        return parse_pdf(file_path)

    elif extension == ".docx":
        return parse_docx(file_path)

    elif extension == ".pptx":
        return parse_pptx(file_path)

    elif extension in [
        ".xlsx",
        ".xls"
    ]:
        return parse_excel(file_path)

    elif extension == ".csv":
        return parse_csv(file_path)

    elif extension in [
        ".txt",
        ".md"
    ]:
        return parse_text(file_path)

    raise Exception("Unsupported Document")