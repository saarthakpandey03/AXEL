from backend.core.classifier import detect_input_type
from backend.core.chat import chat
from backend.core.rag import ask_question
from backend.core.session import get_active_collection

from backend.services.ingest import (
    ingest_youtube,
    ingest_website,
    ingest_github,
    ingest_image,
    ingest_document,
    ingest_folder
)


def process_message(session_id:str,message: str):
    """
    Main Brain of AXEL

    Decides what to do with the user input.
    """

    input_type = detect_input_type(message)

    # -----------------------------
    # Knowledge Ingestion
    # -----------------------------

    if input_type == "youtube":
        return ingest_youtube(session_id, message)

    elif input_type == "website":
        return ingest_website(session_id, message)

    elif input_type == "github":
        return ingest_github(session_id, message)

    elif input_type == "image":
        return ingest_image(session_id, message)

    elif input_type == "document":
        return ingest_document(session_id, message)
    
    elif input_type == "folder":
        return ingest_folder(session_id, message)
    

    # -----------------------------
    # Conversation
    # -----------------------------

    elif input_type == "chat":

        answer = ask_question(
            session_id=session_id,
            question=message
        )

        if answer == "No Knowledge Source loaded":

            answer = chat(
                session_id=session_id,
                question=message
            )

        return {
            "status": "success",
            "answer": answer
        }

    return {
        "status": "error",
        "message": "Unsupported input."
    }