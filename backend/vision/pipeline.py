from backend.vision.preprocess import preprocess
from backend.vision.ocr import extract_text
from backend.vision.caption import generate_caption


def process_image(
    image_path: str,
    provider: str = "gemini",
    model: str | None = None
):
    """
    Complete Vision Pipeline

    Image
      ↓
    Preprocess
      ↓
    OCR
      ↓
    Caption
      ↓
    Merge
    """

    # =====================================================
    # Improve image for OCR
    # =====================================================

    processed_image = preprocess(
        image_path
    )


    # =====================================================
    # OCR
    # =====================================================

    try:

        ocr_text = extract_text(
            processed_image
        )

    except Exception as e:

        print(
            f"OCR Error: {e}"
        )

        ocr_text = ""


    # =====================================================
    # Vision Caption
    # =====================================================

    try:

        caption = generate_caption(
            image_path=image_path,
            provider=provider,
            model=model
        )

    except Exception as e:

        print(
            f"Vision Error: {e}"
        )

        caption = ""


    # =====================================================
    # Merge OCR + Vision
    # =====================================================

    final_text = f"""
{caption}

{ocr_text}
"""


    return final_text