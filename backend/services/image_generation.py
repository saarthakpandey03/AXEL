import os
import uuid

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()


gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


IMAGE_MODEL = "gemini-3.1-flash-image"

GENERATED_IMAGE_DIR = "backend/generated_images"


def generate_image(
    prompt: str,
    aspect_ratio: str = "1:1",
    image_size: str = "1K",
):

    if not prompt or not prompt.strip():
        raise ValueError(
            "Image prompt cannot be empty."
        )

    prompt = prompt.strip()

    os.makedirs(
        GENERATED_IMAGE_DIR,
        exist_ok=True
    )

    allowed_ratios = {
        "1:1",
        "2:3",
        "3:2",
        "3:4",
        "4:3",
        "4:5",
        "5:4",
        "9:16",
        "16:9",
        "21:9",
    }

    if aspect_ratio not in allowed_ratios:
        aspect_ratio = "1:1"

    allowed_sizes = {
        "512",
        "1K",
        "2K",
        "4K",
    }

    if image_size not in allowed_sizes:
        image_size = "1K"

    response = gemini_client.models.generate_content(
        model=IMAGE_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio=aspect_ratio,
                image_size=image_size,
            ),
        ),
    )

    generated_image = None

    for part in response.parts:

        if part.inline_data:

            generated_image = part.as_image()

            break

    if generated_image is None:

        raise RuntimeError(
            "Gemini did not return an image."
        )

    filename = f"{uuid.uuid4().hex}.png"

    file_path = os.path.join(
        GENERATED_IMAGE_DIR,
        filename
    )

    generated_image.save(file_path)

    return {
        "filename": filename,
        "url": f"/generated-images/{filename}",
    }