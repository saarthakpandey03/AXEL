import os

from backend.vision.caption import generate_caption


def process_image(
    image_path: str,
    provider: str = "gemini",
    model: str | None = None
):

    print("\n========== IMAGE PIPELINE ==========")

    print(
        "Image path:",
        image_path
    )

    print(
        "Provider:",
        provider
    )

    print(
        "Model:",
        model
    )

    print(
        "====================================\n"
    )


    # =====================================================
    # CHECK FILE
    # =====================================================

    if not os.path.exists(
        image_path
    ):

        raise FileNotFoundError(

            f"Image file not found: "
            f"{image_path}"

        )


    print(
        "[IMAGE] File found successfully"
    )


    # =====================================================
    # VISION ANALYSIS
    # =====================================================

    print(
        "[VISION] Starting image analysis..."
    )


    try:

        caption = generate_caption(

            image_path=image_path,

            provider=provider,

            model=model

        )


        print(

            "[VISION] Analysis completed"

        )


        print(

            f"[VISION] Response length: "
            f"{len(caption or '')}"

        )


    except Exception as e:

        print(

            f"[VISION ERROR] "
            f"{type(e).__name__}: "
            f"{str(e)}"

        )


        caption = ""


    # =====================================================
    # PROCESS RESPONSE
    # =====================================================

    print(
        "[IMAGE] Processing vision response..."
    )


    final_text = (

        caption or ""

    ).strip()


    # =====================================================
    # VALIDATE RESPONSE
    # =====================================================

    if not final_text:

        raise RuntimeError(

            "Image processing returned "
            "no description."

        )


    # =====================================================
    # FINAL RESULT
    # =====================================================

    print(

        f"[IMAGE] Final text length: "
        f"{len(final_text)}"

    )


    print(
        "[IMAGE] Processing completed successfully ✅"
    )


    return final_text