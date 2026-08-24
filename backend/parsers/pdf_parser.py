import os
from pypdf import PdfReader


def parse(file_path: str):

    print("\n========== PDF PARSER ==========")
    print("File path:", file_path)
    print("File exists:", os.path.exists(file_path))
    print("================================\n")


    if not os.path.exists(file_path):

        raise FileNotFoundError(
            f"PDF file not found: {file_path}"
        )


    try:

        reader = PdfReader(
            file_path
        )

    except Exception as e:

        print(
            f"[PDF OPEN ERROR] {type(e).__name__}: {str(e)}"
        )

        raise RuntimeError(
            f"Unable to open PDF: {str(e)}"
        )


    text = []


    for index, page in enumerate(
        reader.pages
    ):

        try:

            page_text = page.extract_text()

            if page_text and page_text.strip():

                text.append(
                    page_text.strip()
                )

        except Exception as e:

            print(
                f"[PDF PAGE {index + 1} ERROR] "
                f"{type(e).__name__}: {str(e)}"
            )


    result = "\n".join(
        text
    ).strip()


    print(
        f"PDF pages: {len(reader.pages)}"
    )

    print(
        f"Extracted text length: {len(result)}"
    )


    if not result:

        raise RuntimeError(
            "No extractable text found in PDF. "
            "The PDF may be scanned or image-based."
        )


    return result