import easyocr

# Load OCR Model Only Once
reader = easyocr.Reader(
    ['en'],
    gpu=False
)


def extract_text(image):

    """
    Extract text from an image using EasyOCR.

    Args:
        image: OpenCV image

    Returns:
        Extracted text
    """

    result = reader.readtext(
        image,
        detail=0,
        paragraph=True
    )

    return "\n".join(result)