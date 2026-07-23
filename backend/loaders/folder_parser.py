import os

from backend.loaders.folder_filter import (
    should_skip_folder,
    should_read_file
)


def parse_folder(folder_path: str) -> str:
    """
    Recursively read all supported files
    from a folder and return one text.
    """

    documents = []

    for root, dirs, files in os.walk(folder_path):

        # Skip unwanted folders
        dirs[:] = [
            d for d in dirs
            if not should_skip_folder(d)
        ]

        for file in files:

            file_path = os.path.join(root, file)

            if not should_read_file(file_path):
                continue

            try:

                with open(
                    file_path,
                    "r",
                    encoding="utf-8",
                    errors="ignore"
                ) as f:

                    text = f.read()

                relative_path = os.path.relpath(
                    file_path,
                    folder_path
                )

                documents.append(
                    f"""
=========================
File: {relative_path}
=========================

{text}

"""
                )

            except Exception:

                continue

    return "\n".join(documents)