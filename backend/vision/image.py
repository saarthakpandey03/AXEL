from backend.vision.pipeline import process_image


def load(
    image_path: str,
    provider: str = "gemini",
    model: str | None = None
):
    """
    Load an image and return text
    extracted by Vision Pipeline.
    """

    return process_image(
        image_path=image_path,
        provider=provider,
        model=model
    )