import os
import base64

from dotenv import load_dotenv
from google import genai
from openai import OpenAI


load_dotenv()


# =========================================================
# API CLIENTS
# =========================================================

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

groq_client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are AXEL Vision.

Analyze the image carefully.

Describe:

1. Overall scene
2. Objects present
3. UI elements
4. Code (if present)
5. Error messages
6. Tables
7. Charts
8. Documents
9. Text visible
10. Important details

If the image contains code, explain what the code is doing.

If the image contains an error, explain the error.

If the image contains a document or resume, summarize it.

If the image contains a graph or chart, explain it.

Return a clean, structured description.
"""


# =========================================================
# DEFAULT MODELS
# =========================================================

DEFAULT_MODELS = {
    "gemini": "gemini-3.5-flash",
    "groq": "qwen/qwen3.6-27b",
}


# =========================================================
# GEMINI VISION
# =========================================================

def analyze_with_gemini(
    image_path: str,
    model: str | None = None
):

    selected_model = (
        model
        or DEFAULT_MODELS["gemini"]
    )

    with open(image_path, "rb") as image_file:

        image_bytes = image_file.read()

    response = gemini_client.models.generate_content(

        model=selected_model,

        contents=[
            SYSTEM_PROMPT,

            {
                "inline_data": {
                    "mime_type": get_mime_type(
                        image_path
                    ),
                    "data": image_bytes,
                }
            },

            "Analyze this image in detail."
        ]
    )

    return response.text


# =========================================================
# GROQ VISION
# =========================================================

def analyze_with_groq(
    image_path: str,
    model: str | None = None
):

    selected_model = (
        model
        or DEFAULT_MODELS["groq"]
    )

    mime_type = get_mime_type(
        image_path
    )

    with open(image_path, "rb") as image_file:

        image_bytes = image_file.read()

    base64_image = base64.b64encode(
        image_bytes
    ).decode("utf-8")


    response = groq_client.chat.completions.create(

        model=selected_model,

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },

            {
                "role": "user",

                "content": [

                    {
                        "type": "text",
                        "text": "Analyze this image in detail."
                    },

                    {
                        "type": "image_url",

                        "image_url": {
                            "url":
                                f"data:{mime_type};base64,{base64_image}"
                        }
                    }

                ]
            }
        ]
    )

    return response.choices[0].message.content


# =========================================================
# MIME TYPE
# =========================================================

def get_mime_type(
    image_path: str
):

    extension = (
        os.path.splitext(image_path)[1]
        .lower()
    )

    mime_types = {

        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",

    }

    return mime_types.get(
        extension,
        "image/jpeg"
    )


# =========================================================
# MAIN CAPTION FUNCTION
# =========================================================

def generate_caption(
    image_path: str,
    provider: str = "gemini",
    model: str | None = None
):

    provider = provider.lower().strip()


    if provider == "gemini":

        return analyze_with_gemini(
            image_path=image_path,
            model=model
        )


    if provider == "groq":

        return analyze_with_groq(
            image_path=image_path,
            model=model
        )


    raise ValueError(
        f"Unsupported vision provider: {provider}"
    )