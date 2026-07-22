

conversation_history = []

def add_message(role: str, content: str):
    """
    Add a message to conversation history.

    role:
        user
        assistant
    """

    conversation_history.append(
        {
            "role":role,
            "content":content
        }
    )

def get_history():
    """
    Return Full conversation history
    """
    return conversation_history

def clear_history():
    """
    Clear current conversation
    """
    conversation_history.clear()

def build_context(limit=None):

    """
    Convert conversation history into prompt text.
    """

    history = ""

    for message in conversation_history:
        history += (
            f"{message['role'].capitalize()}:"
            f"{message['content']}\n"
        )

    return history