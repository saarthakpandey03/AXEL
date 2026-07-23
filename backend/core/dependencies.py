import uuid
from fastapi import Header

def get_session_id(x_session_id: str= Header(None))->str:
    """
    Return an existing session_id 
    or create a new one.
    """
    return x_session_id or str(uuid.uuid4())