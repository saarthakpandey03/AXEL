from urllib.parse import urlparse
import os


def is_url(text: str) -> bool:
    """
    Check whether the input is a valid URL.
    """
    try:
        result = urlparse(text.strip())
        return (
            result.scheme in ["http", "https"]
            and bool(result.netloc)
        )

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
        folder
        chat
    """

    user_input = user_input.strip()

    # URL Detection
    if is_url(user_input):

        parsed = urlparse(user_input)

        hostname = parsed.netloc.lower()

        # Remove www.
        hostname = hostname.removeprefix("www.")

        if hostname == "youtube.com" or hostname.endswith(".youtube.com"):
            return "youtube"

        elif hostname == "youtu.be":
            return "youtube"

        elif hostname == "github.com" or hostname.endswith(".github.com"):
            return "github"

        else:
            return "website"


    # Local File Detection
    # Local File Detection
    _, extension = os.path.splitext(user_input.lower())

    if extension in [
        ".pdf",
        ".docx",
        ".pptx",
        ".xlsx",
        ".xls",
        ".csv",
        ".txt",
        ".md"
    ]:
        return "document"

    elif extension in [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".bmp",
        ".tiff",
        ".tif"
    ]:
        return "image"

    elif os.path.isdir(user_input):
        return "folder"

    return "chat"