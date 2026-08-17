from pydantic import BaseModel


class ImageGenerationRequest(BaseModel):

    prompt: str

    aspect_ratio: str = "1:1"

    image_size: str = "1K"