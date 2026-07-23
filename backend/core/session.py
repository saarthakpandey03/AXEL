from backend.storage.redis import redis_client
import json

def set_active_collection(session_id: str, collection: str):

    redis_client.hset(
        session_id,
        "active_collection",
        collection
    )

def get_active_collection(session_id: str):

    collection = redis_client.hget(
        session_id,
        "active_collection"
    )
    return collection

def add_loaded_collection(session_id: str, collection: str):

    collections = get_loaded_collections(session_id)

    collections.append(collection)

    collections = list(set(collections))

    redis_client.hset(
        f"session:{session_id}",
        "loaded_collections",
        json.dumps(collections)
    )

def get_loaded_collections(session_id: str):

    collections = redis_client.hget(
        f"session:{session_id}",
        "loaded_collections"
    )
    if collections is None:
        return []
    return json.loads(collections)


def set_history(session_id: str, history):
    
    redis_client.hset(
        session_id,
        "history",
        json.dumps(history)
    )

def get_history(session_id: str):

    history = redis_client.hget(
        session_id,
        "history"
    )
    if history is None:
        return []
    return json.loads(history)

def clear_session(session_id: str):
    redis_client.delete(session_id)
    