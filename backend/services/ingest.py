from backend.loaders.youtube import load as load_yt
from backend.loaders.website import load as load_website
from backend.loaders.pdf import load as load_pdf

from backend.core.rag import index_document
from backend.core.session import set_active_collection
from backend.loaders.github import load as load_github

def ingest_youtube(url: str):

    text = load_yt(url)

    index_document(
        text=text,
        collection_name="youtube_data"
    )

    set_active_collection("youtube_data")

    return {
        "status": "success",
        "source": "youtube",
        "message": "YouTube indexed successfully."
    }


def ingest_website(url: str):

    text = load_website(url)

    index_document(
        text=text,
        collection_name="website_data"
    )

    set_active_collection("website_data")

    return {
        "status": "success",
        "source": "website",
        "message": "Website indexed successfully."
    }


def ingest_pdf(file_path: str):

    text = load_pdf(file_path)

    index_document(
        text=text,
        collection_name="pdf_data"
    )

    set_active_collection("pdf_data")

    return {
        "status": "success",
        "source": "pdf",
        "message": "PDF indexed successfully."
    }


# -------- Future -------- #

def ingest_github(url: str):

    text = load_github(url)

    index_document(
        text=text,
        collection_name="github_data"
    )

    set_active_collection("github_data")

    return {
        "status": "success",
        "source": "github",
        "message": "GitHub repository indexed successfully."
    }


def ingest_image(path: str):
    return {
        "status": "pending",
        "source": "image",
        "message": "Image ingestion is not implemented yet."
    }


def ingest_document(path: str):
    return {
        "status": "pending",
        "source": "document",
        "message": "Document ingestion is not implemented yet."
    }

