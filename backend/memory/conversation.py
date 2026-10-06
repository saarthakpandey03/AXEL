from backend.core.session import (
    get_history,
    set_history,
)


# =========================================================
# ADD MESSAGE
# =========================================================

async def add_message(
    session_id: str,
    role: str,
    content: str
):
    """
    Add a message to the current session history.
    """

    if not session_id:
        return

    if not content:
        return

    history = await get_history(
        session_id
    )

    if not isinstance(
        history,
        list
    ):
        history = []

    history.append(
        {
            "role": role,
            "content": content
        }
    )

    # Keep only last 20 messages
    history = history[-20:]

    await set_history(
        session_id,
        history
    )


# =========================================================
# CLEAR HISTORY
# =========================================================

async def clear_history(
    session_id: str
):
    """
    Clear conversation history for a session.
    """

    if not session_id:
        return

    await set_history(
        session_id,
        []
    )


# =========================================================
# BUILD CONTEXT
# =========================================================

async def build_context(
    session_id: str,
    limit: int | None = None
):
    """
    Convert conversation history into prompt text.
    """

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