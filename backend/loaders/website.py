import requests
from bs4 import BeautifulSoup

def load(url: str) -> str:
    """
    Extract text from the website.
    Args:
        url(str): Website URL

    Returns:
        str:Extracted plain text
    """
    try:
        response = requests.get(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/138.0.0.0 Safari/537.36"
                        )
                },
            timeout=10
        )

        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        for tag in soup([
            "script",
            "style",
            "noscript",
            "header",
            "footer",
            "nav",
            "aside"
        ]):
            tag.decompose()
        
        # Extract text
        text = soup.get_text(separator=" ", strip=True)

        # Remove extra spaces
        text = " ".join(text.split())

        return text

    except Exception as e:
        raise Exception(f"Website Loading Error: {e}")