from backend.core.session import (
    get_history,
    set_history
)


def add_message(
    session_id: str,
    role: str,
    content: str
):
    """
    Add a message to the current session history.
    """

    history = get_history(session_id)

    history.append(
        {
            "role": role,
            "content": content
        }
    )

    # Keep only last 20 messages
    history = history[-20:]

    set_history(
        session_id,
        history
    )


def clear_history(session_id: str):
    """
    Clear conversation history for a session.
    """

    set_history(
        session_id,
        []
    )


def build_context(
    session_id: str,
    limit: int = None
):
    """
    Convert conversation history into prompt text.
    """

    history = get_history(session_id)

    if limit:
        history = history[-limit:]

    context = ""

    for message in history:

        context += (
            f"{message['role'].capitalize()}: "
            f"{message['content']}\n"
        )

    return context.strip()