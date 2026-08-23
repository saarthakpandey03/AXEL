from backend.storage.redis import redis_client
import json


# =========================================================
# SESSION KEY
# =========================================================

def get_session_key(session_id: str):
    return f"session:{session_id}"


# =========================================================
# ACTIVE COLLECTION
# =========================================================

def set_active_collection(
    session_id: str,
    collection: str
):

    redis_client.hset(
        get_session_key(session_id),
        "active_collection",
        collection
    )


def get_active_collection(
    session_id: str
):

    return redis_client.hget(
        get_session_key(session_id),
        "active_collection"
    )


# =========================================================
# LOADED COLLECTIONS
# =========================================================

def add_loaded_collection(
    session_id: str,
    collection: str
):

    collections = get_loaded_collections(
        session_id
    )

    if collection not in collections:

        collections.append(
            collection
        )

    redis_client.hset(
        get_session_key(session_id),
        "loaded_collections",
        json.dumps(collections)
    )


def get_loaded_collections(
    session_id: str
):

    collections = redis_client.hget(
        get_session_key(session_id),
        "loaded_collections"
    )

    if not collections:
        return []

    try:

        return json.loads(
            collections
        )

    except json.JSONDecodeError:

        print(
            "[WARNING] Invalid loaded_collections data."
        )

        return []


# =========================================================
# CONVERSATION HISTORY
# =========================================================

def set_history(
    session_id: str,
    history: list
):

    redis_client.hset(
        get_session_key(session_id),
        "history",
        json.dumps(history)
    )


def get_history(
    session_id: str
):

    history = redis_client.hget(
        get_session_key(session_id),
        "history"
    )

    if not history:
        return []

    try:

        return json.loads(
            history
        )

    except json.JSONDecodeError:

        print(
            "[WARNING] Invalid history data."
        )

        return []


# =========================================================
# CLEAR SESSION
# =========================================================

def clear_session(
    session_id: str
):

    redis_client.delete(
        get_session_key(session_id)
    )