# Active Collection
active_collection = None

# Loaded Collections
loaded_collections = set()


def set_active_collection(collection_name: str):
    """
    Set the currently active knowledge source.
    """
    global active_collection
    active_collection = collection_name

    loaded_collections.add(collection_name)


def get_active_collection():
    """
    Returns currently active collection.
    """
    return active_collection


def get_loaded_collections():
    """
    Returns all loaded collections.
    """
    return list(loaded_collections)


def clear_loaded_collections():
    """
    Clears all loaded collections.
    """
    global active_collection

    active_collection = None
    loaded_collections.clear()