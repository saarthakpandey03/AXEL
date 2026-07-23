import cv2


def preprocess(image_path: str):

    image = cv2.imread(image_path)

    if image is None:
        raise Exception("Unable to load image.")

    # Resize (Large images ko manageable size me lao)
    height, width = image.shape[:2]

    if max(height, width) > 1200:

        scale = 1200 / max(height, width)

        image = cv2.resize(
            image,
            (
                int(width * scale),
                int(height * scale)
            )
        )

    # Grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Noise Removal
    gray = cv2.medianBlur(
        gray,
        3
    )

    return gray