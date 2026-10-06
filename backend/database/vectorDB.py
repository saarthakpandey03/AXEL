import os
import uuid

import chromadb
from dotenv import load_dotenv
from google import genai


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# GEMINI CLIENT
# =========================================================

_gemini_client = None


def get_gemini_client():

    global _gemini_client


    if _gemini_client is None:

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
# CHROMA CLIENT
# =========================================================

def get_client():

    return chromadb.PersistentClient(
        path="./myDB"
    )


# =========================================================
# COLLECTION
# =========================================================

def get_collection(
    collection_name: str
):

    client = get_client()


    return client.get_or_create_collection(
        name=collection_name,
        embedding_function=None
    )


# =========================================================
# CREATE GEMINI EMBEDDINGS
# =========================================================

def create_embeddings(
    texts: list[str]
):

    if not texts:

        return []


    client = get_gemini_client()


    print(
        f"[RAG] Creating embeddings for "
        f"{len(texts)} texts..."
    )


    response = client.models.embed_content(

        model="gemini-embedding-001",

        contents=texts

    )


    embeddings = []


    for embedding in response.embeddings:

        embeddings.append(
            embedding.values
        )


    return embeddings


# =========================================================
# CREATE VECTOR DATABASE
# =========================================================

def create_vector_db(
    chunks,
    model=None,
    collection_name: str = "default",
    session_id: str = ""
):

    if not chunks:

        print(
            "[RAG] No chunks to store."
        )

        return None


    collection = get_collection(
        collection_name
    )


    print(
        f"[RAG] Storing "
        f"{len(chunks)} chunks..."
    )


    # =====================================================
    # CREATE EMBEDDINGS USING GEMINI
    # =====================================================

    embeddings = create_embeddings(
        chunks
    )


    if not embeddings:

        raise RuntimeError(
            "Failed to create embeddings."
        )


    # =====================================================
    # UNIQUE DOCUMENT ID
    # =====================================================

    document_id = str(
        uuid.uuid4()
    )


    ids = []

    documents = []

    metadatas = []


    for i, chunk in enumerate(chunks):

        ids.append(
            f"{document_id}_{i}"
        )


        documents.append(
            chunk
        )


        metadatas.append(
            {
                "document_id": document_id,
                "session_id": session_id,
                "source": collection_name
            }
        )


    # =====================================================
    # ADD DOCUMENTS + EMBEDDINGS
    # =====================================================

    collection.add(

        ids=ids,

        documents=documents,

        embeddings=embeddings,

        metadatas=metadatas

    )


    print(
        "[RAG] Vector DB updated successfully ✅"
    )


    return collection


# =========================================================
# SEARCH ALL COLLECTIONS
# =========================================================

def search_all(
    query: str,
    model=None,
    collections: list = None,
    session_id: str = "",
    n_results: int = 3
):

    if not collections:

        print(
            "[RAG] No collections loaded."
        )

        return ""


    print(
        f"[RAG] Searching collections: "
        f"{collections}"
    )


    # =====================================================
    # CREATE QUERY EMBEDDING
    # =====================================================

    query_embeddings = create_embeddings(
        [query]
    )


    if not query_embeddings:

        print(
            "[RAG] Failed to create query embedding."
        )

        return ""


    query_embedding = query_embeddings[0]


    all_context = []


    # =====================================================
    # SEARCH COLLECTIONS
    # =====================================================

    for collection_name in collections:

        try:

            collection = get_collection(
                collection_name
            )


            result = collection.query(

                query_embeddings=[
                    query_embedding
                ],

                where={
                    "session_id": session_id
                },

                n_results=n_results

            )


            documents = result.get(
                "documents",
                []
            )


            if (

                documents

                and len(documents) > 0

                and documents[0]

            ):

                all_context.extend(
                    documents[0]
                )


        except Exception as e:

            print(
                f"[RAG] Search error in "
                f"{collection_name}: {e}"
            )


    # =====================================================
    # REMOVE DUPLICATES
    # =====================================================

    unique_context = []

    seen = set()


    for text in all_context:

        if text not in seen:

            unique_context.append(
                text
            )


            seen.add(
                text
            )


    # =====================================================
    # NO CONTEXT
    # =====================================================

    if not unique_context:

        print(
            "[RAG] No relevant context found."
        )

        return ""


    # =====================================================
    # LIMIT CONTEXT SIZE
    # =====================================================

    final_context = "\n\n".join(
        unique_context
    )


    final_context = final_context[:12000]


    print(
        f"[RAG] Context found: "
        f"{len(unique_context)} chunks"
    )


    return final_context