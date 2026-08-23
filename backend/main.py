from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Depends,
    Form,
)

from fastapi.middleware.cors import CORSMiddleware
from backend.payment.router import router as payment_router

import uuid
import os


# =========================================================
# CORE
# =========================================================

from backend.core.dependencies import get_session_id
from backend.core.router import process_message


# =========================================================
# SCHEMAS
# =========================================================

from backend.schemas.chat import MessageRequest


# =========================================================
# AUTH
# =========================================================

from backend.auth.router import router as auth_router
from backend.database.mongo import client



# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="AXEL",
    version="1.0.0",
)


@app.on_event("startup")
async def startup_event():

    try:
        await client.admin.command("ping")
        print("MongoDB connected successfully")

    except Exception as e:
        print(
            f"MongoDB connection failed: {e}"
        )
# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://axel-henna.vercel.app",
    ],

    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message":
            "AXEL AI Assistant API Running 🚀"
    }


# =========================================================
# CHAT / MESSAGE
# =========================================================

@app.post("/message")
def message(
    data: MessageRequest,
    session_id: str = Depends(
        get_session_id
    ),
):

    response = process_message(
        session_id=session_id,
        message=data.message,
        provider=data.provider,
        model=data.model,
    )

    response["session_id"] = session_id

    return response


# =========================================================
# FILE UPLOAD
# =========================================================

@app.post("/upload")
async def upload(
    file: UploadFile = File(...),

    provider: str = Form("gemini"),

    model: str | None = Form(None),

    session_id: str = Depends(
        get_session_id
    ),
):
    """
    Upload any supported file.

    provider:
        gemini / groq

    model:
        Optional specific model.
    """

    # -----------------------------------------------------
    # Create upload directory
    # -----------------------------------------------------

    os.makedirs(
        "backend/uploads",
        exist_ok=True,
    )


    # -----------------------------------------------------
    # File size limit: 25 MB
    # -----------------------------------------------------

    content = await file.read()

    if len(content) > 25 * 1024 * 1024:

        return {
            "status": "error",
            "message":
                "File size exceeds 25 MB.",
        }


    # -----------------------------------------------------
    # Generate unique filename
    # -----------------------------------------------------

    extension = os.path.splitext(
        file.filename or ""
    )[1]

    filename = (
        f"{uuid.uuid4()}{extension}"
    )

    file_path = os.path.join(
        "backend/uploads",
        filename,
    )


    # -----------------------------------------------------
    # Save file
    # -----------------------------------------------------

    with open(
        file_path,
        "wb",
    ) as f:

        f.write(content)


    # -----------------------------------------------------
    # Process uploaded file
    # -----------------------------------------------------

    response = process_message(
        session_id=session_id,
        message=file_path,
        provider=provider,
        model=model,
    )

    response["session_id"] = session_id

    return response


# =========================================================
# AUTH ROUTES
# =========================================================

app.include_router(
    auth_router
)

app.include_router(
    payment_router
)