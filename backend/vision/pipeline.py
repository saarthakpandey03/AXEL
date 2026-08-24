from backend.vision.preprocess import preprocess
from backend.vision.ocr import extract_text
from backend.vision.caption import generate_caption


def process_image(
    image_path: str,
    provider: str = "gemini",
    model: str | None = None
):

    print("\n========== IMAGE PIPELINE ==========")
    print("Image path:", image_path)
    print("Provider:", provider)
    print("Model:", model)
    print("====================================\n")

    # =====================================================
    # CHECK FILE
    # =====================================================

    import os

    if not os.path.exists(image_path):

        raise FileNotFoundError(
            f"Image file not found: {image_path}"
        )


    # =====================================================
    # PREPROCESS
    # =====================================================

    try:

        processed_image = preprocess(
            image_path
        )

        print(
            "Image preprocessing successful"
        )

    except Exception as e:

        print(
            f"[PREPROCESS ERROR] {type(e).__name__}: {str(e)}"
        )

        # Original image use karo if preprocessing fails
        processed_image = image_path


    # =====================================================
    # OCR
    # =====================================================

    try:

        ocr_text = extract_text(
            processed_image
        )

        print(
            f"OCR text length: {len(ocr_text or '')}"
        )

    except Exception as e:

        print(
            f"[OCR ERROR] {type(e).__name__}: {str(e)}"
        )

        ocr_text = ""


    # =====================================================
    # VISION CAPTION
    # =====================================================

    try:

        caption = generate_caption(
            image_path=image_path,
            provider=provider,
            model=model
        )

        print(
            f"Vision caption length: {len(caption or '')}"
        )

    except Exception as e:

        print(
            f"[VISION ERROR] {type(e).__name__}: {str(e)}"
        )

        caption = ""


    # =====================================================
    # MERGE
    # =====================================================

    final_text = "\n\n".join(
        part.strip()
        for part in [
            caption or "",
            ocr_text or ""
        ]
        if part and part.strip()
    )


    if not final_text:

        raise RuntimeError(
            "Image processing returned no OCR text or vision description."
        )


    print(
        f"Final image text length: {len(final_text)}"
    )

    return final_text