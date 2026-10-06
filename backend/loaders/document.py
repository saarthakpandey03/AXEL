import os

from backend.parsers.pdf_parser import parse as parse_pdf
from backend.parsers.docx_parser import parse as parse_docx
from backend.parsers.pptx_parser import parse as parse_pptx
from backend.parsers.excel_parser import parse as parse_excel
from backend.parsers.csv_parser import parse as parse_csv
from backend.parsers.text_parser import parse as parse_text


def load(file_path: str):

    print("\n========== DOCUMENT LOADER ==========")

    print(
        "File path:",
        file_path
    )


    # =====================================================
    # CHECK FILE
    # =====================================================

    if not os.path.exists(
        file_path
    ):

        raise FileNotFoundError(
            f"Document file not found: {file_path}"
        )


    # =====================================================
    # GET EXTENSION
    # =====================================================

    extension = os.path.splitext(
        file_path
    )[1].lower()


    print(
        "File extension:",
        extension
    )


    # =====================================================
    # SELECT PARSER
    # =====================================================

    try:

        if extension == ".pdf":

            print(
                "[DOCUMENT] Using PDF parser"
            )

            text = parse_pdf(
                file_path
            )


        elif extension == ".docx":

            print(
                "[DOCUMENT] Using DOCX parser"
            )

            text = parse_docx(
                file_path
            )


        elif extension == ".pptx":

            print(
                "[DOCUMENT] Using PPTX parser"
            )

            text = parse_pptx(
                file_path
            )


        elif extension in [
            ".xlsx",
            ".xls"
        ]:

            print(
                "[DOCUMENT] Using Excel parser"
            )

            text = parse_excel(
                file_path
            )


        elif extension == ".csv":

            print(
                "[DOCUMENT] Using CSV parser"
            )

            text = parse_csv(
                file_path
            )


        elif extension in [
            ".txt",
            ".md"
        ]:

            print(
                "[DOCUMENT] Using Text parser"
            )

            text = parse_text(
                file_path
            )


        else:

            raise ValueError(
                f"Unsupported document type: "
                f"{extension}"
            )


    except Exception as e:

        print(
            f"[DOCUMENT ERROR] "
            f"{type(e).__name__}: {str(e)}"
        )

        raise RuntimeError(
            f"Failed to parse document "
            f"({extension}): {str(e)}"
        )


    # =====================================================
    # VALIDATE TEXT
    # =====================================================

    if not text or not text.strip():

        raise ValueError(
            "No readable text found in document."
        )


    text = text.strip()


    print(
        f"[DOCUMENT] Extracted text length: "
        f"{len(text)}"
    )


    print(
        "[DOCUMENT] Processing completed successfully ✅"
    )


    return text