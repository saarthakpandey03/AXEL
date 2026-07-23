from backend.vision.pipeline import process_image


def load(image_path: str):
    """
    Load an image and return text
    extracted by Vision Pipeline.
    """

    return process_image(image_path)