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
        document
        image
        folder
        chat
    """

    user_input = user_input.strip()

    if not user_input:
        return "chat"


    # =====================================================
    # URL DETECTION
    # =====================================================

    if is_url(user_input):

        parsed = urlparse(user_input)

        hostname = parsed.netloc.lower()

        # Remove www.
        hostname = hostname.removeprefix("www.")


        # YouTube

        if (
            hostname == "youtube.com"
            or hostname.endswith(".youtube.com")
        ):
            return "youtube"


        # YouTube short URL

        elif hostname == "youtu.be":
            return "youtube"


        # GitHub

        elif (
            hostname == "github.com"
            or hostname.endswith(".github.com")
        ):
            return "github"


        # Other websites

        else:
            return "website"


    # =====================================================
    # LOCAL FILE DETECTION
    # =====================================================

    _, extension = os.path.splitext(
        user_input.lower()
    )


    # Documents

    if extension in [
        ".pdf",
        ".docx",
        ".pptx",
        ".xlsx",
        ".xls",
        ".csv",
        ".txt",
        ".md",
    ]:

        return "document"


    # Images

    elif extension in [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".bmp",
        ".tiff",
        ".tif",
    ]:

        return "image"


    # Folder

    elif os.path.isdir(user_input):

        return "folder"


    # =====================================================
    # NORMAL CHAT
    # =====================================================

    return "chat"