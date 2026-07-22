import chromadb
from backend.core.session import get_loaded_collections

def get_client():
    return chromadb.PersistentClient(path="./myDB")


def get_collection(collection_name):

    client = get_client()

    return client.get_or_create_collection(
        name=collection_name
    )


def create_vector_db(chunks, model,collection_name):

    client = get_client()

    # Purani collection delete karo (agar exist karti hai)
    try:
        client.delete_collection(collection_name)
        print(f"{collection_name} Deleted")
    except Exception:
        pass

    # Nayi collection banao
    collection = client.get_or_create_collection(
        name=collection_name
    )

    print("Creating Embeddings...")

    embeddings = model.encode(chunks)

    for i, chunk in enumerate(chunks):

        collection.add(
            documents=[chunk],
            ids=[str(i)],
            embeddings=[embeddings[i].tolist()]
        )

    print("Vector DB Created Successfully ✅")

    return collection

def search_all(query, model):

    collections = get_loaded_collections()

    if not collections:
        return ""

    user_embedding = model.encode(query).tolist()

    all_context = []

    for collection_name in collections:

        collection = get_collection(collection_name)

        if collection.count() == 0:
            continue

        result = collection.query(
            query_embeddings=[user_embedding],
            n_results=2
        )

        documents = result.get("documents", [])

        if documents:
            all_context.extend(documents[0])

    return "\n".join(all_context)