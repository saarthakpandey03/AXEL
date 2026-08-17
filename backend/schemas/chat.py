from pydantic import BaseModel


class VideoRequest(BaseModel):
    url: str

class WebsiteRequest(BaseModel):
    url: str

    
class QuestionRequest(BaseModel):
    question: str

class MessageRequest(BaseModel):
    message: str
    provider: str = "gemini"
    model: str | None = None