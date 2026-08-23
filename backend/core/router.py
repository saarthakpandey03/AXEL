from backend.core.classifier import detect_input_type
from backend.core.chat import chat


def process_message(
    session_id: str,
    message: str,
    provider: str = "gemini",
    model: str | None = None
):

    input_type = detect_input_type(message)


    print("\n========== ROUTER DEBUG ==========")
    print("message:", message)
    print("input_type:", input_type)
    print("provider:", provider)
    print("model:", model)
    print("==================================\n")


    # =====================================================
    # KNOWLEDGE INGESTION
    # =====================================================

    if input_type == "youtube":

        from backend.services.ingest import ingest_youtube

        return ingest_youtube(
            session_id,
            message
        )


    elif input_type == "website":

        from backend.services.ingest import ingest_website

        return ingest_website(
            session_id,
            message
        )


    elif input_type == "github":

        from backend.services.ingest import ingest_github

        return ingest_github(
            session_id,
            message
        )


    elif input_type == "image":

        from backend.services.ingest import ingest_image

        return ingest_image(
            session_id=session_id,
            image_path=message,
            provider=provider,
            model=model
        )


    elif input_type == "document":

        from backend.services.ingest import ingest_document

        return ingest_document(
            session_id,
            message
        )


    elif input_type == "folder":

        from backend.services.ingest import ingest_folder

        return ingest_folder(
            session_id,
            message
        )


    # =====================================================
    # NORMAL CHAT
    # =====================================================

    elif input_type == "chat":

        answer = chat(

            session_id=session_id,

            question=message,

            provider=provider,

            model=model

        )


        return {

            "status": "success",

            "answer": answer

        }


    # =====================================================
    # UNSUPPORTED
    # =====================================================

    return {

        "status": "error",

        "message": "Unsupported input."

    }