from backend.core.classifier import detect_input_type
from backend.core.chat import chat
from backend.core.rag import ask_question
from backend.core.session import get_active_collection

from backend.services.ingest import (
    ingest_youtube,
    ingest_website,
    ingest_pdf,
    ingest_github,
    ingest_image,
    ingest_document
)


def process_message(message: str):
    """
    Main Brain of AXEL

    Decides what to do with the user input.
    """

    input_type = detect_input_type(message)

    # -----------------------------
    # Knowledge Ingestion
    # -----------------------------

    if input_type == "youtube":
        return ingest_youtube(message)

    elif input_type == "website":
        return ingest_website(message)

    elif input_type == "github":
        return ingest_github(message)

    elif input_type == "pdf":
        return ingest_pdf(message)

    elif input_type == "image":
        return ingest_image(message)

    elif input_type == "document":
        return ingest_document(message)

    # -----------------------------
    # Conversation
    # -----------------------------

    elif input_type == "chat":

        active_collection = get_active_collection()

        # No Knowledge Loaded
        if active_collection is None:
            return {
                "status": "success",
                "mode": "chat",
                "answer": chat(message)
            }

        # Knowledge Available
        return {
            "status": "success",
            "mode": "rag",
            "answer": ask_question(message)
        }

    # -----------------------------
    # Unknown
    # -----------------------------

    return {
        "status": "error",
        "message": "Unsupported input."
    }