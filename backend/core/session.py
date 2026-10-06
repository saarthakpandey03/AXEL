from backend.database.mongo import client


# =========================================================
# DATABASE
# =========================================================

DB_NAME = "axel"

db = client[DB_NAME]

sessions_collection = db["sessions"]


# =========================================================
# SESSION KEY
# =========================================================

def get_session_key(session_id: str) -> str:
    return session_id


# =========================================================
# GET / CREATE SESSION
# =========================================================

async def get_session(
    session_id: str
):

    if not session_id:
        return None

    session = await sessions_collection.find_one(
        {
            "_id": session_id
        }
    )

    return session


async def create_session(
    session_id: str
):

    if not session_id:
        return None

    existing = await sessions_collection.find_one(
        {
            "_id": session_id
        }
    )

    if existing:
        return existing

    session = {
        "_id": session_id,
        "active_collection": None,
        "loaded_collections": [],
        "history": [],
    }

    await sessions_collection.insert_one(
        session
    )

    return session


# =========================================================
# ACTIVE COLLECTION
# =========================================================

async def set_active_collection(
    session_id: str,
    collection: str
):

    if not session_id:
        return

    await sessions_collection.update_one(
        {
            "_id": session_id
        },
        {
            "$set": {
                "active_collection": collection
            }
        },
        upsert=True
    )


async def get_active_collection(
    session_id: str
):

    if not session_id:
        return None

    session = await sessions_collection.find_one(
        {
            "_id": session_id
        },
        {
            "active_collection": 1
        }
    )

    if not session:
        return None

    return session.get(
        "active_collection"
    )


# =========================================================
# LOADED COLLECTIONS
# =========================================================

async def add_loaded_collection(
    session_id: str,
    collection: str
):

    if not session_id or not collection:
        return

    await sessions_collection.update_one(
        {
            "_id": session_id
        },
        {
            "$addToSet": {
                "loaded_collections": collection
            }
        },
        upsert=True
    )


async def get_loaded_collections(
    session_id: str
) -> list:

    if not session_id:
        return []

    session = await sessions_collection.find_one(
        {
            "_id": session_id
        },
        {
            "loaded_collections": 1
        }
    )

    if not session:
        return []

    collections = session.get(
        "loaded_collections",
        []
    )

    return (
        collections
        if isinstance(collections, list)
        else []
    )


# =========================================================
# CONVERSATION HISTORY
# =========================================================

async def set_history(
    session_id: str,
    history: list
):

    if not session_id:
        return

    if not isinstance(history, list):
        history = []

    await sessions_collection.update_one(
        {
            "_id": session_id
        },
        {
            "$set": {
                "history": history[-20:]
            }
        },
        upsert=True
    )


async def get_history(
    session_id: str
) -> list:

    if not session_id:
        return []

    session = await sessions_collection.find_one(
        {
            "_id": session_id
        },
        {
            "history": 1
        }
    )

    if not session:
        return []

    history = session.get(
        "history",
        []
    )

    return (
        history
        if isinstance(history, list)
        else []
    )


# =========================================================
# ADD MESSAGE
# =========================================================

async def add_message(
    session_id: str,
    role: str,
    content: str
):

    if not session_id:
        return

    if not content:
        return

    message = {
        "role": role,
        "content": content
    }

    await sessions_collection.update_one(
        {
            "_id": session_id
        },
        {
            "$push": {
                "history": {
                    "$each": [message],
                    "$slice": -20
                }
            }
        },
        upsert=True
    )


# =========================================================
# CLEAR HISTORY
# =========================================================

async def clear_history(
    session_id: str
):

    if not session_id:
        return

    await sessions_collection.update_one(
        {
            "_id": session_id
        },
        {
            "$set": {
                "history": []
            }
        }
    )


# =========================================================
# BUILD CONTEXT
# =========================================================

async def build_context(
    session_id: str,
    limit: int | None = None
):

    if not session_id:
        return ""

    history = await get_history(
        session_id
    )

    if not isinstance(
        history,
        list
    ):
        return ""

    if limit is not None and limit > 0:
        history = history[-limit:]

    context_parts = []

    for message in history:

        if not isinstance(
            message,
            dict
        ):
            continue

        role = message.get(
            "role",
            "user"
        )

        content = message.get(
            "content",
            ""
        )

        if not content:
            continue

        context_parts.append(
            f"{role.capitalize()}: {content}"
        )

    return "\n".join(
        context_parts
    )


# =========================================================
# CLEAR SESSION
# =========================================================

async def clear_session(
    session_id: str
):

    if not session_id:
        return

    await sessions_collection.delete_one(
        {
            "_id": session_id
        }
    )