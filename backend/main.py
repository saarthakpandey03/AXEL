from fastapi import FastAPI, UploadFile, File, Header,Depends
import uuid
import os
from backend.core.dependencies import get_session_id
from backend.schemas.chat import MessageRequest
from backend.core.router import process_message
from backend.auth.router import router as auth_router

app = FastAPI(
    title="AXEL",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "AXEL AI Assistant API Running 🚀"
    }


@app.post("/message")
def message(
    data: MessageRequest,
    session_id:str = Depends(get_session_id)
):
    """
    Handles:
    - General Chat
    - RAG Questions
    - YouTube URL
    - Website URL
    - GitHub URL
    - Local File Path (Development)
    """

    response = process_message(
        session_id=session_id,
        message=data.message
    )

    response["session_id"] = session_id

    return response


@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    session_id:str = Depends(get_session_id)
):
    """
    Upload any supported file.
    """


    # Create upload directory
    os.makedirs(
        "backend/uploads",
        exist_ok=True
    )

    # File size limit (25 MB)
    content = await file.read()

    if len(content) > 25 * 1024 * 1024:
        return {
            "status": "error",
            "message": "File size exceeds 25 MB."
        }

    # Unique filename
    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(
        "backend/uploads",
        filename
    )

    # Save file
    with open(file_path, "wb") as f:
        f.write(content)

    # Process uploaded file
    response = process_message(
        session_id=session_id,
        message=file_path
    )

    response["session_id"] = session_id

    return response


app.include_router(auth_router)