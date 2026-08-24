import os

from datetime import datetime
from zoneinfo import ZoneInfo

from dotenv import load_dotenv

from backend.database.vectorDB import (
    create_vector_db,
    search_all,
)

from backend.services.chunking import create_chunks

from backend.core.session import (
    get_loaded_collections,
)

from backend.memory.conversation import (
    add_message,
    build_context,
)


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# DEFAULT MODELS
# =========================================================

DEFAULT_MODELS = {
    "gemini": "gemini-3.5-flash",
    "groq": "openai/gpt-oss-120b",
}


# =========================================================
# LAZY EMBEDDING MODEL
# =========================================================

_embedding_model = None


def get_embedding_model():

    global _embedding_model

    if _embedding_model is None:

        try:

            from sentence_transformers import (
                SentenceTransformer
            )

        except ImportError:

            raise RuntimeError(
                "sentence-transformers is not installed. "
                "Install it using: "
                "pip install sentence-transformers"
            )

        print(
            "[AXEL] Loading embedding model..."
        )

        try:

            _embedding_model = (
                SentenceTransformer(
                    "all-MiniLM-L6-v2"
                )
            )

            print(
                "[AXEL] Embedding model loaded successfully."
            )

        except Exception as e:

            print(
                "[AXEL] Embedding model error:",
                str(e)
            )

            raise RuntimeError(
                f"Failed to load embedding model: {str(e)}"
            )

    return _embedding_model


# =========================================================
# LAZY GEMINI CLIENT
# =========================================================

_gemini_client = None


def get_gemini_client():

    global _gemini_client

    if _gemini_client is None:

        from google import genai

        api_key = os.getenv(
            "GEMINI_API_KEY"
        )

        if not api_key:

            raise RuntimeError(
                "GEMINI_API_KEY is not configured."
            )

        _gemini_client = genai.Client(
            api_key=api_key
        )

    return _gemini_client


# =========================================================
# LAZY GROQ CLIENT
# =========================================================

_groq_client = None


def get_groq_client():

    global _groq_client

    if _groq_client is None:

        from openai import OpenAI

        api_key = os.getenv(
            "GROQ_API_KEY"
        )

        if not api_key:

            raise RuntimeError(
                "GROQ_API_KEY is not configured."
            )

        _groq_client = OpenAI(
            api_key=api_key,
            base_url=(
                "https://api.groq.com/openai/v1"
            )
        )

    return _groq_client


# =========================================================
# RAG PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are AXEL, an intelligent AI assistant.

Use the retrieved knowledge context to answer the
user's question.

Conversation History:
{history}

Retrieved Context:
{context}

Current Question:
{question}

Instructions:

- Answer using the retrieved context.
- Answer in your own words.
- Do not copy the context unnecessarily.
- Keep the answer concise and useful.
- If the answer is not available in the context,
  reply exactly: "I don't know."

Current date and time:
{current_datetime}
"""


# =========================================================
# INDEX DOCUMENT
# =========================================================

def index_document(
    text: str,
    collection_name: str,
    session_id: str
):

    if not text or not text.strip():

        raise ValueError(
            "Cannot index empty text."
        )

    print(
        f"[AXEL RAG] Indexing "
        f"collection={collection_name}"
    )

    # Create chunks

    chunks = create_chunks(
        text
    )

    if not chunks:

        raise RuntimeError(
            "No chunks were created from the document."
        )

    print(
        f"[AXEL RAG] Created "
        f"{len(chunks)} chunks."
    )

    # Load embedding model only when needed

    embedding_model = (
        get_embedding_model()
    )

    # Store in vector database

    create_vector_db(
        chunks=chunks,
        model=embedding_model,
        collection_name=collection_name,
        session_id=session_id,
    )

    print(
        "[AXEL RAG] Document indexed successfully."
    )


# =========================================================
# GENERATE GEMINI RESPONSE
# =========================================================

def generate_with_gemini(
    prompt: str,
    model: str | None = None
):

    gemini_client = (
        get_gemini_client()
    )

    selected_model = (
        model
        or DEFAULT_MODELS["gemini"]
    )

    print(
        f"[AXEL] Gemini RAG request | "
        f"model={selected_model}"
    )

    try:

        response = (
            gemini_client
            .models
            .generate_content(
                model=selected_model,
                contents=prompt,
            )
        )

        answer = response.text

        if not answer:

            raise RuntimeError(
                "Gemini returned an empty response."
            )

        answer = answer.strip()

        if not answer:

            raise RuntimeError(
                "Gemini returned an empty response."
            )

        return answer

    except Exception as e:

        error_text = str(e)

        print(
            "[GEMINI RAG ERROR]"
        )

        print(
            f"Type: {type(e).__name__}"
        )

        print(
            f"Message: {error_text}"
        )

        if (
            "429" in error_text
            or "RESOURCE_EXHAUSTED"
            in error_text
            or "quota"
            in error_text.lower()
        ):

            raise RuntimeError(
                "GEMINI_QUOTA_EXCEEDED"
            )

        raise RuntimeError(
            f"Gemini request failed: "
            f"{error_text}"
        )


# =========================================================
# GENERATE GROQ RESPONSE
# =========================================================

def generate_with_groq(
    prompt: str,
    model: str | None = None
):

    groq_client = (
        get_groq_client()
    )

    selected_model = (
        model
        or DEFAULT_MODELS["groq"]
    )

    print(
        f"[AXEL] Groq RAG request | "
        f"model={selected_model}"
    )

    try:

        response = (
            groq_client
            .chat
            .completions
            .create(

                model=selected_model,

                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
            )
        )

        answer = (
            response
            .choices[0]
            .message
            .content
        )

        if not answer:

            raise RuntimeError(
                "Groq returned an empty response."
            )

        answer = answer.strip()

        if not answer:

            raise RuntimeError(
                "Groq returned an empty response."
            )

        return answer

    except Exception as e:

        print(
            "[GROQ RAG ERROR]"
        )

        print(
            f"Type: {type(e).__name__}"
        )

        print(
            f"Message: {str(e)}"
        )

        raise RuntimeError(
            f"Groq request failed: "
            f"{str(e)}"
        )


# =========================================================
# ASK QUESTION
# =========================================================

def ask_question(
    session_id: str,
    question: str,
    provider: str = "gemini",
    model: str | None = None
):

    provider = (
        provider
        .lower()
        .strip()
    )

    # =====================================================
    # VALIDATE PROVIDER
    # =====================================================

    if provider not in {
        "gemini",
        "groq",
    }:

        raise ValueError(
            f"Unsupported provider: {provider}"
        )

    # =====================================================
    # LOADED KNOWLEDGE SOURCES
    # =====================================================

    loaded_collections = (
        get_loaded_collections(
            session_id
        )
    )

    print(
        "[AXEL RAG] Loaded collections:",
        loaded_collections
    )

    # No RAG source loaded

    if not loaded_collections:

        return (
            "No Knowledge Source loaded."
        )

    # =====================================================
    # CONVERSATION HISTORY
    # =====================================================

    history = build_context(
        session_id,
        limit=10,
    )

    # =====================================================
    # LOAD EMBEDDING MODEL
    # =====================================================

    embedding_model = (
        get_embedding_model()
    )

    # =====================================================
    # SEARCH VECTOR DATABASE
    # =====================================================

    context = search_all(
        query=question,
        model=embedding_model,
        collections=loaded_collections,
        session_id=session_id,
    )

    # =====================================================
    # NO RELEVANT CONTEXT
    # =====================================================

    if not context:

        return "I don't know."

    # =====================================================
    # CURRENT INDIA TIME
    # =====================================================

    current_datetime = (
        datetime.now(
            ZoneInfo(
                "Asia/Kolkata"
            )
        )
        .strftime(
            "%A, %d %B %Y, %I:%M %p"
        )
    )

    # =====================================================
    # BUILD FINAL PROMPT
    # =====================================================

    final_prompt = (
        SYSTEM_PROMPT.format(
            history=history,
            context=context,
            question=question,
            current_datetime=current_datetime,
        )
    )

    # =====================================================
    # GENERATE RESPONSE
    # =====================================================

    if provider == "gemini":

        try:

            response = (
                generate_with_gemini(
                    prompt=final_prompt,
                    model=model,
                )
            )

        except RuntimeError as e:

            if str(e) == (
                "GEMINI_QUOTA_EXCEEDED"
            ):

                print(
                    "[AXEL] Gemini quota exceeded."
                )

                print(
                    "[AXEL] Falling back to Groq..."
                )

                response = (
                    generate_with_groq(
                        prompt=final_prompt,
                        model=None,
                    )
                )

            else:

                raise

    else:

        response = (
            generate_with_groq(
                prompt=final_prompt,
                model=model,
            )
        )

    # =====================================================
    # SAVE MEMORY
    # =====================================================

    add_message(
        session_id,
        "user",
        question,
    )

    add_message(
        session_id,
        "assistant",
        response,
    )

    return response