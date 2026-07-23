import chromadb
import uuid
def get_client():
    return chromadb.PersistentClient(path="./myDB")


def get_collection(collection_name):

    client = get_client()

    return client.get_or_create_collection(
        name=collection_name
    )




def create_vector_db(
    chunks,
    model,
    collection_name,
    session_id
):

    collection = get_collection(collection_name)

    print("Creating Embeddings...")

    embeddings = model.encode(chunks)

    # Unique document id
    document_id = str(uuid.uuid4())

    for i, chunk in enumerate(chunks):

        collection.add(
            ids=[f"{document_id}_{i}"],
            documents=[chunk],
            embeddings=[embeddings[i].tolist()],
            metadatas=[
                {
                    "document_id": document_id,
                    "session_id": session_id,
                    "source": collection_name
                }
            ]
        )

    print("Vector DB Updated Successfully ✅")

    return collection


def search_all(
    query,
    model,
    collections,
    session_id
):

    if not collections:
        return ""

    user_embedding = model.encode(query).tolist()

    all_context = []

    for collection_name in collections:

        try:

            collection = get_collection(collection_name)

            result = collection.query(
                query_embeddings=[user_embedding],
                where={
                    "session_id": session_id
                },
                n_results=2
            )

        except Exception:
            continue

        documents = result.get("documents", [])

        if documents and len(documents[0]) > 0:
            all_context.extend(documents[0])

    if not all_context:
        return ""

    return "\n".join(all_context)