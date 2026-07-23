from backend.vision.preprocess import preprocess
from backend.vision.ocr import extract_text
from backend.vision.caption import generate_caption


def process_image(image_path: str):
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

    # Improve image for OCR
    processed_image = preprocess(image_path)

    # OCR
    try:
        ocr_text = extract_text(processed_image)
    except Exception as e:
        print(f"OCR Error: {e}")
        ocr_text = ""

    # Vision Caption
    try:
        caption = generate_caption(image_path)
    except Exception as e:
        print(f"Vision Error: {e}")
        caption = ""

    final_text = f"""
==========================
Image Description
==========================

{caption}

==========================
OCR Text
==========================

{ocr_text}
"""

    return final_text