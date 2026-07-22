from urllib.parse import urlparse
import os


def is_url(text: str) -> bool:
    """
    Check whether the input is a valid URL.
    """
    try:
        result = urlparse(text)
        return all([result.scheme, result.netloc])
    except Exception:
        return False


def detect_input_type(user_input: str):
    """
    Detect the type of the user input.

    Returns:
        youtube
        website
        github
        pdf 
        image 
        chat
    """

    user_input = user_input.strip()

    # URL Detection
    if is_url(user_input):

        if "youtube.com" in user_input or "youtu.be" in user_input:
            return "youtube"

        elif "github.com" in user_input:
            return "github"

        else:
            return "website"

    # Local File Detection
    _, extension = os.path.splitext(user_input.lower())

    if extension == ".pdf":
        return "pdf"

    elif extension in [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif"
    ]:
        return "image"

    elif extension in [
        ".txt",
        ".md",
        ".docx"
    ]:
        return "document"

    # Default
    return "chat"