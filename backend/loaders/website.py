import requests
from bs4 import BeautifulSoup


def load(url: str) -> str:

    try:

        response = requests.get(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 "
                    "(KHTML, like Gecko) "
                    "Chrome/138.0.0.0 Safari/537.36"
                )
            },
            timeout=15,
        )

        response.raise_for_status()


        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )


        for tag in soup([
            "script",
            "style",
            "noscript",
            "header",
            "footer",
            "nav",
            "aside",
            "form",
        ]):
            tag.decompose()


        text = soup.get_text(
            separator=" ",
            strip=True
        )

        text = " ".join(text.split())


        if not text.strip():
            raise ValueError(
                "No readable text found on website."
            )


        return text


    except requests.exceptions.Timeout:

        raise Exception(
            "Website Loading Error: Request timed out."
        )


    except requests.exceptions.RequestException as e:

        raise Exception(
            f"Website Loading Error: {e}"
        )


    except Exception as e:

        raise Exception(
            f"Website Loading Error: {e}"
        )