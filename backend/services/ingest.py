from backend.loaders.youtube import load as load_yt
from backend.loaders.website import load as load_website
from backend.loaders.document import load as load_document
from backend.loaders.github import load as load_github
from backend.loaders.folder import load as load_folder
from backend.vision.image import load as load_image

from backend.core.rag import index_document
from backend.core.session import add_loaded_collection


def ingest_youtube(session_id: str, url: str):

    text = load_yt(url)

    if not text.strip():
        return {
            "status": "error",
            "message": "No content found in YouTube video."
        }

    index_document(
        text=text,
        collection_name="youtube_data",
        session_id=session_id
    )

    add_loaded_collection(
        session_id,
        "youtube_data"
    )

    return {
        "status": "success",
        "source": "youtube",
        "message": "YouTube indexed successfully."
    }


def ingest_website(session_id: str, url: str):

    text = load_website(url)

    if not text.strip():
        return {
            "status": "error",
            "message": "No content found on website."
        }

    index_document(
        text=text,
        collection_name="website_data",
        session_id=session_id
    )

    add_loaded_collection(
        session_id,
        "website_data"
    )

    return {
        "status": "success",
        "source": "website",
        "message": "Website indexed successfully."
    }


def ingest_document(session_id: str, file_path: str):

    text = load_document(file_path)

    if not text.strip():
        return {
            "status": "error",
            "message": "Document is empty."
        }

    index_document(
        text=text,
        collection_name="document_data",
        session_id=session_id
    )

    add_loaded_collection(
        session_id,
        "document_data"
    )

    return {
        "status": "success",
        "source": "document",
        "message": "Document indexed successfully."
    }


def ingest_github(session_id: str, url: str):

    text = load_github(url)

    if not text.strip():
        return {
            "status": "error",
            "message": "No code found in repository."
        }

    index_document(
        text=text,
        collection_name="github_data",
        session_id=session_id
    )

    add_loaded_collection(
        session_id,
        "github_data"
    )

    return {
        "status": "success",
        "source": "github",
        "message": "GitHub repository indexed successfully."
    }


def ingest_folder(session_id: str, folder_path: str):

    text = load_folder(folder_path)

    if not text.strip():
        return {
            "status": "error",
            "message": "Folder contains no readable files."
        }

    index_document(
        text=text,
        collection_name="folder_data",
        session_id=session_id
    )

    add_loaded_collection(
        session_id,
        "folder_data"
    )

    return {
        "status": "success",
        "source": "folder",
        "message": "Folder indexed successfully."
    }


def ingest_image(
    session_id: str,
    image_path: str,
    provider: str = "gemini",
    model: str | None = None
):

    text = load_image(
        image_path,
        provider=provider,
        model=model
    )

    if not text.strip():
        return {
            "status": "error",
            "message": "Unable to understand image."
        }

    index_document(
        text=text,
        collection_name="image_data",
        session_id=session_id
    )

    add_loaded_collection(
        session_id,
        "image_data"
    )

    return {
        "status": "success",
        "source": "image",
        "message": "Image indexed successfully."
    }