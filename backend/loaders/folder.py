import os
from backend.loaders.folder_parser import parse_folder

def load(folder_path: str) -> str:
    """
    Load a local folder and return all readable text.
    
    Args:
        folder_path (str): Path to the project folder.

    Returns:
        str:Combined text from all supported files.
    """

    if not os.path.exists(folder_path):
        raise Exception("Folder does not exist.")
    
    if not os.path.isdir(folder_path):
        raise Exception("Given path is not a folder")
    
    text = parse_folder(folder_path)

    if not text.strip():
        raise Exception("No supported files found")
    
    return text