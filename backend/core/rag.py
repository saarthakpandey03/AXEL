import os

from datetime import datetime
from zoneinfo import ZoneInfo

from sentence_transformers import SentenceTransformer
from google import genai
from openai import OpenAI
from dotenv import load_dotenv

from backend.database.vectorDB import (
    create_vector_db,
    search_all,
)

from backend.services.chunking import create_chunks
from backend.core.session import get_loaded_collections

from backend.memory.conversation import (
    add_message,
    build_context,
)


# =========================================================
# ENV
# =========================================================

load_dotenv()


# =========================================================
# API CLIENTS
# =========================================================

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


groq_client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


# =========================================================
# EMBEDDING MODEL
# =========================================================

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# =========================================================
# DEFAULT MODELS
# =========================================================

DEFAULT_MODELS = {
    "gemini": "gemini-3.5-flash",
    "groq": "openai/gpt-oss-120b",
}


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
- Do NOT copy the context unnecessarily.
- Keep the answer concise and useful.
- If the answer is not available in the context,
  reply exactly:
  "I don't know."

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
    """
    Converts text into a searchable knowledge base
    and stores embeddings inside ChromaDB.
    """

    chunks = create_chunks(text)

    create_vector_db(
        chunks=chunks,
        model=embedding_model,
        collection_name=collection_name,
        session_id=session_id,
    )


# =========================================================
# GENERATE GEMINI RESPONSE
# =========================================================

def generate_with_gemini(
    prompt: str,
    model: str | None = None
):

    selected_model = (
        model
        or DEFAULT_MODELS["gemini"]
    )

    print(
        f"[AXEL] Gemini RAG request | "
        f"model={selected_model}"
    )

    try:

        response = gemini_client.models.generate_content(
            model=selected_model,
            contents=prompt,
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

        # -------------------------------------------------
        # Gemini quota / rate limit
        # -------------------------------------------------

        if (
            "429" in error_text
            or "RESOURCE_EXHAUSTED" in error_text
            or "quota" in error_text.lower()
        ):

            raise RuntimeError(
                "GEMINI_QUOTA_EXCEEDED"
            )

        # -------------------------------------------------
        # Other Gemini errors
        # -------------------------------------------------

        raise RuntimeError(
            f"Gemini request failed: {error_text}"
        )


# =========================================================
# GENERATE GROQ RESPONSE
# =========================================================

def generate_with_groq(
    prompt: str,
    model: str | None = None
):

    selected_model = (
        model
        or DEFAULT_MODELS["groq"]
    )

    print(
        f"[AXEL] Groq RAG request | "
        f"model={selected_model}"
    )

    try:

        response = groq_client.chat.completions.create(

            model=selected_model,

            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
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
            f"Groq request failed: {str(e)}"
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

    provider = provider.lower().strip()


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


    # No RAG source
    if not loaded_collections:

        return "No Knowledge Source loaded"


    # =====================================================
    # CONVERSATION HISTORY
    # =====================================================

    history = build_context(
        session_id,
        limit=10
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

    current_datetime = datetime.now(
        ZoneInfo("Asia/Kolkata")
    ).strftime(
        "%A, %d %B %Y, %I:%M %p"
    )


    # =====================================================
    # BUILD FINAL PROMPT
    # =====================================================

    final_prompt = SYSTEM_PROMPT.format(
        history=history,
        context=context,
        question=question,
        current_datetime=current_datetime,
    )


    # =====================================================
    # GENERATE ANSWER
    # =====================================================

    response = None


    # =====================================================
    # GEMINI
    # =====================================================

    if provider == "gemini":

        try:

            response = generate_with_gemini(
                prompt=final_prompt,
                model=model,
            )

        except RuntimeError as e:

            # -------------------------------------------------
            # Gemini quota exceeded
            # Automatically use Groq
            # -------------------------------------------------

            if str(e) == "GEMINI_QUOTA_EXCEEDED":

                print(
                    "[AXEL] Gemini Tokens exceeded."
                )

                print(
                    "[AXEL] Falling back to Groq..."
                )

                response = generate_with_groq(
                    prompt=final_prompt,
                    model=None,
                )

            else:

                raise


    # =====================================================
    # GROQ
    # =====================================================

    elif provider == "groq":

        response = generate_with_groq(
            prompt=final_prompt,
            model=model,
        )


    # =====================================================
    # MEMORY
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


    # =====================================================
    # RETURN
    # =====================================================

    return response