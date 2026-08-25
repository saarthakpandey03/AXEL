import uuid

from fastapi import Header


# =========================================================
# SESSION ID
# =========================================================

def get_session_id(
    x_session_id: str | None = Header(
        default=None,
        alias="X-Session-ID"
    )
) -> str:
    """
    Return the session ID received from the frontend.

    If no session ID is provided,
    generate a new one.
    """

    if x_session_id:

        return x_session_id.strip()


    return str(
        uuid.uuid4()
    )