import chromadb
import uuid


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
        name=collection_name
    )


# =========================================================
# CREATE VECTOR DATABASE
# =========================================================

def create_vector_db(
    chunks,
    model,
    collection_name,
    session_id
):

    if not chunks:
        print("[RAG] No chunks to store.")
        return None


    collection = get_collection(
        collection_name
    )


    print(
        f"[RAG] Creating embeddings for "
        f"{len(chunks)} chunks..."
    )


    # Generate embeddings
    embeddings = model.encode(
        chunks
    )


    # Unique document ID
    document_id = str(
        uuid.uuid4()
    )


    ids = []

    documents = []

    metadata = []


    for i, chunk in enumerate(chunks):

        ids.append(
            f"{document_id}_{i}"
        )

        documents.append(
            chunk
        )

        metadata.append(
            {
                "document_id": document_id,
                "session_id": session_id,
                "source": collection_name
            }
        )


    # Add all chunks in one request
    collection.add(

        ids=ids,

        documents=documents,

        embeddings=[
            embedding.tolist()
            for embedding in embeddings
        ],

        metadatas=metadata
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
    model,
    collections: list,
    session_id: str,
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


    # Generate query embedding
    query_embedding = model.encode(
        query
    ).tolist()


    all_context = []


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


    if not unique_context:

        print(
            "[RAG] No relevant context found."
        )

        return ""


    # Limit context to avoid huge prompt
    final_context = "\n\n".join(
        unique_context
    )


    print(
        f"[RAG] Context found: "
        f"{len(unique_context)} chunks"
    )


    return final_context